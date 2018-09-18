/*
使用mongoose操作mongodb的测试文件
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */

const md5 = require('blueimp-md5')

/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test4')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库连接成功!')
})

/*2. 得到对应特定集合的Model*/
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  username: {type: String, required: true}, // 用户名
  password: {type: String, required: true}, // 密码
  type: {type: String, required: true}, // 用户类型: dashen/laoban
})

// 2.2. 定义Model(与集合对应, 可以操作集合)
const UserModel = mongoose.model('users', userSchema)

/*3. 通过Model或其实例对集合数据进行CRUD操作*/
// 3.1. 通过Model实例的save()添加数据
function testSave() {
  const user = {
    username: 'Jack',
    password: md5('234'),
    type: 'dashen'
  }
  new UserModel(user).save(function (error, userDoc) {
    console.log('save()', error, userDoc)
  })
}

// testSave()

// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
  // 查找所有匹配doc的集合数组, 如果没有一个匹配得到[]
  UserModel.find({_id: '5ba066cadcd49708989068e7'}, function (error, userDocs) {
    console.log('find()', error, userDocs)
  })

  // 查找一个匹配doc的对象, 如果没有一个匹配得到null
  UserModel.findOne({_id: '5ba066cadcd49708989068e7'}, function (error, userDoc) {
    console.log('findOne()', error, userDoc)
  })
}
// testFind()


// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5ba066cadcd49708989068e6'}, {username: 'Bob', type: 'dashen'}, function (error, oldUserDoc) {
    console.log('update()', error, oldUserDoc)
  })
}
// testUpdate()


// 3.4. 通过Model的remove()删除匹配的数据
function testRemove() {
  UserModel.remove({_id: '5ba066cadcd49708989068e6'}, function (error, doc) {
    console.log('remove()', error, doc)
  })
}
testRemove()
