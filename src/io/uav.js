class ReqParams{
    constructor (action = '', cmd = '', data = 0, index) {
        this.action = action
        this.cmd = cmd
        this.dataValue = data
        this.index = index
        this.data = {
            cmd: cmd,
            data1: 0,
            data2: 0,
            data3: 0,
            data4: 0,
            data5: 0,
            data6: 0,
            data7: 0,
            data8: 0
        }
    }
    setAction (action) {
        this.action = action
        return this
    }
    setCmd (cmd) {
        this.cmd = cmd
        this.data.cmd = cmd
        return this
    }
    setData (data, index) {
        if (index === -1) {
            return this.setCmd(this.cmd)
        }
        this.dataValue = data
        this.data[`data${index}`] = data || this.dataValue
        return this
    }
    getJson () {
        return {
            action: this.action,
            data: this.data
        }
    }
}
class UAV {
    /**
     */
    constructor (runtime) {
        this._socket = runtime.getScratchLinkSocket('UAV');
        this._socket.setOnOpen(this.onOpen.bind(this));
        this._socket.setOnClose(this.handleDisconnectError.bind(this));
        this._socket.setOnError(this._handleRequestError.bind(this));
        this._socket.setHandleMessage(this._handleMessage.bind(this));

        this._sendMessage = this._socket.sendMessage.bind(this._socket);

        this._connectedTimeoutID = null;
        this._runtime = runtime;

        this._socket.open();
    }

    onOpen () {
        if (this._connectedTimeoutID) {
            window.clearTimeout(this._connectedTimeoutID);
        }
        this._connectedTimeoutID = window.setTimeout(this._handleConnectedTimeout.bind(this), 15000);
        this._runtime.emit('socket-open')
    }

    _handleConnectedTimeout () {
        if (this._connectedTimeoutID) {
            window.clearTimeout(this._connectedTimeoutID);
        }
        // this._runtime.emit(this._runtime.constructor.PERIPHERAL_SCAN_TIMEOUT);
    }
    _handleRequestError (/* e */) {
        this._runtime.emit('socket-error', {
            message: `Scratch lost connection to`,
        });
    }
    handleDisconnectError () {
        this.disconnect();
    }
    disconnect () {
        if (this._socket.isOpen()) {
            this._socket.close();
        }

        if (this._discoverTimeoutID) {
            window.clearTimeout(this._discoverTimeoutID);
        }
    }
    /**
     * revieve message from server
     */
    _handleMessage (json) {
        console.log('message   ', json)
        return new Promise((resolve, reject) => {
            resolve(json)
        })
    }
    sendMessage (message) {
        const reqParams = new ReqParams()
        const jsonMsg = reqParams.setAction(message.action).setCmd(message.cmd).setData(message.data, message.index).getJson()
        console.log(jsonMsg)
        this._sendMessage(jsonMsg)
    }
}

module.exports = UAV;
