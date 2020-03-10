const Cast = require('../util/cast');

class Scratch3GestureBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
    }
    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */
    getPrimitives () {
        return {
            gesture_start: this.start,
        };
    }
    start (args, util) {
        return '0011';
    }

}

module.exports = Scratch3GestureBlocks;
