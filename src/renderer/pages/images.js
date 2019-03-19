import { connect } from 'dva';
import is from 'electron-is';
import router from 'umi/router';
import { ipcRenderer, remote } from 'electron';
import { PureComponent } from 'react';
import { Button, Upload, message, Icon } from 'antd';
const fs = remote.require('fs');
const {getCurrentWindow, globalShortcut} = require('electron').remote;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
  },
  item: {
    flex: 1,
    padding: '1rem',
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  img: {
    margin: '0.5rem',
    width: '300px',
    height: '200px',
  }
}

@connect(({ g, images }) => ({
  g,
  images: images.images,
  inputImages: images.inputImages,
  uploadImages: images.uploadImages,
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    ipcRenderer.on('selected-directory', (event, filepaths) => {
      console.log('==selected-directory==', event, filepaths);
      const img = `data:image/png;base64,${fs.readFileSync(filepaths[0]).toString('base64')}`;
      const { dispatch, images } = this.props;
      dispatch({
        type: 'images/set',
        payload: {
          images: [ ...images, img ],
        }
      });
    });
  }

  handleOpenFileDialog = () => {
    ipcRenderer.send('open-file-dialog');
  }

  renderImages = (images) => {
    return images ? images.map((image) => <img key={Date.now()} src={image} style={styles.img} />) : null;
  }

  beforeUpload = (file) => {
    if(file.type.indexOf('image') === -1) {
      message.error('You can only upload JPG file!');
    }
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl) => {
        // this.setState({
        //   uploadImages: [ ...this.state.uploadImages, imageUrl ],
        //   loading: false,
        // })
        const { dispatch, uploadImages } = this.props;
        dispatch({
          type: 'images/set',
          payload: {
            uploadImages: [ ...uploadImages, imageUrl ],
          }
        });
      });
    }
  }

  getObjectURL = (file) => {
    var url = null ;
    // 下面函数执行的效果是一样的，只是需要针对不同的浏览器执行不同的 js 函数而已
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

  handleFileChange = (event) => {
    console.info('==handleFileChange==', event.target.files);
    const files = [...event.target.files];
    const inputImages = files.map(file => this.getObjectURL(file));
    const { dispatch } = this.props;
      dispatch({
        type: 'images/set',
        payload: {
          inputImages,
        }
      });
  }

  refreshPage = () => {
    getCurrentWindow().reload();
  }

  render() {
    const { images, inputImages, uploadImages  } = this.props;

    return (
      <div style={styles.container}>
        <Button onClick={() => router.goBack()}>返回</Button>
        <div style={styles.item}>
          <Button type="primary" onClick={this.handleOpenFileDialog}>打开文件</Button>
          <div>选择的图片:</div>
          <div style={styles.imgContainer}>
            { this.renderImages(images) }
          </div>
        </div>
        <div style={styles.item}>
          <input type="file" multiple accept="image/png,image/jpeg" onChange={this.handleFileChange} />
          <div>选择的图片:</div>
          <div style={styles.imgContainer}>
            { this.renderImages(inputImages) }
          </div>
        </div>
        <div style={styles.item}>
          <div>
            <div>选择的图片:</div>
            <div style={styles.imgContainer}>
              { this.renderImages(uploadImages) }
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                // action="//jsonplaceholder.typicode.com/posts/"
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
                <div>
                  <Icon type="plus" />
                  <div className="ant-upload-text">Upload</div>
                </div>
              </Upload>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index;
