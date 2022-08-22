class Spec  extends HexerPart {

    constructor(what) {
        super(what);

        /**
         * @type {SpecSignalRange[]}
         */
        this.ranges = (what && (`ranges` in what ) && what.ranges ) || null;

        /**
         * @type {?SpecSignal}
         */
        this.output = (what && (`output` in what ) && what.output ) || null;

        this.process = (what && (`process` in what ) && what.process ) || null;

        let utilities = new Utility();

        this.background_color = utilities.calculate_color_from_hz_and_strength(this.hz,this.strength);
        this.color = utilities.invert_color(this.get_background_color(),false);

        this.is_selected = false;

        this.selected_shows_value = true;
    }

    /**
     *
     * @param {SpecStack} stack
     * @return {?SpecSignal}
     */
    on_run(stack) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    poke(logical) {
        console.debug("spec poked",this);
    }


}