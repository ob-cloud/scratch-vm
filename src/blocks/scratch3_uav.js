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
            uav_operator: this.changeOperator
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
}

module.exports = Scratch3UavBlocks;
