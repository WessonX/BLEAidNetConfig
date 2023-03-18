<script setup>
import { ElMessage } from 'element-plus';
import Scan from './components/Scan.vue'
import Setting from './components/Setting.vue'
</script>

<template  >
  <div id="app" style="height:100vh" v-loading="isConnecting"  element-loading-text="网络连接中...">
    <Scan v-show="showScan" v-on="{bleConnected:onBleConnected,finishConnecting:onFinishConnecting}"></Scan>
    <Setting  v-if="!showScan" v-on="{rescan:onRescan,startConnecting:onStartConnecting}" :characteristics="[wifiCharacteristic,ipCharacteristic]">
    </Setting>
  </div>
</template>


  <script>
    export default {
      data() {
        return {
          // 展示扫描界面，否则展示设置界面
          showScan:true,
          wifiCharacteristic:null,
          ipCharacteristic:null,

          // 正在连接网络
          isConnecting:false
        }
      },
      methods: {
        // 连接上蓝牙，则隐藏扫描界面,显示设置界面
        onBleConnected(characteristics){
          this.showScan = false
          this.wifiCharacteristic = characteristics[0]
          this.ipCharacteristic = characteristics[1]
        },

        // 重新扫描
        onRescan(){
          console.log("重新扫描")
          this.showScan = true
        },

        // 开始连接wifi
        onStartConnecting(){
          this.isConnecting = true
        },

        // 完成连接操作
        onFinishConnecting(isSuccess) {
          this.isConnecting = false
          if (isSuccess == "true") {
            ElMessage({
              message:"wifi设置成功",
              type:"success"
            })
          } else {
            ElMessage.error("连接失败,请检查wifi名称和密码");
          }
        }
      }
    }
  </script>

<style >
#app{
  /* background-color: rgb(26,26,26) */
}

body {
  padding: 0;
  margin: 0;
}
</style>
