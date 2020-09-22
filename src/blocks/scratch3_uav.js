const Cast = require('../util/cast');
// const Clone = require('../util/clone');
// const RenderedTarget = require('../sprites/rendered-target');
// const uid = require('../util/uid');
// const StageLayering = require('../engine/stage-layering');
// const getMonitorIdForBlockWithArgs = require('../util/get-monitor-id');
// const MathUtil = require('../util/math-util');
const Timer = require('../util/timer');

class Scratch3UavBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        // CMD 指令是否已发送
        this.isCmdSend = false;
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
        // 编组处理
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}

        util.ioQuery('uav', 'sendMessage', [{cmd: `cal_${operator}`, data}]);
    }
    lock (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'lock', data}]);
    }
    unlock (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'unlock', data}]);
    }
    takeoff (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'takeoff', data}]);
    }
    landing (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'landing', data}]);
    }
    flyRise (args, util) {
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toNumber(args.NUM)})
        util.ioQuery('uav', 'sendMessage', [{cmd: 'fly_rise', data}]);
    }
    flyDown (args, util) {
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toNumber(args.NUM)})
        util.ioQuery('uav', 'sendMessage', [{cmd: 'fly_down', data}]);
    }
    flyDirection (args, util) {
        const operator = Cast.toString(args.UAVFLYDIRECTION).toLowerCase();
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toNumber(args.NUM)})
        // util.ioQuery('uav', 'sendMessage', [{cmd: `fly_${operator}`, data}]);
        // 飞机俯瞰，水平朝向
        // 左右飞，对应舞台上升、下降
        // 前后飞，对应左右飞
        if (!this.isCmdSend) {
            this.isCmdSend = true
            util.ioQuery('uav', 'sendMessage', [{cmd: `fly_${operator}`, data}]);
        }
        const x = this.runtime._editingTarget.x
        const y = this.runtime._editingTarget.y
        operator === 'left' && this.glide({SECS: 1, X: x, Y: Cast.toNumber(args.NUM)}, util)
        operator === 'right' && this.glide({SECS: 1, X: x, Y: -Cast.toNumber(args.NUM)}, util)
        operator === 'forward' && this.glide({SECS: 1, X: Cast.toNumber(args.NUM), Y: y}, util)
        operator === 'back' && this.glide({SECS: 1, X: -Cast.toNumber(args.NUM), Y: y}, util)
    }
    flyturn (args, util) {
        const operator = Cast.toString(args.UAVFLYTURN).toLowerCase();
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        data = Object.assign({}, data, {value: Cast.toNumber(args.NUM)})
        util.ioQuery('uav', 'sendMessage', [{cmd: `turn_${operator}`, data}]);
    }
    flyflip (args, util) {
        const operator = Cast.toString(args.UAVFLYFLIP).toLowerCase();
        const groupData = util.getGroupArgValues()
        let data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: `flip_${operator}`, data}]);
    }
    faceUnlock (rags, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data}]);
    }
    gestureDetect (rags, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'gesture_detect', data}]);
    }
    situationDetect (rags, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'situation_detect', data}]);
    }
    estop (args, util) {
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: ''}
        util.ioQuery('uav', 'sendMessage', [{cmd: 'e-stop', data}]);
    }
    sendMsg (args, util) {
        const message = Cast.toString(args.MSG).toLowerCase();
        // dt
        return message
    }

    getTargetXY (targetName, util) {
        let targetX = 0;
        let targetY = 0;
        if (targetName === '_mouse_') {
            targetX = util.ioQuery('mouse', 'getScratchX');
            targetY = util.ioQuery('mouse', 'getScratchY');
        } else if (targetName === '_random_') {
            const stageWidth = this.runtime.constructor.STAGE_WIDTH;
            const stageHeight = this.runtime.constructor.STAGE_HEIGHT;
            targetX = Math.round(stageWidth * (Math.random() - 0.5));
            targetY = Math.round(stageHeight * (Math.random() - 0.5));
        } else {
            targetName = Cast.toString(targetName);
            const goToTarget = this.runtime.getSpriteTargetByName(targetName);
            if (!goToTarget) return;
            targetX = goToTarget.x;
            targetY = goToTarget.y;
        }
        return [targetX, targetY];
    }
    glide (args, util) {
        if (util.stackFrame.timer) {
            const timeElapsed = util.stackFrame.timer.timeElapsed();
            if (timeElapsed < util.stackFrame.duration * 1000) {
                // In progress: move to intermediate position.
                const frac = timeElapsed / (util.stackFrame.duration * 1000);
                const dx = frac * (util.stackFrame.endX - util.stackFrame.startX);
                const dy = frac * (util.stackFrame.endY - util.stackFrame.startY);
                util.target.setXY(
                    util.stackFrame.startX + dx,
                    util.stackFrame.startY + dy
                );
                util.yield();
            } else {
                // Finished: move to final position.
                util.target.setXY(util.stackFrame.endX, util.stackFrame.endY);
                this.isCmdSend = false
            }
        } else {
            // First time: save data for future use.
            util.stackFrame.timer = new Timer();
            util.stackFrame.timer.start();
            util.stackFrame.duration = Cast.toNumber(args.SECS);
            util.stackFrame.startX = util.target.x;
            util.stackFrame.startY = util.target.y;
            util.stackFrame.endX = Cast.toNumber(args.X);
            util.stackFrame.endY = Cast.toNumber(args.Y);
            if (util.stackFrame.duration <= 0) {
                // Duration too short to glide.
                util.target.setXY(util.stackFrame.endX, util.stackFrame.endY);
                return;
            }
            util.yield();
        }
    }
}

module.exports = Scratch3UavBlocks;
