/**
 *
 * @constructor
 */
class HexerPart {
    static PART_DEFAULT_BACKGROUND_COLOR = '#EEEEEE';
    static PART_DEFAULT_COLOR = '#000000';
    constructor(what) {
        this.color =  (what && (`color` in what ) && what.value) || HexerPart.PART_DEFAULT_COLOR;
        this.background_color = (what && (`background_color` in what ) && what.background_color)  || HexerPart.PART_DEFAULT_BACKGROUND_COLOR;
        this.id = crypto.randomUUID();
    }


    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    draw(top_left_pixel,hexer) {
        let x_pixel = top_left_pixel.pixelX;
        let y_pixel = top_left_pixel.pixelY;
        hexer.ctx.fillStyle = this.get_background_color();
        hexer.ctx.fillRect(x_pixel,y_pixel,hexer.hexRectangleWidth,hexer.hexRectangleHeight);

       // hexer.ctx.stroke();
    };

    get_background_color() {
        return ('background_color' in this)? this.background_color : HexerPart.PART_DEFAULT_BACKGROUND_COLOR;
    };

    get_color() {
        return ('color' in this)? this.color : HexerPart.PART_DEFAULT_COLOR;
    };


    /**
     *
     * @param {HexerLogicalMap} logical
     */
    selected(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    un_selected(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    poke(logical) {

    }

}



