const Cast = require('../util/cast');

class Scratch3CarBlocks {
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
            car_move_action: this.move,
            car_move_forward: this.move_forward,
            car_turn_action: this.turn,
            car_stop: this.stop,
            car_reset_action: this.reset,
            car_exec_action: this.exec,
            car_collect_env: this.env,
            car_turn_around: this.take_round
        };
    }
    move (args, util) {
        const operator = Cast.toString(args.CARMOVEACTION).toLowerCase();
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: `car_move_${operator}`, data}]);
    }
    move_forward (args, util) {
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toString(args.NUM)})
        util.ioQuery('uav', 'sendMessage', [{cmd: `car_move_forward`, data}]);
    }
    turn (args, util) {
        const operator = Cast.toString(args.CARTRUNACTION).toLowerCase();
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: `car_turn_${operator}`, data}]);
    }
    stop (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_stop', data}]);
    }
    reset (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_reset_action', data}]);
    }
    exec (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_exec_action', data}]);
    }
    env (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_collect_env', data}]);
    }
    take_round (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_turn_around', data}]);
    }
}

module.exports = Scratch3CarBlocks;
