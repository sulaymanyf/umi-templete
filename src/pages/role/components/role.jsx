import { Tag } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';

const { CheckableTag } = Tag;

// const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

class RoleTags extends Component {
  state = {
    selectedTags: [],
    tagsFromServer: [],
  };

  constructor(props) {
    super(props);
    console.log('namelist', this.props.list);
    this.setState({
      tagsFromServer: this.props.list,
    });
  }

  handleChange(tag, checked) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    console.log('You are interested in: ', nextSelectedTags);
    this.setState({ selectedTags: nextSelectedTags });
  }

  render() {
    const { selectedTags, tagsFromServer } = this.state;
    return (
      <div>
        <span style={{ marginRight: 8 }}>Categories:</span>
        {this.props.list.map(tag => (
          <CheckableTag
            key={tag.name}
            checked={selectedTags.indexOf(tag.name) > -1}
            onChange={checked => this.handleChange(tag.name, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </div>
    );
  }
}
export default connect()(RoleTags);
