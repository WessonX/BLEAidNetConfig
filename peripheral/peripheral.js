var bleno = require('bleno') 

var BlenoPrimaryService = bleno.PrimaryService

var wifiCharacteristic = require('./wifiCharacteristic')

var ipCharacteristic = require('./ipCharacteristic')


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


