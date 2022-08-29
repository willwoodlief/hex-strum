class EntityBase  {

    /**
     *
     * @param {entityInit} init
     */
    constructor(init) {
        let hz;
        let parsed_int_hz = parseInt(init.signal.hz)
        if (parsed_int_hz ) {
            hz = parsed_int_hz;
        } else {
            let color = chroma(init.signal.hz);
            hz = Math.floor(color.lch()[2]);
            if (!hz) {
                throw new Error(`Cannot create hz out of color ` + color )
            }
        }
        if (!chroma.valid(init.signal.hz)) {
            throw new Error("Cannot make color source out of " + init.signal.hz);
        }


        let signal = new SpecSignal({hz: hz,strength: init.signal.range,value: init.signal.value});


        this.spec =  HexStrum.container.create_spec(init.location.x,init.location.y,
                                            init.ranges,signal,init.process??null);
    }
}