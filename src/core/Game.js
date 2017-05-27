import axios from 'axios'
import {
  FOOD_TYPES,
  KEYBOARD_DIRECTION_MAPPER,
  KEYBOARD_REVERTED_DIRECTION_MAPPER,
  SNAKE_ALLOWED_DIRECTIONS,
  SNAKE_DIRECTIONS,
  SNAKE_HEALTHS,
  SNAKE_OPPOSITE_DIRECTIONS
} from './Constants'

const { WEST, NORTH, EAST, SOUTH } = SNAKE_DIRECTIONS

/**
 * Generates a food item
 * @param {object} field The field's dimensions
 * @param {array} snakePosition The snake's position
 * @param {boolean} running Is the game running?
 * @returns {object} Food's position and type
 */
export const generateFood = (field, snakePosition, running) => {
  let position
  let filteredSnake
  const type = Math.random() + .25 >= 1 ? FOOD_TYPES.POISON : FOOD_TYPES.FRUIT

  if (!running) {
    return false
  }

  do {
    position = [
      Math.floor(Math.random() * (field.cols - 1)),
      Math.floor(Math.random() * (field.rows - 1))
    ]
    filteredSnake = snakePosition.slice().filter(item => {
      return JSON.stringify(item) !== JSON.stringify(position)
    })
  } while (filteredSnake.length !== snakePosition.length)

  return { position, type }
}

/**
 * Returns scoreboard
 * @returns {array} The scoreboard
 */
export const getScoreboard = () => {
  return axios.get(`${DOMAIN_NAME}/games/snake/scoreboard`)
    .then((response) => {
      return response.data
    })
    .catch(() => {
      return []
    })
}

/**
 * Returns scoreboard rank
 * @param {number} score The score to compare to the scoreboard
 * @returns {number} The user rank
 */
export const getScoreboardRank = (score) => {
  return axios.get(`${DOMAIN_NAME}/games/snake/rank/${score}`)
    .then((response) => {
      return response.data.rank
    })
    .catch(() => {
      return 0
    })
}

/**
 * Returns snake's next direction
 * @param {object} props Current direction and browser event
 * @returns {number} Next direction's value
 */
export const getSnakeNextDirection = (props) => {
  const { direction, event } = props
  const allowedDirections = SNAKE_ALLOWED_DIRECTIONS[direction]

  const requestedDirection = event.changedTouches
    ? getRequestedSnakeDirectionFromTouch(props)
    : getRequestedSnakeDirectionFromKeyCode(props)

  if (allowedDirections.indexOf(requestedDirection) > -1) {
    return requestedDirection
  }

  return false
}

/**
 * Returns requested direction from keyboard events
 * @param {object} props Browser event and snake's health
 * @returns {number} Requested direction's value
 */
const getRequestedSnakeDirectionFromKeyCode = (props) => {
  const { event: { keyCode }, health } = props

  if (keyCode < 37 || keyCode > 40) {
    return false
  }

  const mapper = health === SNAKE_HEALTHS.HEALTHY
    ? KEYBOARD_DIRECTION_MAPPER
    : KEYBOARD_REVERTED_DIRECTION_MAPPER

  return mapper[keyCode]
}

/**
 * Returns requested direction from touch events
 * @param {object} props Snake's direction, browser event, field dimentions and snake's health
 * @returns {number} Requested direction's value
 */
const getRequestedSnakeDirectionFromTouch = (props) => {
  const { direction, event, field, health } = props
  const { clientX, clientY } = event.changedTouches[0]
  let requestedDirection = false

  if (direction === WEST || direction === EAST) {
    if (clientY >= field.board.rows * field.square.height * .85) {
      requestedDirection = SOUTH
    }
    if (clientY <= field.board.rows * field.square.height * .15) {
      requestedDirection = NORTH
    }
  }
  else if (direction === NORTH || direction === SOUTH) {
    if (clientX >= field.board.cols * field.square.height * .85) {
      requestedDirection = EAST
    }
    if (clientX <= field.board.cols * field.square.height * .15) {
      requestedDirection = WEST
    }
  }

  return health === SNAKE_HEALTHS.HEALTHY
    ? requestedDirection
    : SNAKE_OPPOSITE_DIRECTIONS[requestedDirection]
}

/**
 * Returns snake's next position
 * @param {array} position The snake's current position
 * @param {number} direction The snake's current direction
 * @returns {array} Snake's head new position
 */
export const getSnakeNextPosition = (position, direction) => {
  const head = position[0].slice()

  switch (direction) {
    case WEST:
      head[0] -= 1
      break
    case NORTH:
      head[1] -= 1
      break
    case EAST:
      head[0] += 1
      break
    case SOUTH:
      head[1] += 1
      break
  }

  return head
}

/**
 * Determines if the snake is confused
 * @param {number} health The snake's health
 * @returns {boolean} Is snake confused?
 */
export const isSnakeConfused = (health) => {
  return health === SNAKE_HEALTHS.CONFUSED
}

export const postScore = (username, score) => {
  const data = { player: username, score }

  return new Promise((resolve, reject) => {
    return axios.post(`${DOMAIN_NAME}/games/snake/score`, data)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
