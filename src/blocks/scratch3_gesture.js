const Cast = require('../util/cast');

class Scratch3GestureBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this._closeVisualTrack = this._closeVisualTrack.bind(this)

        this.runtime.on('recieve', this._onRecieve.bind(this));
        this.runtime.on('PROJECT_STOP_ALL', this._closeVisualTrack.bind(this));

        this._data = '';

        // 人脸解锁
        this._face_unlock = false;

        // 视觉追踪
        this._visual_track = 0;

        // 姿势识别
        this._attitude_detect = 0;

        // 人脸注册
        this._face_reg = false;

        // 开启相机
        this._open_camera = false;

        // 关闭相机
        this._close_camera = false;
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
            detect_situation: this.situationDetect,
            camera_open: this.cameraOpen,
            camera_close: this.cameraClose,
            face_reg: this.faceReg,
            gesture_stop: this.stop
        };
    }
    start (args, util) {
        const operator = Cast.toString(args.GESTURESTART).toLowerCase();
        const actionMap = {
            face: 'face_unlock',
            visual: 'visual_track',
            situation: 'attitude_detect',
            facereg: 'face_reg',
            cameraopen: 'open_camera',
            // cameraclose: 'close_camera',
        }
        if (actionMap[operator]) {
            util.ioQuery('uav', 'sendMessage', [{cmd: actionMap[operator], data: ''}]);
        }
        // if (operator === 'face') {
        //     util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data: ''}]);
        // } else if (operator === 'visual') {
        //     util.ioQuery('uav', 'sendMessage', [{cmd: 'visual_track', data: ''}]);
        // } else if (operator === 'situation') {
        //     util.ioQuery('uav', 'sendMessage', [{cmd: 'attitude_detect', data: ''}]);
        // }
    }
    stop (args, util) {
        const operator = Cast.toString(args.GESTURESTOP).toLowerCase();
        const actionMap = {
            face: 'face_unlock_close',
            visual: 'visual_track_close',
            situation: 'attitude_detect_close',
            facereg: 'face_reg_close',
            cameraclose: 'close_camera',
        }
        if (actionMap[operator]) {
            util.ioQuery('uav', 'sendMessage', [{cmd: actionMap[operator], data: ''}]);
        }
    }

    faceUnlock (args, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data: true}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_face_unlock--- ', that._face_unlock)
                resolve(that._face_unlock)
            }, 1000)
        });
    }
    gestureDetect (args, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'visual_track', data: 0}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_visual_track--- ', that._visual_track)
                resolve(that._visual_track)
            }, 1000)
        });
    }
    situationDetect (args, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'attitude_detect', data: 0}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_attitude_detect--- ', that._attitude_detect)
                resolve(that._attitude_detect)
            }, 1000)
        });
    }
    faceReg (args, util) {
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_face_reg--- ', that._face_reg)
                resolve(that._face_reg)
            }, 1000)
        });
    }
    cameraOpen (args, util) {
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_camera_open--- ', that._open_camera)
                resolve(that._open_camera)
            }, 1000)
        });
    }
    cameraClose (args, util) {
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_camera_close--- ', that._close_camera)
                resolve(that._close_camera)
            }, 1000)
        });
    }
    _onRecieve (response) {
        if (!response) return
        const cmd = response.cmd
        // if (cmd === 'face_unlock') {
        //     this._face_unlock = !!response.data
        // } else if (cmd === 'visual_track') {
        //     this._visual_track = response.data
        // } else if (cmd === 'attitude_detect') {
        //     this._attitude_detect = response.data
        // } else if (cmd === 'face_reg') {
        //     this._face_reg = !!response.data
        // } else if (cmd === 'open_camera') {
        //     this._open_camera = !!response.data
        // } else if (cmd === 'close_camera') {
        //     this._close_camera = !!response.data
        // }
        this[`_${cmd}`] = response.data
        this._data = response
    }
    _closeVisualTrack () {
        if (this._visual_track) {
            this._visual_track = 0
            this.runtime.ioDevices['uav'].sendMessage({cmd: 'visual_track_close', data: ''})
        }
    }
}

module.exports = Scratch3GestureBlocks;
