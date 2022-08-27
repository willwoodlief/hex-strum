class EntitySteady extends EntityBase {

    /**
     * @param {entityInit} init
     */
    constructor(init) {
        if (typeof init.process === 'undefined') {init.process = null;}
        super(init);
        let that = this;
        this.spec.process = function() {
            return that.spec.output;
        }
    }
}