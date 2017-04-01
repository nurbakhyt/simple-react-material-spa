import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import './styles/App.scss'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Main from './containers/MainContainer'
import About from './components/About'

export default class App extends Component {

  static propTypes = {
    initialize: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {open: false}
  }

  componentDidMount() {
    const { initialize } = this.props
    initialize()
  }

  handleTouchToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <AppBar
              className={classnames({ 'app-bar': !this.state.open, 'app-bar--expanded': this.state.open })}
              onLeftIconButtonTouchTap={this.handleTouchToggle.bind(this)}
              title="App"
            />
            <Drawer
              docked={true}
              open={this.state.open}
              onRequestChange={open => this.setState({open})}
            >
              <Link to="/1" className="nav-link">
                <MenuItem onClick={this.handleClose}>Main</MenuItem>
              </Link>
              <Link to="/about" className="nav-link">
                <MenuItem onClick={this.handleClose}>About</MenuItem>
              </Link>
            </Drawer>

            <div className={classnames({ 'app-content': !this.state.open, 'app-content--expanded': this.state.open })}>
              <Switch>
                <Route exact path="/about" component={About}/>
                <Route path="/:id" component={Main}/>
                <Redirect from='/' to='/1'/>
              </Switch>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    )
  }
}
