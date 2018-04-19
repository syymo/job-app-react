// 引入express模块
const express = require('express');
// post请求参数接收
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const model = require('./model');
const Chat = model.getModel('chat');

// 新建app
const app = express();
// work with express 
const server = require('http').Server(app);
const io = require('socket.io')(server);
// io全局的请求
io.on('connection',function(socket){
	// console.log('user login')
	// socket当前的请求
	socket.on('sendmsg',function(data){
		console.log(data);
		const { from, to, msg } = data;
		const chatid = [from,to].sort().join('_');
		// 转为全局接收状态
		// io.emit('recvmsg',data);
		Chat.create({chatid,from,to,content:msg},function(err,doc){
			io.emit('recvmsg', Object.assign({},doc._doc))
		})
	})
})


const userRouter = require('./user');
//  定义端口
const port = 9093;


app.use(cookieParser());
// app.use(bodyParser.urlencoded({    
//   extended: true
// }));
app.use(bodyParser.json());

// 引入一个中间件
app.use('/user',userRouter);



// 9093 端口号
//app.listen(port,function(){
server.listen(port,function(){
	console.log('Node app start at port '+port+"!");
})

