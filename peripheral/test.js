// const wifi = require('node-wifi')

const { default: getMAC } = require('getmac')

// wifi.init({
//     iface:null
// });

// // Connect to a network
// wifi.connect({ ssid: "Wesson", password:"wessonx972385076" }, () => {
    // wifi.getCurrentConnections((error,currentConnections) => {
    //     if (error) {
    //         console.log("failed");
    //         console.log(error)
    //     }else {
    //         console.log("connected")
    //         console.log(currentConnections)
    //     }
    // });
// });
// var ip = require('ip');
 
// var myip = ip.address(); 
 
// if (ip.isLoopback(myip)) {
//     console.log(1)
// }
// console.log(myip)

try {
    macAddr = getMAC("wlan0").replace(/:/g,'')
} catch (error) {
    macAddr = getMAC("en0").replace(/:/g,'')
}
process.env["BLENO_DEVICE_NAME"] = "MRobot-"+ macAddr.slice(-6)
console.log(process.env)