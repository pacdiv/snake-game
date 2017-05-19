import { computed, observable } from 'mobx'
import { getDimensions } from './Board'
import {
  generateFood,
  getScoreboardRank,
  getSnakeNextPosition,
  isSnakeConfused,
  postScore
} from './Game'
import { ITEM_TYPES, MENU } from './Constants'
import Snake from './Snake'

const { SNAKE: SNAKE_TYPE, FOOD: FOOD_TYPE } = ITEM_TYPES
const snakeDefaultPosition = [[ 4, 3 ], [ 3, 3 ], [ 2, 3 ]]

class AppState {
  field = {}
  @observable menu = MENU.DEFAULT
  @observable positions = new Map()
  @observable score = 0
  @observable snake = {}
  @observable rank = 0
  @observable running = false

  constructor() {
    this.handleSnakeMove = this.handleSnakeMove.bind(this)
    this.field = getDimensions()
    this.snake = new Snake({
      field: this.field,
      onMove: this.handleSnakeMove
    })
    this.positions.set(SNAKE_TYPE, snakeDefaultPosition)
    this.saveScore = this.saveScore.bind(this)
  }

  /**
   * Extracts the food's properties from this.positions
   *
   */
  @computed get food() {
    return this.positions.has(FOOD_TYPE)
      ? this.positions.get(FOOD_TYPE)
      : false
  }

  /**
   * Extrants snake's position from this.position
   *
   */
  @computed get snakePosition() {
    return this.positions.has(SNAKE_TYPE)
      ? this.positions.get(SNAKE_TYPE)
      : false
  }

  /**
   * Returns snake's speed
   *
   */
  @computed get snakeSpeed() {
    return this.snake.speed
  }

  /**
   * Handles movements from the snake
   * @returns {void}
   */
  handleSnakeMove() {
    const { positions, snake: { direction } } = this
    const snakePosition = positions.get(SNAKE_TYPE)
    const foodPosition = positions.get(FOOD_TYPE).position
    const head = getSnakeNextPosition(snakePosition, direction)

    snakePosition.unshift(head)
    if (JSON.stringify(head) === JSON.stringify(foodPosition)) {
      this.snakeDidEat()
    }
    else {
      snakePosition.pop()
    }
    this.positions.set(SNAKE_TYPE, snakePosition)

    if (this.hasSnakeReachedSomething(snakePosition)) {
      this.snake.sleep()
      this.gameEnd()
    }
  }

  /**
   * Checks if the snake did hit something
   * @param {array} newPosition The snake's new position
   * @returns {void}
   */
  hasSnakeReachedSomething(newPosition) {
    const [ x, y ] = newPosition[0]
    const { cols, rows } = this.field.board

    if (x === -1 || y === -1 || x === cols || y === rows) {
      return true
    }

    const head = newPosition.slice().shift()
    const filtered = newPosition.filter(item => {
      return JSON.stringify(item) !== JSON.stringify(head)
    })
    if (newPosition.length - 1 !== filtered.length) {
      return true
    }

    return false
  }

  /**
   * Stops the game and displays the menu
   * @returns {void}
   */
  gameEnd() {
    this.menu = MENU.LOSTGAME
    this.running = false
    this.snake.sleep()
    this.positions.clear()
    getScoreboardRank(this.score).then((rank) => {
      this.rank = rank
    })
  }

  /**
   * Starts the game
   * @returns {void}
   */
  gameStart() {
    const { board } = this.field

    this.running = true
    this.score = 0
    this.rank = 0
    this.positions.set(SNAKE_TYPE, snakeDefaultPosition)
    this.positions.set(FOOD_TYPE, generateFood(board, snakeDefaultPosition, true))
    this.snake.wakeUp()
  }

  saveScore(username) {
    postScore(username, this.score)
      .then(() => {
        this.menu = MENU.SAVEDRANK
      })
      .catch(() => {})
  }

  /**
   * Handles when the snake eats some food
   * @returns {void}
   */
  snakeDidEat() {
    const { positions, field: { board }, running } = this

    this.score += isSnakeConfused(this.snake.health) ? 10 : 1
    this.snake.didEat(positions.get(FOOD_TYPE).type)
    this.positions.set(FOOD_TYPE, generateFood(board, positions.get(SNAKE_TYPE), running))
    this.snake.improveSpeed()
  }
}

export default AppState