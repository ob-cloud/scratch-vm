class ReqParams{
    constructor (cmd = '', data = 0) {
        this.cmd = cmd
        this.dataValue = data
        this.data = {
            cmd: cmd,
            data: data
        }
    }
    setCmd (cmd) {
        this.cmd = cmd
        this.data.cmd = cmd
        return this
    }
    setData (data) {
        this.dataValue = data
        this.data.data = data
        return this
    }
    getJson () {
        return this.data
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
        console.log('get message   ', json)
        this._runtime.emit('recieve', json)
        // return new Promise((resolve, reject) => {
        //     resolve(json)
        // })
    }
    sendMessage (message) {
        const reqParams = new ReqParams()
        const jsonMsg = reqParams.setCmd(message.cmd).setData(message.data).getJson()
        console.log('send msg: ', jsonMsg)
        this._sendMessage(jsonMsg)
    }
}

module.exports = UAV;
