import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import '../theme/Commands.scss'

class Commands extends Component {
  render() {
    return (
      <div>
        <p>TAP ON YOUR SCREEN<br/>TO CHANGE DIRECTION</p>
        <p>or use your keyboard :</p>
        <p className="command">UP : <i className="arrow up"/> UP ARROW</p>
        <p className="command">RIGHT :<i className="arrow right"/> RIGHT ARROW</p>
        <p className="command">DOWN : <i className="arrow down"/> DOWN ARROW</p>
        <p className="command">LEFT : <i className="arrow left"/> LEFT ARROW</p>
        <br/>
        <p className="link" onClick={() => this.props.onSelect(MENU.DEFAULT)}>
          <small>BACK TO MENU</small>
        </p>
      </div>
    )
  }
}

Commands.propTypes = {
  onSelect: PropTypes.func
}

export default Commands
