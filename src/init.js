
/**
 * @type {HexStrumObject}
 */
let HexStrum ;
let test_spec_steady;
let test_spec_condition;

function hex_strum_init() {

    HexStrum = new HexStrumObject();
    // noinspection JSUnusedLocalSymbols
    HexStrum.init(function(hex_strum) {
        test_spec_steady = new EntitySteady({
            signal: {hz:100,range:30,value:55},
            location: {x: 38, y: 38},
            ranges: [],
            process: null
        });

        test_spec_condition = new EntityMonoCutoff({
            signal: {hz:30,range:5,value:'hello there'},
            location: {x: 23, y: 9},
            ranges: [{listen_min_strength: 10,listen_max_strength:30,listen_min_hz: 100, listen_max_hz:110,name:'burst_orange'}],
            process: null
        },55,true);
    });


}

document.addEventListener("DOMContentLoaded", function() {
    hex_strum_init();
});