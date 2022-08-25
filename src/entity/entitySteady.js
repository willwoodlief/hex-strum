class EntitySteady extends EntityBase {

    /**
     * @param {entityInit} init
     */
    constructor(init) {
        if (typeof init.process === 'undefined') {init.process = null;}
        super(init);
    }
}