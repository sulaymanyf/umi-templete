import { Tag } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';

const { CheckableTag } = Tag;

// const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

class RoleTags extends Component {
  state = {
    selectedTags: [],
    title: '',
    tagsFromServer: [],
  };

  constructor(props) {
    super(props);
    this.setState({
      tagsFromServer: this.props.list,
      title: this.props.title,
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
        <h4 style={{ marginBottom: 16 }}>{this.props.title}:</h4>
        <div>
          {this.props.list.map(tag => (
            <Tag
              color="#f50"
              key={tag.name}
              checked={selectedTags.indexOf(tag.name) > -1}
              onChange={checked => this.handleChange(tag.name, checked)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    );
  }
}
export default connect()(RoleTags);
