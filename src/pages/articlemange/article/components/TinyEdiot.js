import React, {Component} from "react";
import {Editor} from '@tinymce/tinymce-react';

class TinyEdiot extends Component {

  state = {
    fileId: null,
    text: " <p class=\"Gvde DocDefaults \" style=\"text-align: justify;line-height: 150%;\"><span class=\"a0 \" style=\"font-weight: bold;font-size: 12.0pt;;font-family: 'Times New Roman';\">5.1.1. Concept of Service</span></p>",
  }

  constructor(props) {
    super(props)
    this.state.fileId = props.id
    this.handleEditorChange = this.handleEditorChange.bind(this)
  }

  componentDidMount () {
    console.log(this.state.fileId)
    fetch('api/ceviri-kizlar/v1/file/' + this.state.fileId)
      .then(res => res.text())
      .then( ress => {
        this.setState({
          text: ress
        })
        console.log("========================================")
        console.log(this.state.text);
        console.log("========================================")
        // setOptions(ress.data)

      });
  }
  handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getBody());
    console.log('Content was updated:', e.target.getDoc());
    console.log('Content was updated:', e.target.getElement());
    console.log('Content was updated:', e.target.getContent({format : 'text'}));
    console.log('Content was updated:', e.target.getContent({format : 'html'}));
  }
  render() {
    const { text } = this.state
    console.log("=============text===========================")
    console.log(text)
    console.log("==============text==========================")
    return (
      <Editor
        initialValue={text}
        value={text}
        init={{
          height: 800,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEdiot;
