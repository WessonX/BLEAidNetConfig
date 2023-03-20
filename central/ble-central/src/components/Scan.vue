<template>
    <div id="root">
        <el-card  id="card" >
            <article id="introduction">
                <el-text size="large"  style="color:rgb(25,25,25);">
                    This site intends to provide a User Interface configuring your device's wifi connection,
                    via the use of BLE(Bluetooth Low Energy).Connecting to the Internet is a must  but annoying step for those devices 
                    who do not have an  UI interface to configure,like raspberry pie, your homeKit, your watch etc. 
                    But with preInstalling our service,you can now easily make it! 
                </el-text>
            </article>
            <el-button type="primary" size="Large" :icon="Search" round id="button" @click="startScan">Go Scan!</el-button>
        </el-card>
    </div>
</template>

<script>
import { h } from 'vue'
import { ElNotification } from 'element-plus'
export default {
    emits:["bleConnected","finishConnecting"],
    methods: {
        startScan() {

            ElNotification({
                message: h('i', { style: 'color: teal' }, '正在努力扫描蓝牙设备:D'),
            })

            let options = {};
            let optionalServices = [0xec00]

            // 蓝牙扫描过滤
            var filters = [
                { services: [0xec00] },
                { namePrefix: "MRobot" }
            ]
            options.optionalServices = optionalServices
            options.filters = filters

            console.log('Requesting Bluetooth Device...');

            // 扫描
            navigator.bluetooth.requestDevice(options)
                .then(device => {
                    console.log('> Name:             ' + device.name);
                    console.log('> Id:               ' + device.id);
                    console.log('> Connected:        ' + device.gatt.connected);
                    console.log("connecting to GATT server")
                    return device.gatt.connect()
                })
                .then(server => {
                    ElNotification({
                        title: 'Success',
                        message: '蓝牙连接成功',
                        type: 'success',
                    })
                    console.log("getting service")
                    return server.getPrimaryServices()
                })
                .then(services => {
                    console.log("getting characteristics")
                    return services[0].getCharacteristics()
                })
                .then(characteristics => {
                    var wifiCharacteristic = null
                    var ipCharacteristic = null
                    characteristics.forEach(element => {
                        // 判断这个特征是否为wifi属性
                        if (element.uuid.search("ec0e") != -1) {
                            wifiCharacteristic = element
                        } else {
                            ipCharacteristic = element
                        }
                    });
                    // 通知上层组件，蓝牙连接成功，并传递特征的引用
                    this.$emit("bleConnected",[wifiCharacteristic,ipCharacteristic])

                    // 订阅wifiCharacteristic的通知
                    return wifiCharacteristic.startNotifications().then(_ => {
                        console.log("notifications started");
                        wifiCharacteristic.addEventListener('characteristicvaluechanged',this.handleNotification)
                    });
                    
                })
                .catch(error => {
                    console.log('Argh! ' + error);
                    this.handleError(error)
                });
        },

        // 异常处理
        handleError(error) {
            // 取消查找
            if (error.message.search("cancelled") != -1) {
                ElNotification({
                    message: h('i', { style: 'color: teal' }, '您取消了扫描操作'),
                })
            }

        },

        // 接受peripheral的网络连接结果通知
        handleNotification(event){
            let decoder = new TextDecoder('utf-8')
            let isSuccess = decoder.decode(event.target.value)
            this.$emit("finishConnecting",isSuccess)
        }
    },
}
</script>

<style>
#root{
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
#card{
    width: 600px;
    height: 300px;
    position:relative
}

#button{
    position: absolute;
    bottom: 10%;
    left: 40%;
}

#introduction {
    line-height: 35px;
    white-space: pre-wrap;
}
</style>