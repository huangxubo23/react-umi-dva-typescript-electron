import 'braft-editor/dist/index.css';
import React from 'react';
import BraftEditor from 'braft-editor';
import { Form, Input, Button } from 'antd';
const { BrowserWindow } = require('electron').remote;
import styles from './add.less';

const FormItem = Form.Item;

class FormDemo extends React.Component {
  state = {
    editorState: BraftEditor.createEditorState(),
  }

  componentDidMount() {
    // 异步设置编辑器内容
    setTimeout(() => {
      this.props.form.setFieldsValue({
        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
      })
    }, 1000)

  }

  handleChange = (editorState) => {
    this.setState({ editorState })
  }

  preview = () => {
    // if (window.previewWindow) {
    //   window.previewWindow.close()
    // }

    // window.previewWindow = window.open('', 'modal');
    // console.info('==preview==', window.previewWindow);
    // window.previewWindow.document.write(this.buildPreviewHtml());
    // window.previewWindow.document.close()

    // let modal = window.open('', 'modal')
    // modal.document.write('<h1>Hello</h1>')

    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nativeWindowOpen: false
      }
    });
    const file = 'data:text/html;charset=UTF-8,' + encodeURIComponent(this.buildPreviewHtml());
    console.info('==mainWindow==', mainWindow, file);
    mainWindow.loadURL(file);
  }

  buildPreviewHtml () {

    return `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${this.state.editorState.toHTML()}</div>
        </body>
      </html>
    `

  }

  handleSubmit = (event) => {

    event.preventDefault()

    this.props.form.validateFields((error, values) => {
      if (!error) {
        const submitData = {
          title: values.title,
          // content: values.content.toRAW() // or values.content.toHTML()
          content: values.content.toHTML(),
        }
        console.info('==submitData==', submitData)
      }
    })

  }

  render() {

    const { getFieldDecorator } = this.props.form;
    // const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media'];
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const extendControls = [
      {
        key: 'custom-button',
        type: 'button',
        text: '预览',
        onClick: this.preview,
      }
    ]

    return (
      <div className={styles.container}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="文章标题" {...formItemLayout}>
            {getFieldDecorator('title', {
              rules: [{
                required: true,
                message: '请输入标题',
              }],
            })(
              <Input size="large" placeholder="请输入标题" />
            )}
          </FormItem>
          <FormItem label="文章正文" {...formItemLayout}>
            {getFieldDecorator('content', {
              validateTrigger: 'onBlur',
              rules: [{
                required: true,
                validator: (_, value, callback) => {
                  if (value.isEmpty()) {
                    callback('请输入正文内容')
                  } else {
                    callback()
                  }
                }
              }],
            })(
              <BraftEditor
                extendControls={extendControls}
                onChange={this.handleChange}
                // controls={controls}
                placeholder="请输入正文内容"
              />
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 12, offset: 12 },
            }}
          >
            <Button size="large" type="primary" htmlType="submit">提交</Button>
          </FormItem>
        </Form>
      </div>
    )

  }

}

export default Form.create()(FormDemo)
