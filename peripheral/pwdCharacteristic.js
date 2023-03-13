var util = require('util')

var bleno = require('bleno')

var BlenoCharacteristic = bleno.Characteristic


// 自定义属性的构造函数
var pwdCharacteristic = function() {
    pwdCharacteristic.super_.call(this, {
        uuid:'ec10',
        properties:['write'],
        descriptors:[ new bleno.Descriptor({
            uuid: '2901',
            value: 'set wifi pwd.'
        })]
    });
    
    // 网络密码
    this.PassWord = Buffer.alloc(0)
};

// 自定义的pwdCharacteristic继承自bleno的BlenoCharacteristic
util.inherits(pwdCharacteristic,BlenoCharacteristic);


pwdCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this.PassWord = data
    console.log("onWriteRequest: pwd = " + this.PassWord.toString('utf8'))
    callback(this.RESULT_SUCCESS)
}

module.exports = pwdCharacteristic