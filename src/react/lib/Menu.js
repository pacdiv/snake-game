import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import '../theme/Menu.scss'

class Menu extends Component {
  render() {
    return (
      <div>
        <p className="choice link" onClick={() => this.props.onSelect()}>
          PLAY NOW
        </p>
        {<p className="choice link" onClick={() => this.props.onSelect(MENU.SCOREBOARD)}>
          SCOREBOARD
        </p>}
        <p className="choice link" onClick={() => this.props.onSelect(MENU.HOWTOPLAY)}>
          HOW TO PLAY
        </p>
        <p className="choice link" onClick={() => window.open('https://github.com/pacdiv/snake-game', '_blank')}>
          GITHUB
        </p>
      </div>
    )
  }
}

Menu.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default Menu
