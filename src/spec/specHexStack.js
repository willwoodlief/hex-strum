class SpecHexStack extends SpecPartBase {

    constructor(what) {
        super(what);

        /**
         * @type {Array<SpecPartBase>}
         */
        this.parts = [];

        /**
         * @type {Object.<string, (Spec | SpecSignal)>}
         */
        this.part_lookup = {};

        /**
         * @type {number}
         */
        this.display_index = -1;

    }

    /**
     * @param {SpecSignal|Spec} part
     */
    add_part(part) {
        if (part.id in this.part_lookup) {return;} //already added
        part.set_stack_owner(this.id);
        this.part_lookup[part.id] = part;
        this.parts.push(part);
        let bg = this.calculate_color_from_values(this.parts);
        if (bg) {this.background_color = bg;}
        else {this.background_color = HexerPart.PART_DEFAULT_BACKGROUND_COLOR}
    }


    /**
     * @param {HexerPart} part
     */
    remove_part(part) {
        if (!(part.id in this.part_lookup)) {return;} //not here
        delete this.part_lookup[part.id];
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i].id === part.id) {
                this.parts.splice(i,1);
                break;
            }
        }
        let bg = this.calculate_color_from_values(this.parts);
        if (bg) {this.background_color = bg;}
        else {this.background_color = HexerPart.PART_DEFAULT_BACKGROUND_COLOR}
    }

    /**
     * @param {HexerPart} part
     */
    has_part(part) {
        return part.id in this.part_lookup;
    }

    /**
     * @returns {Spec[]}
     */
    get_specs() {
        let ret = [];
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i] instanceof Spec) {
                ret.push(this.parts[i])
            }
        }
        return ret;
    }

    /**
     * @returns {SpecSignal[]}
     */
    get_signals() {
        let ret = [];
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i] instanceof SpecSignal) {
                ret.push(this.parts[i])
            }
        }
        return ret;
    }


    /**
     * @returns {SpecSignal[]}
     */
    clear_signals() {
        let ret = [];
        for (let i = 0; i < this.parts.length; i++) {
            if (this.parts[i] instanceof SpecSignal) {
                let part = this.parts[i];
                this.remove_part(part);
                ret.push(part);
            }
        }
        return ret;
    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    selected(logical) {

    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    un_selected(logical) {

    }


    /**
     * @param {HexerLogicalMap} logical
     */
    poke(logical) {
        super.poke(logical);
        if (!this.parts.length) {this.display_index = -1; return;}
        this.display_index++;
        if (this.display_index >= this.parts.length) {
            this.display_index = -1;
        }
        this.is_selected = true;
        console.debug("stack poked",this);
    }

    /**
     * Display a background of averaged signals, do not include any specs in this stack, their signals out will be in this hex too
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     */
    draw(top_left_pixel,hexer) {
        super.draw(top_left_pixel,hexer);

        if (this.is_selected) {
            if (this.parts.length && this.display_index >= 0) {
                this.parts[this.display_index].is_selected = true;
                this.parts[this.display_index].draw(top_left_pixel,hexer);
                this.parts[this.display_index].is_selected = false;
            }
            this.is_selected = false;
            return;
        }

    };

}