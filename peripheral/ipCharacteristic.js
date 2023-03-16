var util = require('util')

var bleno = require('bleno')

var BlenoCharacteristic = bleno.Characteristic

var ip = require('ip');

// 自定义属性的构造函数
var ipCharacteristic = function() {
    ipCharacteristic.super_.call(this, {
        uuid:'ec10',
        properties:['read'],
        descriptors:[ new bleno.Descriptor({
            uuid: '2901',
            value: 'get ip '
        })]
    });
    // ip地址
    this.ip = Buffer.alloc(0)
};

// 自定义的ipCharacteristic继承自bleno的BlenoCharacteristic
util.inherits(ipCharacteristic,BlenoCharacteristic);

ipCharacteristic.prototype.onReadRequest = function(offset,callback) {

    // 获取ip地址
    var myip = ip.address(); 

    // 判断是否为localhost，如果是，说明未连接上网络
    if (ip.isLoopback(myip)) {
        myip = "NotConnected"
    }
    this.ip = Buffer.from(myip)

    callback(this.RESULT_SUCCESS, this.ip);
}

module.exports = ipCharacteristic