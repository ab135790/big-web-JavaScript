import { getValue, setValue, getHValue, delValue } from './RedisConfig'

setValue('imooc', 'imooc message from redis client');

getValue('imooc').then(res => {
  console.log('getValue:' + res);
})
delValue('imooc')
setValue('imoocObj', { name: 'wang', age: 29, email: '275284429@qq.com' })

getHValue('imoocObj').then(res => {
  console.log('imoocObj:' + JSON.stringify(res))
})