import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FOOD_TYPES } from '../../core/Constants'
import { observer } from 'mobx-react'
import Square from './Square'

@observer
class Food extends Component {
  render() {
    const { dimensions, position, type } = this.props

    return (
      <Square
        dimensions={dimensions}
        key={`snake-cell-food`}
        left={position[0]}
        top={position[1]}
        type={type === FOOD_TYPES.POISON ? 'poison-cell food' : 'fruit-cell food'}
      />
    )
  }
}

Food.propTypes = {
  dimensions: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
  type: PropTypes.number.isRequired
}

export default Food
