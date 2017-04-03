import React from 'react'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

const Form = ({ name, description, onChange, onEdit }) => (
  <form>
    <TextField
      name="name"
      hintText="Name"
      value={name}
      onChange={e => onChange(e.target.name, e.target.value)}
    />
    <FlatButton label="Edit" primary={true} onTouchTap={() => onEdit('name')} />
    <br />
    <TextField
      name="description"
      hintText="Description"
      multiLine={true}
      rows={2}
      value={description}
      onChange={e => onChange(e.target.name, e.target.value)}
    />
    <FlatButton label="Edit" primary={true} onTouchTap={() => onEdit('description')} />
  </form>
)

export default Form
