const ApiSauce = require('apisauce')

const apiInUrl = 'in.php'
const apiResUrl = 'res.php'

module.exports = class AzCaptcha {
  constructor (apiKey) {
    this.api = ApiSauce.create({baseURL: 'http://azcaptcha.com'})
    this.apiKey = apiKey
  }

  async createTask (googlekey, pageurl, min_score = 0.3) {
    const res = await this.api.get(apiInUrl, {
      key: this.apiKey,
      googlekey,
      pageurl,
      method: 'userrecaptcha',
      version: 'v3',
      min_score,
      json: 1,
    })
    if (res.ok && res.data.status === 1) {
      return res.data.request
    }
    throw new Error(res.data.request || 'Unknown error')
  }
  
  async getTaskResult (id) {
    const res = await this.api.get(apiResUrl, {
      key: this.apiKey,
      action: 'get',
      json: 1,
      taskinfo: 1,
      id,
    })
    if (res.ok && res.data.status === 1) {
      return res.data.request.split('\r\n')[0]
    }
    if (res.data.request === 'CAPCHA_NOT_READY') {
      return 0
    }
    throw new Error(res.data.request || 'Unable to get task result')
  }

  async pollTaskResult (id, delay = 5000, attempts = 25) {
    try {
      await new Promise(r => setTimeout(r, delay))
      for (let i = 0; i <= attempts; i++) {
        const res = await this.getTaskResult(id)
        if (res) return res
        await new Promise(r => setTimeout(r, delay))
      }
    } catch (err) {
      throw new Error(err.message)
    }
    throw new Error(`Timed out getting result after ${(delay * attempts) / 1000}s.`);
  }
  
  async getBalance () {
    const res = await this.api.get(apiResUrl, {
      key: this.apiKey,
      action: 'getbalance',
      json: 1,
    })
    if (res.ok && res.data.status === 1) {
      return res.data.request
    }
    throw new Error(res.data.request || 'Unable to get balance')
  }
  
  async isBalanceGreaterThan (threshold) {
    try {
      const balance = await this.getBalance()
      return balance > threshold
    } catch (err) {
      throw new Error(err.message)
    }
  }
}