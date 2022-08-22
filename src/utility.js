class Utility {

    constructor() {

    }
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
                ctx.fillText(line, working_x, y);
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
     * @returns {string|string}
     */
    invert_color(hex_thing, bw) {
        let hex = chroma(hex_thing).hex();
        // noinspection JSUnresolvedFunction
        return invert(hex,bw)
    }

    calculate_color_from_hz_and_strength(hz,strength) {
        if (hz === null) {return null;}
        if (hz < 0 || hz > 360) {
            throw new Error("hue must be between 0 and 360");
        }
        let chroma = 100 - ((strength??0) * 4);
        let luminance = 100 - ((strength??0) * 4);
        return chroma.hcl(hz, chroma, luminance).hex();
    }

    calculate_colors_from_ranges(ranges) {

    }

}

