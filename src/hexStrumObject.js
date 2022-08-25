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

    /**
     * @callback HexStrumObject~initCallback
     * @param {HexStrumObject} hex_strum
     */
    /**
     *
     * @param {HexStrumObject~initCallback}callback
     */
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
            callback(this);
        }
        this.run();
    }




    run() {
        this.container.run();
        this.refresh();
    }

    refresh() {
        this.map.drawBoard();
    }
}