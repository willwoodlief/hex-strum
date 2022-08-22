class SpecSignal extends HexerPart {

    constructor(what) {
        super(what);
        /**
         * @type {?number}
         */
        this.hz = (what && (`hz` in what ) && what.hz ) || null;

        /**
         * @type {?number}
         */
        this.strength = (what && (`strength` in what ) &&what.strength) || null;

        /**
         * @type {*}
         */
        this.value = (what && (`value` in what ) &&what.value) || null;


        let utilities = new Utility();

        this.background_color = utilities.calculate_color_from_hz_and_strength(this.hz,this.strength);
        this.color = utilities.invert_color(this.get_background_color(),false);

        this.is_selected = false;

        this.selected_shows_value = true;
    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    selected(logical) {
        super.selected(logical);
        this.is_selected = true;
    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    un_selected(logical) {
        super.selected(logical);
        this.is_selected = false;
    }

    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    draw(top_left_pixel,hexer) {
        super.draw(top_left_pixel,hexer);

        if (this.is_selected) {
            hexer.ctx.font = "8px sans-serif";
            const margin = 0;
            let x_pixel = top_left_pixel.pixelX + margin;
            let y_pixel = top_left_pixel.pixelY + Math.ceil(Math.sqrt( Math.pow(hexer.sideLength,2) - Math.pow(hexer.hexRadius/2,2)) )  ; //a# + b# = c#

            hexer.ctx.fillStyle = this.get_color();
            let val = {hz: this.hz, str: this.strength};
            if (this.selected_shows_value) {
                val = this.value;
            }

            const utility = new Utility();
            utility.wrap_value(hexer.ctx,val,x_pixel,y_pixel,hexer.hexRectangleWidth - 1,8);
        }

    };



}