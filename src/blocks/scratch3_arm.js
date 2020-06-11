const Cast = require('../util/cast');

class Scratch3ArmBlocks {
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
            arm_reset: this.reset,
            arm_clamp: this.clamp,
            arm_unclamp: this.unclamp,
            arm_move_horizontal: this.move_horizontal,
            arm_move_vertical: this.move_vertical
        };
    }
    reset (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'arm_reset', data}]);
    }
    clamp (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'arm_clamp', data}]);
    }
    unclamp (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'arm_unclamp', data}]);
    }
    move_horizontal (args, util) {
        const direction = Cast.toString(args.DIRECTION).toLowerCase();
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toString(args.VALUE)})
        util.ioQuery('uav', 'sendMessage', [{cmd: `arm_move_${direction}`, data}]);
    }
    move_vertical (args, util) {
        const direction = Cast.toString(args.DIRECTION).toLowerCase();
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toString(args.VALUE)})
        util.ioQuery('uav', 'sendMessage', [{cmd: `arm_${direction}`, data}]);
    }
}

module.exports = Scratch3ArmBlocks;
