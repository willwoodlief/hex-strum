
/**
 * @type {HexStrumObject}
 */
let HexStrum ;


function hex_strum_init() {

    HexStrum = new HexStrumObject();
    HexStrum.init(function() {
        let test_color_a = chroma.lch(50, 40, 360).hex();
        let test_color_b = chroma.lch(50, 40, 0).hex();
        HexStrum.create_source('#0EAA99',5,8,16,'any');
        HexStrum.create_source('#E01000',8,15,5,'second');
        HexStrum.create_source(test_color_a,30,30,15,'yellow 2');
        HexStrum.create_source(test_color_b,20,18,10,'red');
    });


}

document.addEventListener("DOMContentLoaded", function() {
    hex_strum_init();
});