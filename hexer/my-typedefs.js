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