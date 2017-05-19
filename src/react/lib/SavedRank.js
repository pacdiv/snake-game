import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MENU } from '../../core/Constants'

class SavedRank extends Component {
  render() {
    return (
      <div>
        <p>Saved !</p>
        <br/>
        <p className="link">
          <small onClick={() => this.props.onSelect()}>
            RETRY !
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

SavedRank.propTypes = {
  onSelect: PropTypes.func.isRequired
}

export default SavedRank
