import React from 'react'
import ToLeft from 'material-ui/svg-icons/navigation/arrow-back'
import ToRight from 'material-ui/svg-icons/navigation/arrow-forward'

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

export default Pagination
