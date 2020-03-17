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
            detect_face_unlock: this.faceUnlock,
            detect_gesture: this.gestureDetect,
            detect_situation: this.situationDetect
        };
    }
    start (args, util) {
        return '0011';
    }

    faceUnlock (rags, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data: 0}]);
    }
    gestureDetect (rags, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'gesture_detect', data: 0}]);
    }
    situationDetect (rags, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'situation_detect', data: 0}]);
    }

}

module.exports = Scratch3GestureBlocks;
