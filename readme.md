## Introduction

​	In face of "Internet of things", the first problem of users having to face is have their device connected into Internet. Yet many devices have no user interface to configure the network. BLE(Bluetooth Low Energy) could help. Our program running on devices will broadcast itself, with specified hostname, uuid and services.Once our front-end webPage scan the device, user could input specified wifi ssid and wifi pwd to the device via ble. 

+ For central,it's based on web-bluetooth-API. Being an experimental tech, it hasn't support all platForms and browsers. [Check your browser compatiability](https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility)

+ For peripheral, it's based on `bleno`

## Usage

+ For central(i.e the front-end webPage),visit our website https://test1.mcurobot.com/, or deploy the folder /ble-central into your own server.

+  For peripheral(i.e your device), download the folder /peripheral  into your device.

```
>npm install
>node peripheral.js
```

Especially, peripheral.js is based on "bleno","bluetooth-hcisocket", and there might be problems when you execute 'npm install'.**It's advised to downgrade your node version to v8.9.0**. [Other precautions are mentioned in bleno](https://github.com/noble/bleno)

You can try on writing a systemctl service, so as to make the peripheral program run automatically when the device is start.

