const Cast = require('../util/cast');
// const Clone = require('../util/clone');
// const RenderedTarget = require('../sprites/rendered-target');
// const uid = require('../util/uid');
// const StageLayering = require('../engine/stage-layering');
// const getMonitorIdForBlockWithArgs = require('../util/get-monitor-id');
// const MathUtil = require('../util/math-util');

class Scratch3UavBlocks {
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
            uav_calibration: this.calibration,
            uav_text: this.text,
            uav_operator: this.changeOperator,
            uav_cal: this.cal,
            uav_lock: this.lock,
            uav_unlock: this.unlock,
            uav_takeoff: this.takeoff,
            uav_landing: this.landing,
            uav_fly_rise: this.flyRise,
            uav_fly_down: this.flyDown,
            uav_fly_direction: this.flyDirection,
            uav_fly_turn: this.flyturn,
            uav_send_message: this.sendMsg
        };
    }
    calibration (args, util) {
        return '0011';
    }

    text (args, util) {
        var code = '000;\n';
        return code;
    }
    changeOperator (args, util) {
        console.log(args, util)
        const operator = Cast.toString(args.UAVOPERATORS).toLowerCase();
        const num1 = Cast.toNumber(args.NUM1);
        const num2 = Cast.toNumber(args.NUM1);
        const operators = {
            'add': num1 + num2,
            'subtract': num1 - num2,
            'multiply': num1 * num2,
            'divide': num1 / num2
        }
        console.log(operator, num1, num2)
        return operators[operator]
    }
    cal (args, util) {
        const cal = {
            'gyro': 0x01,
            'mag': 0x02
        }
        const operator = Cast.toString(args.UAVCAL).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{action: `cal_${operator}`, cmd: cal[operator] || '', data: 0, index: -1}]);
    }
    lock (args, util) {
        util.ioQuery('uav', 'sendMessage', [{action: 'lock', cmd: 0xee, data: 0, index: -1}]);
    }
    unlock (args, util) {
        util.ioQuery('uav', 'sendMessage', [{action: 'unlock', cmd: 0x03, data: 0, index: -1}]);
    }
    takeoff (args, util) {
        util.ioQuery('uav', 'sendMessage', [{action: 'takeoff', cmd: 0x04, data: 0, index: -1}]);
    }
    landing (args, util) {
        util.ioQuery('uav', 'sendMessage', [{action: 'landing', cmd: 0x04, data: 0, index: -1}]);
    }
    flyRise (args, util) {
        // data1
        util.ioQuery('uav', 'sendMessage', [{action: 'fly_rise', cmd: 0xed, data: Cast.toNumber(args.NUM), index: 1}]);
    }
    flyDown (args, util) {
        // data2
        util.ioQuery('uav', 'sendMessage', [{action: 'fly_down', cmd: 0xed, data: Cast.toNumber(args.NUM), index: 2}]);
    }
    flyDirection (args, util) {
        const operator = Cast.toString(args.UAVFLYDIRECTION).toLowerCase();
        const direction = {
            'forward': 3, //data3
            'back': 4, //data4
            'left': 5, //data5
            'right': 6, //data6
        }
        util.ioQuery('uav', 'sendMessage', [{action: `fly_${operator}`, cmd: 0xed, data: Cast.toNumber(args.NUM), index: direction[operator]}]);
    }
    flyturn (args, util) {
        const operator = Cast.toString(args.UAVFLYTURN).toLowerCase();
        const turn = {
            'left': 7, //data7
            'right': 8, //data8
        }
        util.ioQuery('uav', 'sendMessage', [{action: `turn_${operator}`, cmd: 0xed, data: Cast.toNumber(args.NUM), index: turn[operator]}]);
        return turn[operator]
    }
    sendMsg (args, util) {
        const message = Cast.toString(args.MSG).toLowerCase();
        // dt
        return message
    }
}

module.exports = Scratch3UavBlocks;
