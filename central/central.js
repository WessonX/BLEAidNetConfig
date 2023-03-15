const noble = require('../node_modules/noble')

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
    connectAndSetup(peripheral) 
});

function connectAndSetup(peripheral) {
     peripheral.connect(error => {
        console.log("connected to " + peripheral.id);

        // 指定要查找的service id以及characteristic id
        const serviceUUIDs = [SERVICE_UUID];
        const characteristicUUIDs = [pwdCharacteristic_UUID,ssidCharacteristic_UUID]

        peripheral.discoverSomeServicesAndCharacteristics (
            serviceUUIDs,
            characteristicUUIDs,
            onServicesAndCharacteristicsDiscovered
        );
     });

     peripheral.on('disconnect',() => {
        console.log("disconnected");
     });
}

function onServicesAndCharacteristicsDiscovered(error,services,characteristics) {
    console.log('Discovered services and characteristics');

    // 获取ssid和pwd两个属性
    const pwdCharacteristic = characteristics[0];
    const ssidCharacteristic = characteristics[1];

    // 设置ssid和pwd
    
    const pwd = Buffer.from("wessonx9723850876",'utf-8')
    pwdCharacteristic.write(pwd)
    
    const ssid = Buffer.from("Wesson",'utf-8')
    ssidCharacteristic.write(ssid)

}

