import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import Field from './Field'
import Food from './Food'
import Modal from './Modal'
import ScreenGameZone from './ScreenGameZone'
import Snake from './Snake'

@observer
class App extends React.Component {
  render() {
    const { field, fieldHeight, food, running, snakePosition, snakeSpeed } = this.props.appState

    return (
      <div>
        {running && <Field dimensions={field}/>}
        {food && <Food dimensions={field.square} position={food.position} type={food.type}/>}
        {snakePosition && <Snake dimensions={field.square} position={snakePosition} speed={snakeSpeed}/>}
        {!running && <Modal appState={this.props.appState}/>}
        <ScreenGameZone fieldHeight={fieldHeight}/>
      </div>
    )
  }
}

App.propTypes = {
  field: PropTypes.object,
  food: PropTypes.object,
  running: PropTypes.bool,
  snakePosition: PropTypes.array,
  snakeSpeed: PropTypes.number,
  appState: PropTypes.object.isRequired
}

export default App
