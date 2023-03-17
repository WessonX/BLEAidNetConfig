var bleno = require('bleno') 

var BlenoPrimaryService = bleno.PrimaryService

var wifiCharacteristic = require('./wifiCharacteristic')

var ipCharacteristic = require('./ipCharacteristic')
const { default: getMAC } = require('getmac')


// 获取本机的mac地址.作为蓝牙设备名称的一部分
try {
    macAddr = getMAC("wlan0").replace(/:/g,'')
} catch (error) {
    macAddr = getMAC().replace(/:/g,'')
}
process.env["BLENO_DEVICE_NAME"] = "MRobot-"+ macAddr.slice(-6)

bleno.on('stateChange', function(state) {
    console.log('on-stateChange:' + state);
    if (state == 'poweredOn') {
        bleno.startAdvertising('robotWlanConn',['ec00']);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno.setServices([
            new BlenoPrimaryService({
                uuid:'ec00',
                characteristics:[
                    new wifiCharacteristic(),
                    new ipCharacteristic()
                ]
            })
        ])
    }
});


