var util = require('util')

var bleno = require('bleno')

var BlenoCharacteristic = bleno.Characteristic

const wifi = require('node-wifi')

wifi.init({
    iface:null
});

// 自定义属性的构造函数
var wifiCharacteristic = function() {
    wifiCharacteristic.super_.call(this, {
        uuid:'ec0e',
        properties:['write','notify'],
        descriptors:[ new bleno.Descriptor({
            uuid: '2901',
            value: 'set wifi ssid and pwd '
        })]
    });
    // 网络id和pwd
    this.wifiData = Buffer.alloc(0)

    // 连接wifi的状态
    this.isSuccess = Buffer.alloc(0)

    // 值更新的回调
    this._updateValueCallback = null

};

// 自定义的wifiCharacteristic继承自bleno的BlenoCharacteristic
util.inherits(wifiCharacteristic,BlenoCharacteristic);

wifiCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    console.log("wifiCharacteristic- onSubscribe")
    this._updateValueCallback = updateValueCallback
}

wifiCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    this.wifiData = data
    
    var wifiData_str =  this.wifiData.toString('utf8')
    var wifiData_obj = JSON.parse(wifiData_str)
    console.log("onWriteRequest: ssid = " + wifiData_obj.ssid + " pwd:" + wifiData_obj.pwd)
    callback(this.RESULT_SUCCESS)


    // Connect to a network
    wifi.connect({ ssid: wifiData_obj.ssid, password:wifiData_obj.pwd }, () => {
        // 判断是否连接成功
        wifi.getCurrentConnections((error,currentConnections) => {
            if (error) {
                console.log("failed" + error);
                this.isSuccess = Buffer.from("false")
            }else {
                if (currentConnections.length != 0 && currentConnections[0].ssid == wifiData_obj.ssid ) {
                    this.isSuccess = Buffer.from("true")
                    console.log("connected")
                } else {
                    this.isSuccess = Buffer.from("false")
                    console.log("failed")
                }
            }
            this._updateValueCallback(this.isSuccess)
        });
    });
}

module.exports = wifiCharacteristic