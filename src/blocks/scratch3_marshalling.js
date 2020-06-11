const Cast = require('../util/cast');

class Scratch3MarshallingBlocks {
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
            marshalling_group: this.group,
            marshalling_group_range: this.group_range,
            marshalling_req_data: this.request,
            marshalling_control_light_on: this.lighton,
            marshalling_control_light_off: this.lightoff
        };
    }
    group (args, util) {
        util.startBranch(1, false);
    }
    group_range (args, util) {
        util.startBranch(1, false);
    }
    request (args, util) {
        const devType = Cast.toString(args.DEVTYPE);
        const deviceId = Cast.toString(args.DEVICE);
        util.ioQuery('uav', 'sendMessage', [{cmd: 'ms_req_data', data: {
            devType,
            value: deviceId
        }}]);
    }
    lighton (args, util) {
        const type = Cast.toString(args.LIGHTTYPE);
        util.ioQuery('uav', 'sendMessage', [{cmd: `ms_${type}_light_on`, data: {}}]);
    }
    lightoff (args, util) {
        const type = Cast.toString(args.LIGHTTYPE);
        util.ioQuery('uav', 'sendMessage', [{cmd: `ms_${type}_light_off`, data: {}}]);
    }
}

module.exports = Scratch3MarshallingBlocks;