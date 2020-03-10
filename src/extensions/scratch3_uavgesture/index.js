const BlockType = require('../../extension-support/block-type');

/**
 * T无人机手势操作
 */

/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const iconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACpQTFRF////fIel5ufolZ62/2YavsPS+YZOkJmy9/j53+Hk6+zs6N/b6dfO////tDhMHAAAAA50Uk5T/////////////////wBFwNzIAAAA6ElEQVR42uzX2w6DIBAEUGDVtlr//3dLaLwgiwUd2z7MJPJg5EQWiGhGcAxBggQJEiT436CIfqXJPTn3MKNYYMSDFpoAmp24OaYgvwKnFgL2zvVTCwHrMoMi+nUQLFthaNCCa0iwclLkDgYVsQp0mzxuqXgK1MRzoCLWgkPXNN2wI/q6Kvt7u/cX0HtejN8x2sXpnpb8J8D3b0Keuhh3X975M+i0xNVbg3s1TIasgK21bQyGO+s2PykaGMYbge8KrNrssvkOWDXkErB8UuBHETjoYLkKBA8ZfuDkbwVBggQJEiR4MC8BBgDTtMZLx2nFCQAAAABJRU5ErkJggg==';

class UavGesture {
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
        const jsonMsg = reqParams.setCmd(message.cmd).setData(message.data).getJson()
        console.log(jsonMsg)
        this._sendMessage(jsonMsg)
    }
    startUav () {
        this.sendMessage({
            cmd: 'startup',
            data: 0
        })
    }
}

class Scratch3UavGestureBlocks {

    static get EXTENSION_ID () {
        return 'uav_gesture';
    }

    constructor (runtime) {
        this.runtime = runtime;
        this._gesture = new UavGesture(runtime)
    }

    getInfo () {
        return {
            id: Scratch3UavGestureBlocks.EXTENSION_ID,
            name: 'Uav Gesture',
            iconURI: iconURI,
            blocks: [{
                opcode: 'uav_start',
                text: 'turn uav on',
                blockType: BlockType.COMMAND
            }]
        }
    }

    startUav () {
        this._gesture.startUav()
    }
}

module.exports = Scratch3UavGestureBlocks;
