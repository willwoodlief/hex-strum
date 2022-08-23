class Spec  extends SpecPartBase {

    constructor(what) {
        super(what);

        /**
         * @type {SpecSignalRange[]}
         */
        this.ranges = (what && (`ranges` in what ) && what.ranges ) || null;

        /**
         * @type {?SpecSignal}
         */
        this.output = null;

        let dap  = (what && (`output` in what ) && what.output ) || null;
        if (dap) {
            /**
             * @type {SpecSignal}
             */
            this.output = new SpecSignal(dap);
            this.output.set_spec_owner( this.id) ;
        }

        /**
         * @type {specValueCallback}
         */
        this.process = (what && (`process` in what ) && what.process ) || null;

        if (this.output) {
            this.background_color = this.calculate_color_from_hz_and_strength(this.output.hz, this.output.strength);
            this.color = this.invert_color(this.get_background_color(), false);
        }

        this.selected_shows_value = true;


    }

    /**
     * @param {HexerLogicalMap} logical
     */
    poke(logical) {
        console.debug("spec poked",this);
    }

    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    draw(top_left_pixel,hexer) {
        super.draw(top_left_pixel,hexer);

        if (this.is_selected) {
            if (this.selected_shows_value) {
                this.output.draw(top_left_pixel,hexer);
            } else {
                this.draw_value(top_left_pixel,hexer,this.ranges);
            }

        }

    };

    /**
     *
     * @param {SpecSignal[]} signals
     */
    whisper(signals) {

        let accumulated_values = {};
        let values = {};

        for(let s = 0; s < signals.length; s++) {
            let da_signal = signals[s];
            for(let r = 0; r < this.ranges.length; r++) {
                let le_range = this.ranges[r];
                if (da_signal.hz >= le_range.listen_min_hz && da_signal.hz <= le_range.listen_max_hz) {
                    if (da_signal.strength >= le_range.listen_min_strength && da_signal.strength <= le_range.listen_max_strength) {
                        if (!(le_range.name in accumulated_values)) {
                            accumulated_values[le_range.name] = [];
                        }
                        accumulated_values[le_range.name].push(da_signal.value) ;
                    }
                }
            }
        }
        for (let i in accumulated_values) {
            if (accumulated_values[i].length === 1) {
                values[i] = accumulated_values[i][0];
            } else {
                values[i] = accumulated_values[i];
            }
        }

        if (this.process) {
            this.output.value = this.process(values);
        }
    }


}