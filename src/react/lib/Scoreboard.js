import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import { getOrdinal } from './Utils'
import '../theme/Scoreboard.scss'

class Scoreboard extends Component {
  componentDidMount() {
    this.props.updateScoreboard()
  }

  _getItems() {
    return this.props.scoreboard.map((item) => {
      return (
        <div className="item">
          <div className="place">{getOrdinal(item.place)}</div>
          <div className="player">{item.player}</div>
          <div className="score">{item.score}</div>
        </div>
      )
    })
  }

  render() {
    return (
      <div className="scoreboard">
        <h3>TOP 20</h3>
        <div className="board">
          <div className="item">
            <div className="place">PLACE</div>
            <div className="player">PLAYER</div>
            <div className="score">SCORE</div>
          </div>
          {this._getItems()}
        </div>
        <br/>
        <p onClick={() => this.props.onSelect(MENU.DEFAULT)} style={{ textAlign: 'center' }}>
          <small>BACK TO MENU</small>
        </p>
      </div>
    )
  }
}

Scoreboard.propTypes = {
  onSelect: PropTypes.func.isRequired,
  scoreboard: PropTypes.array.isRequired,
  updateScoreboard: PropTypes.func.isRequired
}

export default Scoreboard
