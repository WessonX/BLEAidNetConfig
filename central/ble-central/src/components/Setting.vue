<template>
    <el-row v-if="!showForm"  :gutter="20" id="setting"  type="flex" justify="center" align="middle">
        <el-col :span="6">
            <el-tooltip effect="dark" placement="top" content="设置wifi">
                <el-button id="wifiSetting" @click="wifiSetting"></el-button>
            </el-tooltip>
        </el-col>

        <el-col :span="6">
            <el-tooltip effect="dark" placement="top" content="获取ip地址">
                <el-button id="getip" @click="getIP"></el-button>
            </el-tooltip>
        </el-col>

        <el-col :span="6">
            <el-tooltip effect="dark" placement="top" content="重新扫描">
                <el-button id="rescan" type="button" @click="rescan"></el-button>
            </el-tooltip>
        </el-col>
    </el-row>

    <el-card v-if="showForm" id="form" align="middle">
        <el-form>
            <el-row class="wifiSetting">
                <el-col :span="24">
                    <el-form-item label="wifi名称(SSID)">
                        <el-input v-model="ssid" placeholder="请输入wifi名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wifiSetting">
                <el-col :span="24">
                    <el-form-item label="wifi密码(PWD)">
                        <el-input v-model="pwd" placeholder="请输入wifi密码" type="password"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row class="wifiSetting" justify="space-evenly">
                <el-col :span="6"><el-button @click="cancelSetting">取消</el-button></el-col>
                <el-col :span="6"> <el-button @click="confirmSetting">连接</el-button></el-col>

            </el-row>
        </el-form>
    </el-card>
</template>

<script>
import ipImg from '../assets/ip.png'
import SettingImg from '../assets/wifiSetting.png'
export default {
    emits: ["rescan", "startConnecting"],
    props: {
        characteristics: Array
    },
    data() {
        return {
            ip: "",
            wifiCharacteristic: this.characteristics[0],
            ipCharacteristic: this.characteristics[1],

            // 是否展示wifi设置的表单
            showForm: false,

            // wifi的ssid
            ssid: "",

            // wifi的pwd
            pwd: "",
        }
    },
    methods: {
        // 重新扫描
        rescan() {
            this.$emit("rescan");
        },
        // 获取ip地址
        getIP() {
            this.ipCharacteristic.readValue().then(value => {
                let decoder = new TextDecoder('utf-8');
                this.ip = decoder.decode(value)
                this.$alert(this.ip, 'ip地址')
            });
        },

        // 设置wifi信息
        wifiSetting() {
            this.showForm = true
        },

        //取消设置
        cancelSetting() {
            this.showForm = false

            // 清空输入框的数据
            this.ssid = ""
            this.pwd = ""
        },

        // wifi连接
        confirmSetting() {

            this.showForm = false

            var dataObj = { "ssid": this.ssid, "pwd": this.pwd };
            const dataStr = JSON.stringify(dataObj)
            const dataBuffer = new TextEncoder().encode(dataStr)

            this.wifiCharacteristic.writeValueWithResponse(dataBuffer)

            // 清空输入框的数据
            this.ssid = ""
            this.pwd = ""

            this.$emit("startConnecting")
        }
    }
}
</script>

<style>
#wifiSetting {
    background-image: url('../assets/wifiSetting.png');
    width: 200px;
    height: 200px;
}

#getip {
    background-image: url('../assets/ip.png');
    width: 200px;
    height: 200px;
}

#rescan {
    background-image: url('../assets/rescan.png');
    width: 200px;
    height: 200px;
}

#form {
    left: 30%;
    right: 30%;
    top:30%;
    position: absolute;
}

#setting.el-row {
    height: 100%;
}
</style>