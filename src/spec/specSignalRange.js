class SpecSignalRange {

    constructor(what) {

        /**
         * @type {?number}
         */
        this.listen_min_strength = what.listen_min_strength || null;

        /**
         * @type {?number}
         */
        this.listen_max_strength = what.listen_max_strength || null;

        /**
         * @type {?number}
         */
        this.listen_min_hz = what.listen_min_hz || null;

        /**
         * @type {?number}
         */
        this.listen_max_hz = what.listen_max_hz || null;
    }

}