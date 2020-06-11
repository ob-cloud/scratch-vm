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
            uav_fly_flip: this.flyflip,
            uav_face_unlock: this.faceUnlock,
            uav_gesture_detect: this.gestureDetect,
            uav_situation_detect: this.situationDetect,
            uav_send_message: this.sendMsg,
            uav_estop: this.estop
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
        const operator = Cast.toString(args.UAVCAL).toLowerCase();
        // const isWrapper = !!util.thread.blockGlowInFrame
        // if (isWrapper) {
        //     const parentBlockId = util.thread.blockGlowInFrame
        //     const parentCache = util.thread.blockContainer._cache._executeCached[parentBlockId]
        //     const _argValues = parentCache._argValues
        //     const isGroup = _argValues && _argValues.GROUP
        //     if (isGroup) {
        //         const groupId = Cast.toString(_argValues.GROUP);
        //         const deviceId = Cast.toString(_argValues.DEVICE);
        //         data = {groupId, deviceId, value: 0}
        //     }
        // }
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}

        util.ioQuery('uav', 'sendMessage', [{cmd: `cal_${operator}`, data}]);
    }
    lock (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'lock', data: 0}]);
        // this.runtime.on('recieve', function (json) {
        //     console.log('revice ', json)
        // })
    }
    unlock (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'unlock', data: 0}]);
    }
    takeoff (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'takeoff', data: 0}]);
    }
    landing (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'landing', data: 0}]);
    }
    flyRise (args, util) {
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toNumber(args.NUM)})
        util.ioQuery('uav', 'sendMessage', [{cmd: 'fly_rise', data}]);
    }
    flyDown (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'fly_down', data: Cast.toNumber(args.NUM)}]);
    }
    flyDirection (args, util) {
        const operator = Cast.toString(args.UAVFLYDIRECTION).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{cmd: `fly_${operator}`, data: Cast.toNumber(args.NUM)}]);
    }
    flyturn (args, util) {
        const operator = Cast.toString(args.UAVFLYTURN).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{cmd: `turn_${operator}`, data: Cast.toNumber(args.NUM)}]);
    }
    flyflip (args, util) {
        const operator = Cast.toString(args.UAVFLYFLIP).toLowerCase();
        util.ioQuery('uav', 'sendMessage', [{cmd: `flip_${operator}`, data: 0}]);
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
    estop (args, util) {
        util.ioQuery('uav', 'sendMessage', [{cmd: 'e-stop', data: ''}]);
    }
    sendMsg (args, util) {
        const message = Cast.toString(args.MSG).toLowerCase();
        // dt
        return message
    }
}

module.exports = Scratch3UavBlocks;
