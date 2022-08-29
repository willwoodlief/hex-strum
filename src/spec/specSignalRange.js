class SpecSignalRange {

    constructor(what) {

        /**
         * @type {?number}
         */
        this.listen_min_strength = what.listen_min_strength || null;
        if (this.listen_min_strength === null) {
            this.listen_min_strength = SpecSignal.STRENGTH_ALLOWED_MIN;
        }

        /**
         * @type {?number}
         */
        this.listen_max_strength = what.listen_max_strength || null;
        if (this.listen_max_strength === null) {
            this.listen_max_strength = SpecSignal.STRENGTH_ALLOWED_MAX;
        }

        /**
         * @type {?number}
         */
        this.listen_min_hz = what.listen_min_hz || null;
        if (this.listen_min_hz === null) {
            this.listen_min_hz = SpecSignal.HZ_ALLOWED_MIN;
        }

        /**
         * @type {?number}
         */
        this.listen_max_hz = what.listen_max_hz || null;
        if (this.listen_max_hz === null) {
            this.listen_max_hz = SpecSignal.HZ_ALLOWED_MAX;
        }

        // noinspection JSValidateTypes
        /**
         * @type {string}
         */
        this.name = what.name || null;
        if (!this.name) {
            throw new Error("Ranges must be named!");
        }
    }

}