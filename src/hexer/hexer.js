/**
 *
 * @param {HTMLCanvasElement} canvas
 * @param {HexSetup} setup
 * @param {HexerLogicalMap} logical
 * @constructor
 */
function Hexer(canvas, setup,logical) {
    const HEXAGON_ANGLE = 0.523598776;
    const BOARD_WIDTH = 20;
    const BOARD_HEIGHT = 20;
    const SIDE_LENGTH = 18;
    this.boardWidth = setup.boardWidth || BOARD_WIDTH;
    this.boardHeight = setup.boardHeight || BOARD_HEIGHT;
    this.sideLength = setup.sideLength || SIDE_LENGTH;
    this.hexHeight = Math.sin(HEXAGON_ANGLE) *this.sideLength;
    this.hexRadius = Math.cos(HEXAGON_ANGLE) *this.sideLength;
    this.hexRectangleHeight =this.sideLength + 2 * this.hexHeight;
    this.hexRectangleWidth = 2 * this.hexRadius;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');

    this.ctx.fillStyle = setup.fillStyle || this.ctx.fillStyle;
    this.ctx.strokeStyle = setup.strokeStyle || this.ctx.strokeStyle ;
    this.ctx.lineWidth = setup.lineWidth || this.ctx.lineWidth;
    this.logical = logical;

    let that = this;

    /**
     *
     * @param {NonStandardMouseEvent} eventInfo
     * @return {?HexCoordinate}
     */
    function is_valid_hex_from_event(eventInfo) {
        let x = eventInfo.offsetX || (eventInfo.layerX??-1 );
        let y = eventInfo.offsetY || (eventInfo.layerY??-1 );

        try {
            let coords = that.get_board_coords(x, y);
            if (coords.mapX >= 0 && coords.mapX < that.boardWidth) {
                if (coords.mapY >= 0 && coords.mapY < that.boardHeight) {
                    return coords;
                }
            }
        } catch (err) {
            //its invalid
        }
        return null;
    }

    if (this.logical) {
        this.canvas.addEventListener("click", function (eventInfo) {

            let coords = is_valid_hex_from_event(eventInfo);
            if (coords) {
                let test = new HexCoordinate(5,8);
                console.debug('coordinates',coords,coords.distance(test));
                that.logical.onMouseClick(coords, that);
            }
        });


        this.canvas.addEventListener("mousemove", function (eventInfo) {

            let coords = is_valid_hex_from_event(eventInfo);
            if (coords) {
                that.logical.onMouseMove(coords, that);
            }
        });

        this.canvas.addEventListener("mousedown", function (eventInfo) {

            let coords = is_valid_hex_from_event(eventInfo);
            if (coords) {
                that.logical.onMouseDown(coords, that);
            }
        });

        this.canvas.addEventListener("mouseup", function (eventInfo) {

            let coords = is_valid_hex_from_event(eventInfo);
            if (coords) {
                that.logical.onMouseUp(coords, that);
            }
        });
    }
    /**
     * @param {Number} x
     * @param {Number} y
     * @return {HexCoordinate}
     */
    this.get_board_coords = function(x,y) {
        let hexY = Math.floor(y / (this.hexHeight + this.sideLength));
        let hexX = Math.floor((x - (hexY % 2) * this.hexRadius) / this.hexRectangleWidth);
        return new HexCoordinate(hexX,hexY);
    };


    /**
     *
     * @param {HexCoordinate} coordinate
     * @return {HexPixel}
     */
    this.get_pixels = function(coordinate) {

        let x = coordinate.mapX * this.hexRectangleWidth + ((coordinate.mapY % 2) * this.hexRadius);
        let y = coordinate.mapY * (this.sideLength + this.hexHeight);
        return new HexPixel(x,y);
    }


    /**
     *
     * @param {number} i
     * @param {number} j
     * @param {?drawHexagonCallback} callback if supplied will not call the logical, otherwise will call the logical for this i,j
     */
    this.drawHexagon = function (i, j,callback) {
        let coordinates = new HexCoordinate(i,j);
        let pixels = this.get_pixels(coordinates);
        let x = pixels.pixelX;
        let y = pixels.pixelY;

        this.ctx.beginPath();
        this.ctx.moveTo(x + this.hexRadius, y);
        this.ctx.lineTo(x + this.hexRectangleWidth, y + this.hexHeight);
        this.ctx.lineTo(x + this.hexRectangleWidth, y + this.hexHeight + this.sideLength);
        this.ctx.lineTo(x + this.hexRadius, y + this.hexRectangleHeight);
        this.ctx.lineTo(x, y + this.sideLength + this.hexHeight);
        this.ctx.lineTo(x, y + this.hexHeight);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.save();
        this.ctx.clip();

        if (callback) {
            callback(coordinates,pixels,this);
        } else {
            if (that.logical) {
                that.logical.draw(coordinates,this);
            }

        }
        this.ctx.restore();
    }

    this.drawBoard = function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let x = 0; x < this.boardWidth; x++) {
            for (let y = 0; y < this.boardHeight; y++) {
                this.drawHexagon(x,y,null);
            }
        }
    }
}