class SpecContainer  {

    constructor() {
    }


    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {SpecSignalRange[]}  input
     * @param {SpecSignal} output
     * @param {specValueCallback} value_function
     */
    create_spec(x,y,input,output,value_function) {
        let stack = this.get_stack_at_location(x,y);
        if (!stack) {
            console.warn('no stack at ',x,y);
            return;
        }
        let ranges ;
        if (Array.isArray(input)) {
            ranges = input;
        } else {
            ranges = [input];
        }
        let spec = new Spec({ranges: ranges,output:output,process: value_function});
        stack.add_part(spec);
        return spec;
    }

    /**
     *
     * @param x
     * @param y
     * @returns {?SpecHexStack}
     */
    get_stack_at_location(x,y) {
        let things =  HexStrum.logical.get_parts(x,y);
        for(let i = 0; i < things.length; i++) {
            if (things[i] instanceof  SpecHexStack) {
                // noinspection JSValidateTypes
                return things[i];
            }
        }
        return null;
    }
    /**
     *
     * @returns {SpecHexStack[]}
     */
    get_stacks() {
        let ret = [];
        for (let x = 0; x < HexStrum.logical.boardWidth; x++) {
            for (let y = 0; y < HexStrum.logical.boardHeight; y++) {
                let things =  HexStrum.logical.get_parts(x,y);
                for(let i = 0; i < things.length; i++) {
                    if (things[i] instanceof  SpecHexStack) {
                        ret.push(things[i]);
                    }
                }
            }
        }
        return ret;
    }

    run() {

        let stacks = this.get_stacks();
        /**
         * @type {Object.<string,SpecHexStack>}
         */
        let stack_lookup = {};

        /**
         * @type {Spec[]}
         */
        let specs_all = [];

        for(let stack_index = 0; stack_index < stacks.length; stack_index++) {
            let hex_stack = stacks[stack_index];
            let stack_position = HexStrum.logical.get_coordinates(hex_stack);
            stack_lookup[stack_position.hash_value] = hex_stack;
            let specs_here = hex_stack.get_specs();

            for(let s = 0; s < specs_here.length; s++) {
                for(let s = 0; s < specs_here.length; s++) {
                    let dat_spec = specs_here[s];
                    dat_spec.whisper(hex_stack.get_signals());
                    specs_all.push(dat_spec);
                }
            }
        }

        for(let stack_index = 0; stack_index < stacks.length; stack_index++) {
            let hex_stack = stacks[stack_index];
            hex_stack.clear_signals();
        }

        for(let spec_index = 0; spec_index < specs_all.length; spec_index++) {
            let a_spec = specs_all[spec_index];
            spread(a_spec);
        }


        /**
         *
         * @param {Spec} spec
         */
        function spread(spec) {
            let current_signal = new SpecSignal(spec.output);
            let current_position = get_position(spec);
            let origin = new HexCoordinate(current_position);
            let original_strength = current_signal.strength;
            /**
             * @type {Object.<string,SpecHexStack>}
             */
            let finished_stacks = {};


            do_spread(current_signal,current_position);

            /**
             *
             * @param {SpecSignal} the_signal
             * @param {HexCoordinate} current_position
             */
            function do_spread(the_signal,current_position) {
                //copy signal so strength is not subtracted from caller level
                let current_signal = new SpecSignal(the_signal);



                //get stack of current position, add value

                let stack_here = stack_lookup[current_position?.hash_value]
                if (!stack_here) {
                    console.warn("stack has no location",current_position);
                    return;
                }

                //subtract distance from starting hex from strength, if strength <= 0 return, signal faded now
                let distance = origin.distance(current_position);
                let new_strength = original_strength -  distance ;
                if (new_strength <= 0) {return;}

                current_signal.set_strength(new_strength);

                if (!(stack_here.id in finished_stacks)) {
                    //get stack of current position, add value
                    stack_here.add_part(current_signal);
                    finished_stacks[stack_here.id]= stack_here;
                }





                //get the stack neighbors
                //call recursively for all stack neighbors

                let neighbors = HexStrum.logical.get_all_neighbors(current_position.mapX,current_position.mapY);
                for (let neighbor_index = 0; neighbor_index < neighbors.length; neighbor_index++) {
                    if (neighbors[neighbor_index] instanceof SpecHexStack) {
                        if (!(neighbors[neighbor_index].id in finished_stacks)) {
                            let neighbor_position = HexStrum.logical.get_coordinates(neighbors[neighbor_index]);
                            do_spread(current_signal,neighbor_position);
                        }

                    }
                }

            }

            /**
             * @param {?Spec} spec
             */
            function get_parent_stack(spec) {
                for(let stack_index = 0; stack_index < stacks.length; stack_index++) {
                    let hex_stack = stacks[stack_index];
                    if (hex_stack.has_part(spec)) {
                        return hex_stack;
                    }
                }
                return null;
            }


            /**
             * @param {Spec} spec
             * @return {?HexCoordinate}
             */
            function get_position(spec) {
                let parent_stack = get_parent_stack(spec);
                if (parent_stack) {
                    return HexStrum.logical.get_coordinates(parent_stack);
                }
                return null;
            }
        }//end spread

    }


}