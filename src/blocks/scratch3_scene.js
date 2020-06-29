const Cast = require('../util/cast');

class Scratch3SCENEBlocks {
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
            scene_control_light: this.control_light,
            scene_control_volume: this.control_volume
        };
    }
    control_light (args, util) {
        const light = Cast.toString(args.LIGHT).toLowerCase();
        const brightess = Cast.toNumber(args.BRIGHTNESS);
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {
            action: light,
            value: brightess
        })
        util.ioQuery('uav', 'sendMessage', [{cmd: 'scene_control_light', data}]);
    }
    control_volume (args, util) {
        const volume = Cast.toNumber(args.VOLUME);
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {
            value: volume
        })
        util.ioQuery('uav', 'sendMessage', [{cmd: 'scene_control_volume', data}]);
    }
}

module.exports = Scratch3SCENEBlocks;
