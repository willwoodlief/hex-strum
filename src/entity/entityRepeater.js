/**
 * Takes the strongest signal it is filtered to receive, and broadcasts the values of that hz , using its own hz and strength
 */
class EntityRepeater extends EntityBase {

    /**
     *
     * @param {entityInit} init
     */
    constructor(init) {
        super(init);
        this.remembered_output = this.spec.output;
        let that = this;

        this.spec.process = function(values,accumulated_signals) {
            let ret = new SpecSignal(that.remembered_output);
            //find the strongest signal name, and get that value
            let max_signal = 0, max_signal_name = null;
            for(let range_name in accumulated_signals) {
                let test_signal_array = accumulated_signals[range_name];
                for(let i = 0; i < test_signal_array.length; i++) {
                    let test_signal = test_signal_array[i];
                    if (test_signal.strength > max_signal) {
                        max_signal = test_signal.strength;
                        max_signal_name = range_name;
                    }
                }
            }
            if (!max_signal_name) { return null;}
            ret.value = values[max_signal_name];

            return ret;
        }


    }
}