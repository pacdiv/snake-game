import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'

class Scoreboard extends Component {
  render() {
    return (
      <div>
        <h3>SCOREBOARD<br/>UNDER CONSTRUCTION</h3>
        <br/>
        <p onClick={() => this.props.onSelect(MENU.DEFAULT)} style={{ textAlign: 'center' }}>
          <small>BACK TO MENU</small>
        </p>
      </div>
    )
  }
}

Scoreboard.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default Scoreboard
