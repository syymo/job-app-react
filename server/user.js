const express = require('express');
const Router = express.Router();
const model = require('./model');
// md5加密
const utils = require('utility');

const User = model.getModel('user');
const Chat = model.getModel('chat');

const _filter = {'password':0, __v:0}

Router.get('/removemsg',function(req,res){
	Chat.remove({},function(e,d){
		console.log('删除成功');
		return res.json({code:0,data:"删除成功"})
	})
})

Router.get('/list',function(req,res){
	//User.remove({},function(err,doc){})
	// get参数用query获取

	const { type } = req.query;
	if(type==null){
		return res.json({code:1,data:"type参数必传"})
	}
	User.find({type},_filter,function(err,doc){
		return res.json({code:0,data:doc})
	})
})

Router.post('/register',function(req,res){
	// 用户注册的信息
	// console.log(req.body);
	// post参数用body获取
	const { user, password, type } = req.body;
	// 查询是不是存在此用户
	User.findOne({user:user},function(err,doc){
		if(doc){
			return res.json({code:1,msg:'用户名重复'})
		}
		
		const userModel = new User({
			user,
			password,
			// md5加密
			// password:utils.md5
			// md5加盐加密
			// password:md5Pwd(password),
			type
		});
		userModel.save(function(e,d){
			if(err){
				return res.json({code:1,msg:'后端出错了'})
			}
			// console.log("register success：")
			// console.log(d)
			const { user, type, _id } = d;
			res.cookie('userid',_id);
			return res.json({code:0,data:{user, type, _id}})
		});
		//此方法不能生成用户Id
		//User.create({user,(password),type},function(err,doc){
		/*User.create({
			user,
			password,
			// md5加密
			// password:utils.md5
			// md5加盐加密
			// password:md5Pwd(password),
			type
		},function(err,doc){
		//User.create({user,password,type},function(err,doc){
			if(err){
				return res.json({code:1,msg:'后端出错了'})
			}
			return res.json({code:0})
		})*/
	});
});

Router.post('/update',function(req,res){
	const userid = req.cookies.userid;
	if(!userid){
		return json.dumps({code:1})
	}
	const body = req.body;
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data = Object.assign({},{
			user:doc.user,
			type:doc.type
		},body);
		console.log(doc)
		return res.json({code:0,data})
	});
});

Router.post('/login',function(req,res){
	console.log(req.body)
	const { user, password } = req.body;
	User.findOne({user},function(err,doc){
		if(!doc){
			return res.json({code:1,msg:'用户不存在！'})
		}else{
			const { _id } = doc;
			User.findOne(
				//查询条件
				{ 
					_id,
					password
					//password:md5Pwd(password) 
				},
				_filter, //密码字段不显示
				function(e,d){
					console.log(d);
					if(!d){
					 	return res.json({code:1,msg:'密码错误'})
					}
					// 登录成功
					// 设置cookie
					res.cookie('userid',d._id)
					return res.json({code:0,data:d})
					
				})
		}
		
	})
})


Router.get('/info',function(req,res){
	const { userid } = req.cookies;
	// 用户有没有cookie
	if(!userid){
		return res.json({code:1});
	}
	User.findOne(
		//查询条件
		{
			_id:userid
		},
		// 显示
		_filter,
		function(err,doc){
			if(err){
				return res.json({code:1, msg:'服务器出错'});
			}
			if(doc){
				return res.json({code:0, data:doc})
			}
		}
	)
	
})

Router.get('/getmsglist',function(req,res){
	const user = req.cookies.userid;
	User.find({},function(e,userdoc){
		let users = {};
		userdoc.forEach(v => {
			users[v._id] = {name:v.user, avatar:v.avatar}
		})
		// 查询所有的记录
		// Chat.find({},function(err,doc){
		Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){	
			if(!err){
				return res.json({code:0,msgs:doc,users:users})
			}
		})
	})
	// {'$or':[{from:user,to:user}]}
	
})

Router.post('/readmsg', function(req, res){
	const userid = req.cookies.userid
	const {from} = req.body
	console.log("123")
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,doc){
		console.log(doc)
		if (!err) {
			return res.json({code:0,num:doc.nModified})
		}
		return res.json({code:1,msg:'修改失败'})
	})
})

// 密码加盐
function md5Pwd(pwd){
	const salt = 'nodeapp_by_react';
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router