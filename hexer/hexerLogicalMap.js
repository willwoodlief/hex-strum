/**
 * @param {HexSetup} settings
 * @constructor
 */
function HexerLogicalMap(settings) {

    this.boardWidth = settings.boardWidth;
    this.boardHeight = settings.boardHeight;

    this.b_in_selection_mode = false;
    /**
     *
     * @type {Object.<string, HexerPart>}
     */
    this.selected = {};

    /**
     *
     * @type {Object.<string, HexCoordinate>}
     */
    this.locations = {};




    this.NE = 0;
    this.E = 1;
    this.SE = 2;
    this.SW = 3;
    this.W = 4;
    this.NW = 5;
    /**
     * @type {HexerPart[][][]} this.parts
     */
    this.parts = [];
    for (let x = 0; x < this.boardWidth; x++) {
        this.parts[x] = [];
        for (let y = 0; y < this.boardHeight; y++) {
            this.parts[x][y] = [];
        }
    }



    /**
     *
     * @param {Number}x
     * @param {Number}y
     * @return {HexerPart[]}
     */
    this.get_parts = function (x, y) {
        x = parseInt(x.toString());
        y = parseInt(y.toString());
        if (x >= 0 && x < this.boardWidth) {
            if (y >= 0 && y < this.boardHeight) {
                return this.parts[x][y];
            }
        }
        return [];
    };

    /**
     *
     * @param {Number}x
     * @param {Number}y
     * @param {HexerPart} part
     */
    this.set_part = function (x, y, part) {

        x = parseInt(x.toString());
        y = parseInt(y.toString());
        if (x >= 0 && x < this.boardWidth) {
            if (y >= 0 && y < this.boardHeight) {
                this.parts[x][y].push(part);
                this.locations[part.id] = new HexCoordinate(x,y);
                return;
            }
        }
        throw new Error('Tried to set a part out of bounds! [' + x + ',' + y + '] ');
    };

    /**
     *
     * @param {HexerPart} part
     * @return {HexerPart[]}
     */
    this.get_part_neighbors = function (part) {
        let coordinates = this.locations[part.id];
        return this.get_all_neighbors(coordinates.hexX,coordinates.hexY);
    };

    /**
     *
     * @param {Number}x
     * @param {Number}y
     * @return {HexerPart[]}
     */
    this.get_all_neighbors = function (x, y) {
        let ret = [];
        for (let dir = 0; dir < 6; dir++) {
            let come = this.get_neighbors(x,y,dir);
            if (come && come.length) {
                for(let i = 0; i < come.length; i++) {
                    ret.push(come[i]);
                }
            }
        }
        return ret;
    };



    /**
     *
     * @param {Number} x
     * @param  {Number} y
     * @param  {Number} dir
     * @return {HexerPart[]}
     */
    this.get_neighbors = function (x, y, dir) {
        let rel_x = x;
        let rel_y = y;
        let bump = y % 2;
        if (bump) {
            //x is 1 to the right
            switch (dir) {
                case this.NE: {
                    rel_x++;
                    rel_y--;
                    break;
                }
                case this.E: {
                    rel_x++;
                    break;
                }
                case this.SE: {
                    rel_x++;
                    rel_y++;
                    break;
                }
                case this.SW: {
                    rel_y++;
                    break;
                }
                case this.W: {
                    rel_x--;
                    break;
                }
                case this.NW: {
                    rel_y--;
                    break;
                }
                default: {
                    throw new Error("direction is only 0 through 5 inclusive, passed was " + dir);
                }
            }
        } else {
            //x is 1 to the left
            switch (dir) {
                case this.NE: {
                    rel_y--;
                    break;
                }
                case this.E: {
                    rel_x++;
                    break;
                }
                case this.SE: {
                    rel_y++;
                    break;
                }
                case this.SW: {
                    rel_y++;
                    rel_x--;
                    break;
                }
                case this.W: {
                    rel_x--;
                    break;
                }
                case this.NW: {
                    rel_y--;
                    rel_x--;
                    break;
                }
                default: {
                    throw new Error("direction is only 0 through 5 inclusive, passed was " + dir);
                }
            }
        }
        return this.get_parts(rel_x, rel_y);

    };


    /**
     *
     * @param {HexCoordinate} coordinate
     * @param {Hexer} hexer
     */
    this.add_selected = function(coordinate,hexer) {
        let parts = this.get_parts(coordinate.hexX,coordinate.hexY);
        if (parts) {
            for(let i = 0; i < parts.length; i++) {
                let part = parts[i];
                this.selected[part.id] = part;
                part.selected(this);
                hexer.drawHexagon(coordinate.hexX,coordinate.hexY,
                    function(da_coordinate,da_pixel,da_map)
                    {
                        part.draw(da_pixel,da_map);
                    }
                );

            }
        }
    }

    /**
     *
     * @param {Hexer} hexer
     */
     this.clear_selected = function(hexer) {
        for(let guid in this.selected) {
            let part = this.selected[guid];
            part.un_selected(this);
            let coordinate = this.locations[part.id];
            hexer.drawHexagon(coordinate.hexX,coordinate.hexY,
                function(da_coordinate,da_pixel,da_map)
                {
                    part.draw(da_pixel,da_map);
                }
            );
        }
        this.selected = {};
    }

    /**
     * @param {HexCoordinate} coords
     * @param {Hexer} hexer
     */
    this.onMouseDown = function(coords, hexer) {
        this.b_in_selection_mode = true;
        this.clear_selected(hexer);
        this.add_selected(coords,hexer);
    }

    /**
     * @param {HexCoordinate} coords
     * @param {Hexer} hexer
     */
    this.onMouseUp = function(coords, hexer) {
        this.b_in_selection_mode = false;
        this.add_selected(coords,hexer);
    }

    /**
     * @param {HexCoordinate} coords
     * @param {Hexer} hexer
     */
    this.onMouseMove = function(coords, hexer) {
        if (this.b_in_selection_mode) {
            this.add_selected(coords,hexer);
        }

    }

    /**
     * @param {HexCoordinate} coordinate
     * @param {Hexer} hexer
     */
    this.onMouseClick = function(coordinate, hexer) {

    }


    /**
     * @param {HexCoordinate} coordinate
     * @param {Hexer} hexer
     */
    this.draw = function(coordinate, hexer) {
        let parts = this.get_parts(coordinate.hexX,coordinate.hexY);
        let pixel = hexer.get_pixels(coordinate);
        if (parts) {
            for(let i = 0; i < parts.length; i++) {
                let part = parts[i];
                part.draw(pixel,hexer);
            }
        }
    }

    /**
     * @param {Hexer} hexer
     */
    this.draw_all = function( hexer) {

        for (let x = 0; x < this.boardWidth; x++) {
            for (let y = 0; y < this.boardHeight; y++) {
                for (let z = 0; z < this.parts[x][y].length; z++) {
                    let coordinate = new HexCoordinate(x,y);
                    this.draw(coordinate,hexer);
                }
            }
        }

    }
}