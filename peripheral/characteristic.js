var util = require('util')

var bleno = require('bleno')

var BlenoCharacteristic = bleno.Characteristic


// 自定义属性的构造函数
var NetCharacteristic = function() {
    NetCharacteristic.super_.call(this, {
        uuid:'ec0e',
        properties:['write'],
        descriptor:[ new bleno.Descriptor({
            uuid: '2901',
            value: 'set wifi ssid and pwd.'
        })]
    });
    // 网络的ssid
    this.SSID = Buffer.alloc(0)
    
    // 网络密码
    // this.PassWord = Buffer.alloc(0)
};

// 自定义的NetCharacteristic继承自bleno的BlenoCharacteristic
util.inherits(NetCharacteristic,BlenoCharacteristic);

// NetCharacteristic.prototype.onReadRequest = function(offset,callback) {
//     console.log("NetCharacteristic read Req: ssid = " + this.SSID + " pwd = " + this.PassWord )
//     callback(this.RESULT_SUCCESS, this.)
// }

NetCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this.SSID = data
    console.log("onWriteRequest: ssid = " + this.SSID.toString('utf8'))
    callback(this.RESULT_SUCCESS)
}

module.exports = NetCharacteristic