/**
 * Adds event listeners
 * @param {function} callback The callback to run
 * @returns {void}
 */
export const addListener = (callback) => {
  document.addEventListener('keydown', callback, false);
  document.addEventListener('touchend', callback, false);
}

/**
 * Removes events listeners
 * @param {function} callback The callback to run
 * @returns {void}
 */
export const removeListener = (callback) => {
  document.removeEventListener('keydown', callback, false);
  document.removeEventListener('touchend', callback, false);
}
