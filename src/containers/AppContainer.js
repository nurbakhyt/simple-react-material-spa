import { connect } from 'react-redux'
import App from '../App'
import { fetchData } from '../actions'

const mapStateToProps = store => ({})

const mapDispatchToProps = dispatch => ({
  initialize: () => {
    dispatch(fetchData())
  }
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
