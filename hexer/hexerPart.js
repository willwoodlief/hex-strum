/**
 *
 * @constructor
 */
function HexerPart() {
    const PART_DEFAULT_BACKGROUND_COLOR = '#EEEEEE';
    const PART_DEFAULT_COLOR = '#000000';

    this.color = PART_DEFAULT_COLOR;
    this.background_color = PART_DEFAULT_BACKGROUND_COLOR;
    this.id = crypto.randomUUID();

    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    this.draw = function(top_left_pixel,hexer) {
        let x_pixel = top_left_pixel.pixelX;
        let y_pixel = top_left_pixel.pixelY;
        let fx = x_pixel + (hexer.hexRectangleWidth/4);
        let fy = y_pixel + (hexer.hexRectangleHeight/2.25);
        hexer.ctx.font = "10px sans-serif";

        hexer.ctx.fillStyle = this.get_background_color();
        hexer.ctx.fillRect(x_pixel,y_pixel,hexer.hexRectangleWidth,hexer.hexRectangleHeight);

        let display_att = 'B';
        let second_line = 'D';
        hexer.ctx.fillStyle = this.get_color();
        hexer.ctx.fillText(''+ display_att, fx, fy);

        fy += (hexer.hexRectangleHeight/3);
        hexer.ctx.fillText(''+ second_line, fx, fy);

        hexer.ctx.stroke();
    };

    this.get_background_color = function() {
        return ('background_color' in this)? this.background_color : PART_DEFAULT_BACKGROUND_COLOR;
    };

    this.get_color = function() {
        return ('color' in this)? this.color : PART_DEFAULT_COLOR;
    };


    /**
     *
     * @param {HexerLogicalMap} logical
     */
    this.selected = function(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    this.un_selected = function(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    this.poked = function(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    this.run = function(logical) {

    }

}



