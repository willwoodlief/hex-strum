function SpecLocation(x,y) {
    if (!x) {x = 0;}
    if (!y) { y =0;}
    this.x = x; this.y = y;
}

function Spec(what) {
    this.location = what.location || new SpecLocation();
    this.listen_range = what.listen_range || 0;
    this.listen_min_hz = what.listen_min_hz || 0;
    this.listen_max_hz = what.listen_max_hz || 0;
    this.output_hz = what.output_hz || 0;
    this.output_range = what.output_range || 0;

}

/**
 *
 * @param {SpecLocation} location
 * @constructor
 */
function TestSpace(location) {
    this.spec = new Spec({
        location: location,
        listen_range: 2,
        listen_min_hz: 0,
        listen_max_hz: 100,
        output_hz: 1,
        output_range: 4
    });
    this.get_spec = function() { return this.spec; }

    /**
     * @param {number} hz
     */
    this.has_incoming = function(hz) {
        console.debug("test got spec",hz);
        this.spec.output_hz++;
    }
}