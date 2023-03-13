var util = require('util')

var bleno = require('bleno')

var BlenoCharacteristic = bleno.Characteristic


// 自定义属性的构造函数
var ssidCharacteristic = function() {
    ssidCharacteristic.super_.call(this, {
        uuid:'ec0e',
        properties:['write'],
        descriptors:[ new bleno.Descriptor({
            uuid: '2901',
            value: 'set wifi ssid '
        })]
    });
    // 网络的ssid
    this.SSID = Buffer.alloc(0)
};

// 自定义的ssidCharacteristic继承自bleno的BlenoCharacteristic
util.inherits(ssidCharacteristic,BlenoCharacteristic);

// ssidCharacteristic.prototype.onReadRequest = function(offset,callback) {
//     console.log("ssidCharacteristic read Req: ssid = " + this.SSID + " pwd = " + this.PassWord )
//     callback(this.RESULT_SUCCESS, this.)
// }

ssidCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this.SSID = data
    console.log("onWriteRequest: ssid = " + this.SSID.toString('utf8'))
    callback(this.RESULT_SUCCESS)
}

module.exports = ssidCharacteristic