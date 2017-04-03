import React from 'react'
import FlatButton from 'material-ui/FlatButton'


const FilterLinks = ({ onClick, selected, groups }) => (
  <div>
    <FlatButton label="all" onTouchTap={e => onClick('all')} primary={selected === 'all'} />
    {groups &&
      groups.map((group, i) => <FlatButton
        key={i}
        label={group}
        primary={selected === group}
        onTouchTap={e => onClick(group)}
      />)
    }
  </div>
)

export default FilterLinks
