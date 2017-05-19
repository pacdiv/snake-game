import {DISPLAYS} from './Constants'

/**
 * Returns the dimensions to render
 * @returns {object} The object containing dimensions of the board and squares
 */
export const getDimensions = () => {
  const board = {}
  const square = {}

  if (window.innerWidth >= window.innerHeight) {
    board.cols = DISPLAYS.LANDSCAPE_COLS
    board.rows = DISPLAYS.LANDSCAPE_ROWS
  }
  else {
    board.cols = DISPLAYS.PORTRAIT_COLS
    board.rows = DISPLAYS.PORTRAIT_ROWS
  }
  square.height = window.innerWidth / board.cols
  square.width = square.height / window.innerWidth * 100

  return { board, square }
}
