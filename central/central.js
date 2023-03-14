const noble = require('noble')

const SERVICE_UUID = 'ec00'
const pwdCharacteristic_UUID = 'ec10'
const ssidCharacteristic_UUID = 'ec0e'

noble.on('stateChange',state => {
    if (state == 'poweredOn') {
        console.log('scanning');
        noble.startScanning([SERVICE_UUID]);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover',peripheral => {
    noble.stopScanning();
    const name = peripheral.advertisement.localName;
    console.log("find device. name:" + name)
})
