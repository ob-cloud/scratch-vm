const Cast = require('../util/cast');

class Scratch3GestureBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        this.runtime.on('recieve', this._onRecieve.bind(this));

        this._data = '';

        this._face_unlock = false;

        this._visual_track = 0;

        this._attitude_detect = 0;
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
            detect_situation: this.situationDetect
        };
    }
    start (args, util) {
        const operator = Cast.toString(args.GESTURESTART).toLowerCase();
        if (operator === 'face') {
            util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data: ''}]);
        } else if (operator === 'visual') {
            util.ioQuery('uav', 'sendMessage', [{cmd: 'visual_track', data: ''}]);
        } else if (operator === 'situation') {
            util.ioQuery('uav', 'sendMessage', [{cmd: 'attitude_detect', data: ''}]);
        }
    }

    faceUnlock (rags, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'face_unlock', data: true}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_face_unlock--- ', that._face_unlock)
                resolve(that._face_unlock)
            }, 1000)
        });
    }
    gestureDetect (rags, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'visual_track', data: 0}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_visual_track--- ', that._visual_track)
                resolve(that._visual_track)
            }, 1000)
        });
    }
    situationDetect (rags, util) {
        // util.ioQuery('uav', 'sendMessage', [{cmd: 'attitude_detect', data: 0}]);
        var that = this
        return new Promise(resolve => {
            setTimeout(function () {
                console.log('_attitude_detect--- ', that._attitude_detect)
                resolve(that._attitude_detect)
            }, 1000)
        });
    }
    _onRecieve (response) {
        if (!response) return
        if (response.cmd === 'face_unlock') {
            this._face_unlock = !!response.data
        } else if (response.cmd === 'visual_track') {
            this._visual_track = response.data
        } else {
            this._attitude_detect = response.data
        }
        this._data = response
    }
}

module.exports = Scratch3GestureBlocks;
