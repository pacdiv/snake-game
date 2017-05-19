import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import '../theme/Square.scss'

@observer
class Square extends Component {
  render() {
    const { dimensions, left, top, type, speed } = this.props
    let style = {
      height: `${dimensions.height}px`,
      left: `${left * dimensions.width}%`,
      top: `${top * dimensions.height}px`,
      width: `${dimensions.width}%`
    }
    if (speed) {
      style = {
        ...style,
        transition: `${speed}ms`
      }
    }

    return (
      <div className={`square ${type}-cell`} style={style} />
    )
  }
}

Square.propTypes = {
  dimensions: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  speed: PropTypes.number
}

export default Square
