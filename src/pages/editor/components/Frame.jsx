import React from 'react';
import editorStyles from '../editorStyles.css';

class Frame extends React.Component {
  constructor(props) {
    super(props);
    this.iframeRef = null;
    this.handleRef = this._handleRef.bind(this);
  }
  _handleRef(ref) {
    if (ref !== this.iframeRef) {
      this.iframeRef = ref;
      if (ref) {
        if (ref.contentDocument && this.props.head) {
          ref.contentDocument.head.innerHTML = this.props.head;
        }
        // Re-render must take place in the next tick (Firefox)
        setTimeout(() => {
          this.forceUpdate();
        });
      }
    }
  }
  render() {
    const ref = this.iframeRef;
    let portal = null;
    return (
      <div>
        <iframe ref={this.handleRef} style={styles.frame} />
        {portal}
      </div>
    );
  }
}
const styles = {
  frame: {
    height: 400,
    width: 800,
  },
};

export default Frame;
