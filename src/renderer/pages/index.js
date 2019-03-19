import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import is from 'electron-is';
import { ipcRenderer, remote } from 'electron';
import { PureComponent } from 'react';
import { Button, Upload, message, Icon } from 'antd';
const fs = remote.require('fs');
const {getCurrentWindow, globalShortcut} = require('electron').remote;
// const getCurrentWindow = remote.require('getCurrentWindow');
// const globalShortcut = remote.require('globalShortcut');

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

@connect(({ g }) => ({
  g
}))
class Index extends PureComponent {
  constructor(props) {
    super(props);
    // globalShortcut.register('F5', this.refreshPage);
    // globalShortcut.register('CommandOrControl+R', this.refreshPage);
  }

  componentWillUnmount() {
    // globalShortcut.unregister('F5', this.refreshPage);
    // globalShortcut.unregister('CommandOrControl+R', this.refreshPage);
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
        <Link to="/images">图片墙</Link>
        <Link to="/article/add">添加图文</Link>
      </div>
    )
  }
}

export default Index;
