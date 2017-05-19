import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../theme/Field.scss'

class Field extends Component {
  render() {
    const { board, square } = this.props.dimensions
    const style = {
      height: `${board.rows * square.height}px`,
      width: `${board.cols * square.width}%`
    }

    return (
      <div className="field" style={style}/>
    )
  }
}

Field.propTypes = {
  dimensions: PropTypes.object.isRequired
}

export default Field
