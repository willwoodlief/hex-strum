let HexStrumSettings = {
    canvas_id : 'hexstrum_canvas'
}

/**
 *
 * @type {object}
 *
 */
let HexStrum = {
    logical: null,
    map: null,
    test_cell: null
}


function hex_strum_init() {
    let hex_settings = new HexSetup();
    let logical = new HexerLogicalMap(hex_settings);
    let canvas = document.getElementById(HexStrumSettings.canvas_id)
    let map = new Hexer(canvas,hex_settings,logical);
    map.drawBoard();
    HexStrum.map = map;
    HexStrum.logical = logical;

    {
        let p1  = new SpecSignal({background_color: '#FEAA04',hz: 180,strength:5,value: 2});
        HexStrum.test_cell = p1;
        HexStrum.logical.set_part(1,2,p1);
        let p2 = new HexerPart({background_color: '#0EAA99'});
        HexStrum.logical.set_part(2,2,p2);
        HexStrum.map.drawBoard()
    }
}

document.addEventListener("DOMContentLoaded", function() {
    hex_strum_init();
});