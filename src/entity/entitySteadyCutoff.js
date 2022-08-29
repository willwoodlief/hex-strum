class EntitySteadyCutoff extends EntityBase {


    /**
     *
     * @param {entityInit} init
     * @param {number} threshold_value
     * @param {boolean} b_turn_on
     */
    constructor(init,threshold_value,b_turn_on) {
        super(init);
        this.remembered_output = this.spec.output;
        let that = this;

        this.spec.process = function(values) {
            let ret = new SpecSignal(that.remembered_output);
            if (b_turn_on) {
                ret.strength = 1;
            } else {
                ret.strength = that.remembered_output.strength;
            }
            for(let name in values) {
                let thing = values[name];
                if (Array.isArray(thing)
                    || typeof thing === 'object'
                    || thing === null
                    || typeof thing === 'undefined'
                ) {
                    continue;
                }
                let float_val = parseFloat(thing);
                if (isNaN(float_val)) { continue;}
                if (b_turn_on) {
                    if (float_val >= threshold_value) {
                        ret.strength = that.remembered_output.strength;
                    } else {
                        ret.strength = 1;
                    }
                } else {
                    if (float_val < threshold_value) {
                        ret.strength = that.remembered_output.strength;
                    } else {
                        ret.strength = 1;
                    }
                }
            }
            return ret;
        }


    }
}