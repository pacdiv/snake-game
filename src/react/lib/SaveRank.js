import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import '../theme/SaveRank.scss'

class SaveRank extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player: this.props.player
    }
    this._handleChange = this._handleChange.bind(this)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    this.textInput.focus()
  }

  _handleChange(event) {
    event.preventDefault()
    this.setState({ player: this.textInput.value })
  }

  _handleSubmit(event) {
    event.preventDefault()
    this.props.saveScore(this.textInput.value)
  }

  render() {
    return (
      <div>
        <form id="save-rank" onSubmit={this._handleSubmit}>
          <input
            onChange={this._handleChange}
            placeholder="Luke S."
            ref={(input) => { this.textInput = input }}
            type="text"
            value={this.state.player}
          />
          <div className="submit">
            <input type="submit" value="SAVE"/>
          </div>
        </form>
        <p onClick={() => this.props.onSelect(MENU.DEFAULT)} className="link">
          <small>BACK TO MENU</small>
        </p>
      </div>
    )
  }
}

SaveRank.propTypes = {
  onSelect: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  saveScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
}

export default SaveRank
