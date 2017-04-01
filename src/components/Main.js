import React, { Component, PropTypes } from 'react'
import {
  Route,
  Link,
  Switch
} from 'react-router-dom'
import classnames from 'classnames'
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
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const { users, match } = this.props
    if (nextProps.users.length) {
      this.setState((prevState, props) => ({
        name: props.users.find(item => item.id === parseInt(nextProps.match.params.id) - 1).name,
        description: props.users.find(item => item.id === parseInt(nextProps.match.params.id) - 1).description
      }))
    }
  }

  handleChange(event, value) {
		// event.preventDefault()
		this.setState({ [event.target.name]: value })
    console.log(this.state)
	}

  handleEdit(field) {
    const { onEditName, onEditDesc, match } = this.props
    switch (field) {
      case 'name':
        onEditName(parseInt(match.params.id) - 1, this.state.name)
        return 0
      case 'description':
        onEditDesc(parseInt(match.params.id) - 1, this.state.description)
        return 0
      default:
        return 0
    }
  }

  render() {
    const { isLoading, groups, users, selectedFilter, match } = this.props
    console.log('groups', groups && groups.length)

    return (
      <div style={{ textAlign: 'center', paddingTop: 32}}>
        <div>
          {isLoading && <CircularProgress />}
        </div>

        <FlatButton label="all" />
        {groups &&
          groups.map((group, i) => <FlatButton
            key={i}
            label={group}
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
          current={parseInt(match.params.id)}
          length={users.length}
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
        && <Link to={`${prev}`}>
            <ToLeft />
          </Link>
      }
      {current} from {length}
      {next
        && <Link to={`${next}`}>
            <ToRight />
          </Link>
      }
    </div>
  )
}
