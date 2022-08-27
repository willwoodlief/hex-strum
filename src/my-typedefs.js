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
 * @param {Object.<string, SpecSignal[]>} signals
 */

/**
 *
 * @typedef  {object} rangeObject
 * @property {?number} [listen_min_strength]
 * @property {?number} [listen_max_strength]
 * @property {?number} [listen_min_hz]
 * @property {?number} [listen_max_hz]
 * @property {string} name
*/

/**
 *
 * @typedef  {object} signalObject
 * @property {string|number} hz
 * @property {number} range
 * @property {*} value
 */

/**
 *
 * @typedef  {object} locationObject
 * @property {number} x
 * @property {number} y
 */

/**
 *
 * @typedef  {object} entityInit
 * @property {signalObject} signal
 * @property {locationObject} location
 * @property {rangeObject[]} ranges
 * @property {?specValueCallback} [process]
 */

/**
 {{process: null,
  ranges: [{listen_max_hz: number, listen_min_strength: number, listen_min_hz: number, name: string, listen_max_strength: number}],
   location: {x: number, y: number},
    signal: {hz: number, range: number, value: string}
    }} init
 */


/**
 * @typedef {object} HexStrumRunSignal
 * @property {SpecSignal} signal
 * @property {HexCoordinate} position
 */