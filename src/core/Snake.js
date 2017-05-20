import { observable } from 'mobx'
import { SNAKE_DIGESTION_CAUSES, SNAKE_DIRECTIONS, SNAKE_HEALTHS } from './Constants'
import { addListener, removeListener } from './EventListener'
import { getSnakeNextDirection } from './Game'

const _state = {
  moving: false
}

class Snake {
  @observable direction = SNAKE_DIRECTIONS.EAST
  @observable health = SNAKE_HEALTHS.HEALTHY
  @observable speed = 75

  constructor(props) {
    this.props = props
    this.didChangeDirection = false
    this.changeDirection = this.changeDirection.bind(this)
    this.keepMoving = this.keepMoving.bind(this)
    this.sleep = this.sleep.bind(this)
    this.wakeUp = this.wakeUp.bind(this)
    this.improveSpeed = this.improveSpeed.bind(this)
  }

  /**
   * Updates snake's direction
   * @param {event} event The browser event
   * @returns {void}
   */
  changeDirection(event) {
    if (this.didChangeDirection) {
      return
    }

    const { direction, health, props: { field } } = this
    const nextDirection = getSnakeNextDirection({
      direction,
      event,
      field,
      health
    })

    if (nextDirection) {
      this.direction = nextDirection
      this.didChangeDirection = true
    }
  }

  /**
   * Updates snake's health
   * @param {number} foodType The type of food the snake did eat
   * @returns {void}
   */
  didEat(foodType) {
    this.health = SNAKE_DIGESTION_CAUSES[foodType]
  }

  /**
   * Improves snake's speed
   * @returns {void}
   */
  improveSpeed() {
    this.speed *= 0.9
  }

  /**
   * Triggers an update of snake's position
   * @returns {void}
   */
  keepMoving() {
    setTimeout(() => {
      this.didChangeDirection = false
      if (!_state.moving) {
        return
      }
      this.props.onMove()
      this.keepMoving()
    }, this.speed)
  }

  /**
   * Stops the snake
   * @returns {void}
   */
  sleep() {
    removeListener(this.changeDirection)
    _state.moving = false
  }

  /**
   * Starts the snake
   * @returns {void}
   */
  wakeUp() {
    this.direction = SNAKE_DIRECTIONS.EAST
    this.health = SNAKE_HEALTHS.HEALTHY
    this.speed = 75
    _state.moving = true
    addListener(this.changeDirection)
    this.keepMoving()
  }
}

export default Snake
