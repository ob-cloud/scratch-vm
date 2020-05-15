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
            car_turn_action: this.turn,
            car_stop: this.stop,
            car_reset_action: this.reset,
            car_exec_action: this.exec,
            car_collect_env: this.env
        };
    }
    move (args, util) {
        const operator = Cast.toString(args.CARMOVEACTION).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{cmd: `car_move_${operator}`, data: ''}]);
    }
    turn (args, util) {
        const operator = Cast.toString(args.CARTRUNACTION).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{cmd: `car_turn_${operator}`, data: ''}]);
    }
    stop (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_stop', data: 0}]);
    }
    reset (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_reset_action', data: 0}]);
    }
    exec (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_exec_action', data: 0}]);
    }
    env (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'car_collect_env', data: 0}]);
    }
}

module.exports = Scratch3CarBlocks;
