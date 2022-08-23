class SpecSignal extends SpecPartBase {

    constructor(what) {
        super(what);
        /**
         * @type {?number}
         */
        this.hz = (what && (`hz` in what) && what.hz) || null;

        /**
         * @type {?number}
         */
        this.strength = (what && (`strength` in what) && what.strength) || null;

        /**
         * @type {*}
         */
        this.value = (what && (`value` in what) && what.value) || null;



        this.background_color = this.calculate_color_from_hz_and_strength(this.hz, this.strength);
        this.color = this.invert_color(this.get_background_color(), true);




        // noinspection JSUnusedGlobalSymbols
        /**
         * @type {?string}
         */
        this.owned_by_spec_id = null;
    }

    set_strength(new_strength) {
        this.strength = new_strength;
        this.background_color = this.calculate_color_from_hz_and_strength(this.hz, this.strength);
        this.color = this.invert_color(this.get_background_color(), true);
    }


    set_spec_owner(spec_id) {
        this.owned_by_spec_id = spec_id;
    }

    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    draw(top_left_pixel,hexer) {
        super.draw(top_left_pixel,hexer);

        if (this.is_selected) {
            let val = {hz: this.hz, strength: this.strength,value: this.value};
            this.draw_value(top_left_pixel,hexer,val);
        }

    };



}