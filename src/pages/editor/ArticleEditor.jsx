import React, { Component } from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './editorStyles.css';
import { connect } from 'dva';

class ArticleEditor extends Component {
  state = {
    editorState: BraftEditor.createEditorState(
      '<p>Çeviri <b> bir duvar halısının tersidir.</b></p>',
    ), // 设置编辑器初始内容
    outputHTML: '<p></p>',
    myFile: {},
    fileId: null,
    outputTEXT: '',
  };
  constructor(props) {
    super(props);
    this.state.fileId = props.id;
    console.log(props);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.isLivinig = true;
    // 3秒后更改编辑器内容
    setTimeout(this.setEditorContentAsync, 1000);
    const { dispatch } = this.props;
    dispatch({
      type: 'myFile/getCeviri',
      payload: this.state.fileId,
    });
  }

  componentWillUnmount() {
    this.isLivinig = false;
  }

  handleChange = editorState => {
    console.log(editorState.toRAW(true).blocks[0].text);
    console.log(editorState.toHTML());
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML(),
      outputTEXT: editorState.toRAW(true).blocks[0].text,
    });
  };

  setEditorContentAsync = () => {
    this.isLivinig &&
      this.setState({
        editorState: BraftEditor.createEditorState(this.props.myFile.ceviri),
      });
  };

  render() {
    const { editorState, outputHTML } = this.state;

    return (
      <div>
        <div className="editor-wrapper">
          <BraftEditor value={editorState} onChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

export default connect(({ myFile }) => ({ myFile }))(ArticleEditor);
