
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

        test_spec_condition = new EntitySteadyCutoff({
            signal: {hz:30,range:5,value:'hello there'},
            location: {x: 24, y: 15},
            ranges: [{listen_min_strength: 3,listen_max_strength:4,listen_min_hz: 100, listen_max_hz:110,name:'burst_orange'}],
            process: null
        },55,false);

        new EntityRepeater({
            signal: {hz:'purple',range:10,value:'what me worry?'},
            location: {x: 24, y: 15},
            ranges: [{listen_min_strength: null,listen_max_strength:null,listen_min_hz: null, listen_max_hz:null,name:'hello'}],
            process: null
        });
    });


}

document.addEventListener("DOMContentLoaded", function() {
    hex_strum_init();
});