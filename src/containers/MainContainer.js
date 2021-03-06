import { connect } from 'react-redux'
import Main from '../components/Main'
import {
  editName,
  editDesc,
  setFilter
} from '../actions'

const getFilteredData = (users, filter) => {
  if (filter === 'all') {
    return users
  } else {
    return users.filter(user => user.group === filter)
  }
}

const mapStateToProps = store => ({
  isLoading: store.data.isLoading,
  groups: store.data.groups,
  selectedFilter: store.data.selectedFilter,
  users: getFilteredData(store.data.items, store.data.selectedFilter),
})

const mapDispatchToProps = dispatch => ({
  onEditName(id, name) {
    dispatch(editName(id, name))
  },
  onEditDesc(id, desc) {
    dispatch(editDesc(id, desc))
  },
  onSetFilter(filter) {
    dispatch(setFilter(filter))
  }
})

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default MainContainer
