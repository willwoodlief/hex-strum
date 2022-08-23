class SpecSignal extends SpecPartBase {

    static HZ_ALLOWED_MIN = 0;
    static HZ_ALLOWED_MAX = 359;

    static STRENGTH_ALLOWED_MIN = 0;
    static STRENGTH_ALLOWED_MAX = 20;
    constructor(what) {
        super(what);
        /**
         * @type {?number}
         */
        this.hz = (what  && (`hz` in what) && (what.hz || what.hz === 0)) || null;
        if (!this.hz || this.hz > SpecSignal.HZ_ALLOWED_MAX || this.hz < SpecSignal.HZ_ALLOWED_MIN) {
            throw new Error("Invalid HZ: " + this.hz);
        }

        /**
         * @type {?number}
         */
        this.strength = (what && (`strength` in what) && (what.strength || what.strength === 0)) || null;
        if (!this.strength || this.strength > SpecSignal.STRENGTH_ALLOWED_MAX || this.hz < SpecSignal.STRENGTH_ALLOWED_MIN) {
            throw new Error("Invalid Strength: " + this.hz);
        }

        /**
         * @type {*}
         */
        this.value = (what && (`value` in what) && what.value) || null;



        this.background_color = this.calculate_color_from_hz_and_strength(this.hz, this.strength);
        this.color = this.invert_color(this.get_background_color(), true);

        /**
         * @type {?string}
         */
        this.owned_by_spec_id = (what && (`owned_by_spec_id` in what) && what.owned_by_spec_id) || null;
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