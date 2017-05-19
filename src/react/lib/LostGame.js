import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import { getOrdinal } from './Utils'
import '../theme/LostGame.scss'

class LostGame extends Component {
  render() {
    return (
      <div>
        <h2>YOU LOST !</h2>
        <h4>SCORE: {this.props.score}</h4>
        <h3>YOUR RANK: <b>{getOrdinal(this.props.rank)}</b></h3>
        <br />
        <p className="link">
          <small onClick={() => this.props.onSelect(MENU.SAVERANK)}>
            SAVE YOUR {getOrdinal(this.props.rank)} PLACE
          </small>
          <br/>
          <small onClick={() => this.props.onSelect()}>
            RESTART NOW !
          </small>
          <br/>
          <small onClick={() => this.props.onSelect(MENU.DEFAULT)}>
            BACK TO MENU
          </small>
        </p>
      </div>
    )
  }
}

LostGame.propTypes = {
  onSelect: PropTypes.func.isRequired,
  rank: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired
}

export default LostGame
