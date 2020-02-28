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
        // cmd
        return cal[operator] || ''
    }
    lock () {
        return 0xee
    }
    unlock () {
        return 0x03
    }
    takeoff () {
        return 0x04
    }
    landing () {
        return 0x04
    }
    flyRise (args) {
        // data1
        return [0xed, Cast.toNumber(args.NUM)]
    }
    flyDown () {
        // data2
        return [0xed, Cast.toNumber(args.NUM)]
    }
    flyDirection (args) {
        const operator = Cast.toString(args.UAVFLYDIRECTION).toLowerCase();
        const direction = {
            'forward': [0xed, Cast.toNumber(args.NUM)], //data3
            'back': [0xed, Cast.toNumber(args.NUM)], //data4
            'left': [0xed, Cast.toNumber(args.NUM)], //data5
            'right': [0xed, Cast.toNumber(args.NUM)], //data6
        }
        return direction[operator]
    }
    flyturn (args) {
        const operator = Cast.toString(args.UAVFLYTURN).toLowerCase();
        const turn = {
            'left': [0xed, Cast.toNumber(args.NUM)], //data7
            'right': [0xed, Cast.toNumber(args.NUM)], //data8
        }
        return turn[operator]
    }
    sendMsg (args) {
        const message = Cast.toString(args.MSG).toLowerCase();
        // dt
        return message
    }
}

module.exports = Scratch3UavBlocks;
