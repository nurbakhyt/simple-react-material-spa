import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'
import Pagination from './Pagination'
import FilterLinks from './FilterLinks'
import Form from './Form'

export default class Main extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    selectedFilter: PropTypes.string.isRequired,
    groups: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    onEditName: PropTypes.func.isRequired,
    onEditDesc: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      id: 0,
      name: '',
      description: '',
      index: 1
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users.length) {
      this.setState((prevState, props) => ({
        id: props.users[0].id,
        name: props.users[0].name,
        description: props.users[0].description,
        index: 1
      }))
    }
  }

  handleChange(name, value) {
		this.setState({ [name]: value })
	}

  handleEdit(field) {
    const { onEditName, onEditDesc } = this.props
    switch (field) {
      case 'name':
        onEditName(this.state.id, this.state.name)
        break
      case 'description':
        onEditDesc(this.state.id, this.state.description)
        break
      default:
        break
    }
  }

  handlePrevious(e) {
    e.preventDefault()
    this.setState((prevState, props) => ({
      id: props.users.find(item => item.id === this.state.id - 1).id,
      name: props.users.find(item => item.id === this.state.id - 1).name,
      description: props.users.find(item => item.id === this.state.id - 1).description,
      index: this.state.index - 1
    }))
  }

  handleForward(e) {
    e.preventDefault()
    const { users } = this.props
    this.setState({
      id: users.find(item => item.id === this.state.id + 1).id,
      name: users.find(item => item.id === this.state.id + 1).name,
      description: users.find(item => item.id === this.state.id + 1).description,
      index: this.state.index + 1
    })
  }

  handleGroup(filter) {
    const { onSetFilter } = this.props
    onSetFilter(filter)
    this.setState({ index: 1})
  }

  render() {
    const { isLoading, groups, users, selectedFilter } = this.props

    return (
      <div style={{ textAlign: 'center', paddingTop: 32}}>
        <div>
          {isLoading && <CircularProgress />}
        </div>

        <FilterLinks
          onClick={this.handleGroup.bind(this)}
          selected={selectedFilter}
          groups={groups}
        />

        <Form
          name={this.state.name}
          description={this.state.description}
          onChange={this.handleChange.bind(this)}
          onEdit={this.handleEdit.bind(this)}
        />

        <Pagination
          current={this.state.index}
          length={users.length}
          onPrevious={this.handlePrevious.bind(this)}
          onForward={this.handleForward.bind(this)}
        />
      </div>
    )
  }
}
