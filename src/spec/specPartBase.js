class SpecPartBase extends HexerPart {

    constructor(what) {
        super(what);

        // noinspection JSUnusedGlobalSymbols
        /**
         * @type {?string}
         */
        this.owned_by_stack_id = null;

        this.is_selected = false;
    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    selected(logical) {
        super.selected(logical);
        this.is_selected = true;
    }

    /**
     *
     * @param {HexerLogicalMap} logical
     */
    un_selected(logical) {
        super.selected(logical);
        this.is_selected = false;
    }

    set_stack_owner(stack_id) {
        this.owned_by_stack_id = stack_id;
    }



    /**
     *
     * @param {HexPixel} top_left_pixel
     * @param {Hexer} hexer
     * @param {*} value
     */
    draw_value(top_left_pixel,hexer,value) {
        hexer.ctx.font = "8px sans-serif";
        const margin = 0;
        let x_pixel = top_left_pixel.pixelX + margin;
        let y_pixel = top_left_pixel.pixelY + Math.ceil(Math.sqrt( Math.pow(hexer.sideLength,2) - Math.pow(hexer.hexRadius/2,2)) )  ; //a# + b# = c#

        hexer.ctx.fillStyle = this.get_color();
        this.wrap_value(hexer.ctx,value,x_pixel,y_pixel,hexer.hexRectangleWidth - 1,8);
    };

    wrap_value(ctx, the_value, x, y, maxWidth, lineHeight) {
        const words = JSON.stringify(the_value)
            .replaceAll(/([\[\]{},.\d])/g," $1 ")
            .split(/\s+/)
            .filter(item => item !== '');

        let line = '';
        let working_y = y;
        let working_x = x;
        for (const [index, w] of words.entries()) {
            const testLine = line + w ;
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && index > 0) {
                ctx.fillText(line, working_x, working_y);
                line = w ;
                working_y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, working_x, working_y);
    }

    /**
     * @author
     * @param hex_thing
     * @param bw
     * @returns {?string}
     */
    invert_color(hex_thing, bw) {
        if (!hex_thing) {return null;}
        let hex = chroma(hex_thing).hex();
        // noinspection JSUnresolvedFunction
        return invert(hex,bw)
    }

    calculate_color_from_hz_and_strength(hz,strength) {
        if (hz === null) {return null;}
        if (hz < 0 || hz > 360) {
            throw new Error("hue must be between 0 and 360");
        }
        let chroma_value =  ((strength??0) * 5) + 20;
        let luminance =  ((strength??0) * 5) + 20;
        return chroma.hcl(hz, chroma_value, luminance).hex();
    }

    /**
     *
     * @param {SpecPartBase[]} signals
     * @return {?string}
     */
    calculate_color_from_values(signals) {

        let da_colors = [];
        let da_raw_strengths = [];

        for (let i = 0; i < signals.length; i++) {
            if (signals[i] instanceof SpecSignal) {
                // noinspection JSValidateTypes
                /**
                 * @type {SpecSignal}
                 */
                let signal = signals[i];
                let bg_color = signal.get_background_color();
                if (bg_color) {
                    da_colors.push(bg_color);
                    da_raw_strengths.push(signal.strength);
                }

            }
        }
        if (da_colors.length === 0) {return null;}

        return chroma.average(da_colors, 'lch', da_raw_strengths).hex();
    }
}