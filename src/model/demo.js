import User from './test'

// 增
const user = {
  name: 'brian',
  age: 30,
  email: 'brian@toimc.com'
}

const insertMethods = async () => {
  const data = new User(user)
  const result = await data.save()
  console.log(result)
}
// insertMethods()

// 查
const findMethods = async () => {
  const result = await User.find()
  console.log(result)
}
// findMethods()
// 改
const updatgeMethods = async () => {
  const result = await User.updateOne({ name: 'brian' }, {
    email: '275284429@qq.com'
  })
  console.log(result)
}
// updatgeMethods()
// 删
const deleteMethods = async () => {
  const result = await User.deleteOne({ name: 'brian' })
  console.log(result)
}
deleteMethods()