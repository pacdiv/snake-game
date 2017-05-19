import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'
import '../theme/SaveRank.scss'

class SaveRank extends Component {
  constructor(props) {
    super(props)
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    this.textInput.focus()
  }

  _handleSubmit(event) {
    event.preventDefault()
    this.props.saveScore(this.textInput.value)
    this.textInput.value = ''
  }

  render() {
    return (
      <div>
        <form id="save-rank" onSubmit={this._handleSubmit}>
          <input
            type="text"
            placeholder="Luke S."
            ref={(input) => { this.textInput = input }}
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
  saveScore: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
}

export default SaveRank
