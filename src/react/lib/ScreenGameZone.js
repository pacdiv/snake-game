import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../theme/ScreenGameZone.scss'

class ScreenGameZone extends Component {
  render() {
    const { fieldHeight } = this.props
    const bottomStyle = { bottom: `calc(100vh - ${fieldHeight}` }

    return (
      <div>
        <div className="gameplay-zone-left"/>
        <div className="gameplay-zone-top"/>
        <div className="gameplay-zone-right"/>
        <div className="gameplay-zone-bottom" style={bottomStyle}/>
      </div>
    )
  }
}

ScreenGameZone.propTypes = {
  fieldHeight: PropTypes.number
}

export default ScreenGameZone
