class HexStrumObject  {

    constructor(setup) {
        this.setup = setup;
        if (!setup) {
            this.setup = new HexSetup();
        }

        this.logical = new HexerLogicalMap(this.setup);
        let canvas = document.getElementById(this.setup.canvas_id)
        this.map = new Hexer(canvas,this.setup,this.logical);





    }

    init(callback) {
        for (let x = 0; x < this.logical.boardWidth; x++) {
            for (let y = 0; y < this.logical.boardHeight; y++) {
                let stack = new SpecHexStack();
                this.logical.set_part(x,y,stack);
            }
        }
        this.map.drawBoard();
        this.container = new SpecContainer();
        if (callback) {
            callback();
        }
        this.run();
    }

    /**
     *
     * @param {*} color_source
     * @param {number} x
     * @param {number} y
     * @param {number} strength
     * @param {*} value
     */
    create_source(color_source,x,y,strength, value) {
        if (!chroma.valid(color_source)) {
            throw new Error("Cannot make color source out of " + color_source);
        }
        let color = chroma(color_source);
        let hz = Math.floor(color.lch()[2]);
        let callback = function(values) { if (values) {return value;} return 0;}
        let signal = new SpecSignal({hz: hz,strength: strength,value: value});
        return this.container.create_spec(x,y,[],signal,callback);
    }


    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {SpecSignal} signal
     * @param {SpecSignalRange[]} ranges
     * @param {specValueCallback} process
     */
    create_spec(x,y,signal,ranges, process) {
        return this.container.create_spec(x,y,ranges,signal,process);
    }

    run() {
        this.container.run();
        this.refresh();
    }

    refresh() {
        this.map.drawBoard();
    }
}