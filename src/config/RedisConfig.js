// npm install -S redis
import redis from 'redis'
// npm install -S bluebird
import { promisifyAll } from 'bluebird'
import config from './index'


const options = {
  host: config.REDIS.host, // 服务器地址
  port: config.REDIS.port, // 端口号
  password: config.REDIS.password, // redis数据库密码
  detect_buffers: true, // 
  retry_strategy: function (options) {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
      return new Error('The server refused the connection');
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
}

const client = promisifyAll(redis.createClient(options));

client.on('error', err => {
  console.log('redis client error:' + err);
})

const setValue = (key, value, time) => {
  if (typeof value === 'undefined' || value == null || value === '') {
    return
  }
  if (typeof value === 'string') {
    if (typeof time !== 'undefined') {
      // 设置有效时间
      client.set(key, value, 'EX', time);
    } else {
      client.set(key, value);
    }
  } else if (typeof value === 'object') {
    //  { key1: value1, keys: value2 }
    //  Object.keys(value) => [key1, key2]
    Object.keys(value).forEach(item => {
      client.hset(key, item, value[item], redis.print)
    })
  }
};

// const { promisify } = require('util');
// const getAsync = promisify(client.get).bind(client);
// 解释 v8 promisify method use util, must node > 8
// const getHAsync = promisify(client.hgetall).bind(client);

const getValue = key => {
  return client.getAsync(key);
}

const getHValue = key => {
  // bluebird async
  return client.hgetallAsync(key);
}

const delValue = key => {
  client.del(key, (err, res) => {
    if (res === 1) {
      console.log('delete successfully');
    } else {
      console.log('delete redis key error:' + err);
    }
  })
}

export {
  client,
  setValue,
  getValue,
  getHValue,
  delValue
}