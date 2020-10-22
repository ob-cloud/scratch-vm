

const dsBridge = require("dsbridge")

// class ReqParams{
//     constructor (cmd = '', data = 0) {
//         this.cmd = cmd
//         this.dataValue = data
//         this.data = {
//             cmd: cmd,
//             data: data
//         }
//     }
//     setCmd (cmd) {
//         this.cmd = cmd
//         this.data.cmd = cmd
//         return this
//     }
//     setData (data) {
//         this.dataValue = data
//         this.data.data = data
//         return this
//     }
//     getJson () {
//         return this.data
//     }
// }

class Bridge {
    /**
     */
    constructor (runtime) {
        this.runtime = runtime;
        this._bridge = dsBridge
    }
    _register () {
        this._bridge.register('test', function(l, r){
            return 1 + r
        })
    }
    _call (method, args, asynFn) {
        if (asynFn) {
            return this._bridge.call(method, args, asynFn)
        }
        return this._bridge.call(method, args)
    }

    _sendMessage (method, args, isAsync) {
        if (isAsync) {
            this._call(method, args, this._handleMessage)
        } else {
            const onMessageData = this._call(method, args)
            this._handleMessage(onMessageData)
        }
    }

    /**
     * revieve message from server
     */
    _handleMessage (json) {
        console.log('get message   ', json)
        this._runtime.emit('recieve', json)
    }
    sendMessage (message, isAsync = false) {
        // const reqParams = new ReqParams()
        // const jsonMsg = reqParams.setCmd(message.cmd).setData(message.data).getJson()
        console.log('send msg: ', message.cmd, message.data)
        this._sendMessage(message.cmd, message.data, isAsync)
    }
}

module.exports = Bridge;
