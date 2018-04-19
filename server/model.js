const mongoose = require('mongoose');
//连接mongoose 并且使用imooc这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/chatapp';
mongoose.connect(DB_URL,{useMongoClient: true});
mongoose.connection.on('connected', function(){
	console.log('MongoDB connect success');
})
// 类似于mysql的表  mongo里面有文档、字段的概念

const models = {
	user:{
		'user':{type:String, require:true},
		'password':{type:String, require:true},
		'type':{type:String, require:true},
		// 图像
		'avatar':{type:String},
		// 个人简介或者职位简介
		'desc':{type:String},
		// 想找的工作
		'title':{type:String},
		// 如果是boss
		'company':{type:String},
		'money':{type:String}
	},
	chat:{
		'chatid':{type:String, require:true},
		'from':{type:String, require:true},
		'to':{type:String, require:true},
		'read':{type:Boolean, default:false},
		'content':{type:String, require:true, default:''},
		'create_time':{type:Number, default:new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name);
	}
}