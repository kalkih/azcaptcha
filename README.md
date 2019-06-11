# azcaptcha

A simple & modern wrapper for https://azcaptcha.com/ captcha solving API.

Currently only supporting reCaptcha v3.

## Methods
* createTask
* getTaskResult
* getBalance
* isBalanceGreaterThan

## Install

```
$ npm install azcaptcha
```

## Usage

```js
const azcaptcha = require('azcaptcha');

(async () => {
  const captcha = new AzCaptcha('<API KEY>')
  try {
    if (await captcha.isBalanceGreaterThan(2)) {
      const taskId = await captcha.createTask('<SITE KEY>', '<PAGE URL>')
      console.log(taskId);
      //=> '402049'
    }
  } catch (err) {
    console.log(err);
    //=> 'INVALID SITE KEY etc ...'
  }
})();
```