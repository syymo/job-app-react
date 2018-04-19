import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux';
import { connect } from 'react-redux';


// 处理不是路由组件的组件
@withRouter

@connect(
	null,
	{loadData}
)

class AuthRoute extends React.Component{
	componentDidMount(){
		// 获取当前的页面路由
		const publicList = ['/login','/register'];
		const pathname = this.props.location.pathname;
		if(publicList.indexOf(pathname)>-1){
			return null
		}
		// 获取用户信息
		axios.get('/user/info')
			.then(res=> {
				if(res.status === 200){

					if(res.data.code === 0){
						// 有登陆信息
						this.props.loadData(res.data)
					}else{
						// 没有登录信息
						// console.log(this.props.history)
						this.props.history.push('/login')
					}
					//console.log(res.data)
				}
			})

		// 用户状态  
		// 是否登录 
		// url地址  
		// 用户的type身份
		// 用户是否完善信息（选择信息 个人简介）
	}
	render(){
		return null
	}
}

export default AuthRoute;