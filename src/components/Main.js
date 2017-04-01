import React, { Component, PropTypes } from 'react'
import ToLeft from 'material-ui/svg-icons/navigation/arrow-back'
import ToRight from 'material-ui/svg-icons/navigation/arrow-forward'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

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
    const { users } = this.props
    if (nextProps.users.length) {
      this.setState((prevState, props) => ({
        id: props.users[0].id,
        name: props.users[0].name,
        description: props.users[0].description
      }))
    }
  }

  handleChange(event, value) {
		// event.preventDefault()
		this.setState({ [event.target.name]: value })
	}

  handleEdit(field) {
    const { onEditName, onEditDesc, match } = this.props
    switch (field) {
      case 'name':
        onEditName(this.state.id, this.state.name)
        return 0
      case 'description':
        onEditDesc(this.state.id, this.state.description)
        return 0
      default:
        return 0
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

  componentDidUpdate(prevProps, prevState) {
    // console.log('componentDidUpdate 1', prevProps, prevState)
    // console.log('componentDidUpdate 2', this.props, this.state)
  }

  render() {
    const { isLoading, groups, users, selectedFilter, match } = this.props

    return (
      <div style={{ textAlign: 'center', paddingTop: 32}}>
        <div>
          {isLoading && <CircularProgress />}
        </div>

        <FlatButton label="all" onTouchTap={this.handleGroup.bind(this, 'all')} primary={selectedFilter === 'all'} />
        {groups &&
          groups.map((group, i) => <FlatButton
            key={i}
            label={group}
            primary={selectedFilter === group}
            onTouchTap={this.handleGroup.bind(this, group)}
          />)
        }

        <form>
          <TextField
            name="name"
            hintText="Name"
            value={this.state.name}
            onChange={this.handleChange.bind(this)}
          />
          <FlatButton label="Edit" primary={true} onTouchTap={this.handleEdit.bind(this, 'name')} />
          <br />
          <TextField
            name="description"
            hintText="Description"
            multiLine={true}
            rows={2}
            value={this.state.description}
            onChange={this.handleChange.bind(this)}
          />
          <FlatButton label="Edit" primary={true} onTouchTap={this.handleEdit.bind(this, 'description')} />
        </form>

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

const Pagination = ({ current, length, onForward, onPrevious }) => {
  const prev = current > 1 ? current - 1 : null
  const next = current < length ? current + 1 : null
  return (
    <div>
      {prev
        && <a href="#" onClick={onPrevious}>
            <ToLeft />
          </a>
      }
      {current} from {length}
      {next
        && <a href="#" onClick={onForward}>
            <ToRight />
          </a>
      }
    </div>
  )
}
