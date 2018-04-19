import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio, Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import { connect }  from 'react-redux';
import { register } from '../../redux/user.redux';
import appForm from '../../component/app-form/app-form';

@connect(
	state => state.user,
	{ register }
) 
@appForm

class Register extends React.Component{
	constructor(props){
		super(props);
		// this.state = {
		// 	hasError: false,
		// 	user:'',
		// 	password:'',
		// 	repeatpwd:'',
		// 	type: 'genius',
		// 	redirect:false
		// }
		this.login = this.login.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}
	componentDidMount(){
		//this.props.register(this.state)
		this.props.register(this.props.state)

		this.props.handleChange('type','genius');
	}
	handleRegister(){
		// this.props.register(this.state)
		this.props.register(this.props.state)
		if(this.props.msg){
			setTimeout(()=>{
	 			if(this.props.isSuccess === false){
					Toast.fail(this.props.msg)
				}else if(this.props.isSuccess === true){
					Toast.success(this.props.msg)
					// this.setState({
					// 	redirect:true
					// })
				}
	 		},600)
			
		}
		
	}
	login(){
		this.props.history.push('/login');
	}
	// handleChange(key,val){
	// 	this.setState({
	// 		[key]:val
	// 	})
	// }

	render(){
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<h2 style={{textAlign:'center'}}>注册页面</h2>
				<WingBlank>
					<List>
						<InputItem
							onChange={v=>this.props.handleChange('user',v)}
						>用户名</InputItem>
						<WhiteSpace />
						<InputItem
							type='password'
							onChange={v=>this.props.handleChange('password',v)}
							
						>密码</InputItem>
						<WhiteSpace />
						<InputItem
							type='password'
							onChange={v=>this.props.handleChange('repeatpwd',v)}
							
						>确认密码</InputItem>
						<RadioItem 
							checked={this.props.state.type === 'genius'}
							onChange={()=>this.props.handleChange('type','genius')}
	
						>
							牛人
						</RadioItem>
						<RadioItem 
							checked={this.props.state.type === 'boss'}
							onChange={()=>this.props.handleChange('type','boss')}
						>
							BOSS
						</RadioItem>
					</List>
					<WhiteSpace />
					<Button type="primary" onClick={this.handleRegister}>注册</Button>
					<WhiteSpace />
					<Button onClick={this.login} type="primary">登录</Button>
				</WingBlank>
			</div>	
		)
	}
}

export default Register;