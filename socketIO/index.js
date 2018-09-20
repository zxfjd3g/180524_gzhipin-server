/*
socketio服务器端
 */
const {ChatModel} = require('../db/models')
module.exports = function (server) {
  // 创建io对象(管理对象, 管理所有浏览器与服务器的连接)
  const io = require('socket.io')(server)

  // 监视浏览器对服务器的连接
  io.on('connection', function (socket) { // socket某个浏览器与服务器的连接
    console.log('有一个浏览器连接上了')
    // 监视浏览器向服务器发消息
    socket.on('sendMsg', function ({content, from, to}) {
      console.log('服务器收到消息', {content, from, to})
      // 保存到数据库chats集合
      const create_time = Date.now()
      const chat_id = [from, to].sort().join("-") // 保证2个人相互聊天结果一样
      const chatMsg = {content, from, to, create_time, chat_id}
      new ChatModel(chatMsg).save(function (error, chatMsgDoc) {
        // 发送给所有连接上的浏览器
        io.emit('receiveMsg', chatMsgDoc)
      })



    })
  })

}