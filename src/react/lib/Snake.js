import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Square from './Square'

@observer
class Snake extends Component {
  render() {
    const { dimensions, position, speed } = this.props
    const cells = position.map((cell, index) => {
      return <Square
        dimensions={dimensions}
        key={`snake-cell-${index}`}
        left={cell[0]}
        speed={speed * 2}
        top={cell[1]}
        type="snake"
      />
    })

    return <div>{cells}</div>
  }
}

Snake.propTypes = {
  dimensions: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  speed: PropTypes.number.isRequired,
}

export default Snake
