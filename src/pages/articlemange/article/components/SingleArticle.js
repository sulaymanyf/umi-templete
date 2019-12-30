import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { connect } from 'dva';


class Editor extends React.Component {

  state = {
    fileId:null,
    editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
    contentText:"",
    outputHTML: '<p></p>'
  }
  constructor(props) {

    super(props);
    this.state.fileId=props.id,
    console.log("super(props)")
    console.log(props)
    console.log("super(props)")

  }
  componentDidMount () {
    const { dispatch } = this.props
    console.log(this.state.fileId)
    fetch('api/ceviri-kizlar/v1/file/'+this.state.fileId)
      .then(res => res.text())
      .then(ress => {

        console.log(ress);
        this.state.contentText = ress
        // setOptions(ress.data)

      })
    this.isLivinig = true
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState(this.state.contentText )
    })
  }

  render () {

    const { editorState, outputHTML } = this.state

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )

  }

}
export default Editor;
