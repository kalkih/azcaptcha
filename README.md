# azcaptcha 🤖

A simple & modern javascript wrapper for https://azcaptcha.com/ captcha solving API.

Currently only supporting reCaptcha v3.

## Install

```
$ npm install azcaptcha
```

## Usage

```js
const azcaptcha = require('azcaptcha');

(async () => {
  const captcha = new AzCaptcha('<API_KEY>')
  try {
    if (await captcha.isBalanceGreaterThan(2)) {
      const taskId = await captcha.createTask('<SITE_KEY>', '<PAGE_URL>')
      console.log(taskId);
      //=> '402049'
    }
  } catch (err) {
    console.log(err);
    //=> 'INVALID SITE KEY etc ...'
  }
})();
```

## Methods
### **createTask** - create captcha solving request
```js
createTask('<SITE_KEY>', '<PAGE_URL>')
```

### **getTaskResult** - get captcha task result
```js
getTaskResult('<TASK_ID>')
```

### **pollTaskResult** - poll captcha task result
```js
pollTaskResult('<TASK_ID>', '<DELAY>', '<ATTEMPTS>')
```

### **getBalance** - get account balance
```js
getBalance()
```

### **isBalanceGreaterThan** - check account balance
```js
isBalanceGreaterThan(10)
```