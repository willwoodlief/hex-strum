/**
 * @typedef {MouseEvent} NonStandardMouseEvent
 * @property {number} [layerX]
 * @property {number} [layerY]
 */

/**
 * This callback is used for the Hex map calling back on an individual coordinate
 * @callback drawHexagonCallback
 * @param {HexCoordinate} coordinates
 * @param {HexPixel} pixels
 * @param {Hexer} map
 */


/**
 * This callback is used for the spec generating a new value
 * @callback specValueCallback
 * @param {object} values
 */

/**
 *
 * @typedef  {object} entityInit
 * @property {object} signal
 * @property {string|number} signal.hz
 * @property {number} signal.range
 * @property {number} signal.value
 * @property {object} location
 * @property {number} location.x
 * @property {number} location.y
 * @property {SpecSignalRange[]} ranges
 * @property {specValueCallback} process
 */