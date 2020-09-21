import React, { Fragment, useState } from 'react'
import { SubjectItems } from './SubjectItems'
import { Link } from 'react-router-dom'
import '../Header/Dropdown.css'

function Dropdown () {
  const [click, setClick] = useState(false)
  const handleClick = () => setClick(!click)

  return (
    <Fragment>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {SubjectItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </Fragment>
  )
}

export default Dropdown
