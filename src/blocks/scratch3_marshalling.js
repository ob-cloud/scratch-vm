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
            marshalling_group_range_fn: this.group_range_fn,
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
    group_range_fn (args, util) {
        const devType = Cast.toString(args.DEVTYPE);
        const groupId = Cast.toString(args.GROUP);
        const deviceId = Cast.toString(args.DEVICE);
        const deviceId1 = Cast.toString(args.DEVICE1);
        const deviceId2 = Cast.toString(args.DEVICE2);
        const deviceId3 = Cast.toString(args.DEVICE3);
        const deviceId4 = Cast.toString(args.DEVICE4);
        const deviceId5 = Cast.toString(args.DEVICE5);
        const deviceId6 = Cast.toString(args.DEVICE6);
        util.ioQuery('uav', 'sendMessage', [{cmd: 'ms_group', data: {
            devType,
            groupId,
            deviceId: `${deviceId},${deviceId1},${deviceId2},${deviceId3},${deviceId4},${deviceId5},${deviceId6}`,
            value: 0
        }}]);
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
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: `ms_${type}_light_on`, data}]);
    }
    lightoff (args, util) {
        const type = Cast.toString(args.LIGHTTYPE);
        const groupData = util.getGroupArgValues()
        const data = groupData ? groupData : {value: 0}
        util.ioQuery('uav', 'sendMessage', [{cmd: `ms_${type}_light_off`, data}]);
    }
}

module.exports = Scratch3MarshallingBlocks;
