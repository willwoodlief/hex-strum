
/**
 * @type {HexStrumObject}
 */
let HexStrum ;


function hex_strum_init() {

    HexStrum = new HexStrumObject();
    HexStrum.init(function() {
        HexStrum.create_source('#0EAA99',5,8,16,'any');
        HexStrum.create_source('#E01000',8,15,5,'second');
        HexStrum.create_source('yellow',30,30,15,'yellow 2');
        HexStrum.create_source('red',20,18,10,'red');
    });


}

document.addEventListener("DOMContentLoaded", function() {
    hex_strum_init();
});