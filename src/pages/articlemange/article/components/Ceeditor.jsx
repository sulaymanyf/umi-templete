import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, {Component} from "react";
import BraftEditor from "braft-editor";
class Ceeditor extends Component {

  state = {
    fileId:null,
    text: "ss",
  }
  constructor(props) {

    super(props)
    console.log("super(props)")
    console.log(props)
    console.log("super(props)")
    this.state.fileId=props.id,
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    console.log(this.state.fileId)
    fetch('api/ceviri-kizlar/v1/file/'+this.state.fileId)
      .then(res => res.text())
      .then(ress => {
        this.setState({
          text:ress
        })
        this.state.text = ress
        console.log( this.state.text);

        // setOptions(ress.data)

      });
  }
  handleChange(value) {
    this.setState({ text: value })
  }

  render() {
    const { text } = this.state
    return (
      <ReactQuill value={text}

                  onChange={this.handleChange} />
    )
  }
};

export default Ceeditor;
