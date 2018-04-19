import React from 'react';
import Logo from '../../component/logo/logo';
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { login } from '../../redux/user.redux';
import appForm from '../../component/app-form/app-form';


// 高阶组件
// function hello(){
// 	console.log("Hello React!!!");
// }
// function WrapperHello(fn){
// 	return function(){
// 		console.log("before say hello!!!");
// 		fn();
// 		console.log('after say hello!!!');
// 	}
// }
// hello = WrapperHello(hello)
// hello()



// function WrapperHello(Comp){
// 	// 反向继承
// 	class WrapComp extends Comp{
// 		componentDidMount(){
// 			console.log('高阶组件新增的生命周期，加载完成')
// 		}
// 		render(){
// 			return (
// 				<div>
// 					<Comp></Comp>
// 				</div>
// 			)
// 		}
// 	}
// 	// 属性代理
// 	// class WrapComp extends React.Component{
// 	// 	render(){
// 	// 		return (
// 	// 			<div>
// 	// 				<p>这是HOC高阶组件特有的元素</p>
// 	// 				<Comp name='text' {...this.props}></Comp>
// 	// 			</div>
// 	// 		)
// 	// 	}
// 	// }
// 	return WrapComp
// }
// Hello = WrapperHello(Hello)
// @WrapperHello
// class Hello extends React.Component{
// 	render(){
// 		return <h2>Hello syymo !!!</h2>
// 	}
// }


@connect(
	state => state.user,
	{login}
)
@appForm

class Login extends React.Component{

	constructor(props){
		super(props);
		// this.state = {
		// 	user:'',
		// 	password:''
		// }
		this.register = this.register.bind(this);
	}
	componentDidMount(){
		// this.props.login(this.state);
		this.props.login(this.props.state);
	}

	register(){
		// 跳转页面
		console.log(this.props);
		this.props.history.push('/register');

	}
	// handleChange(key,val){
	// 	this.setState({
	// 		[key]:val
	// 	})
	// }
	handleLogin(){
		this.props.login(this.props.state);
		//console.log(this.props)
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

	render(){
		return (
			<div>
			{(this.props.redirectTo&&this.props.redirectTo!=='/login')?<Redirect to={this.props.redirectTo} />:null}
				<Logo></Logo>
				<h2 style={{textAlign:'center'}}>登录页面</h2>
				<WingBlank>
					<List>
						<InputItem
							onChange={v=>this.props.handleChange('user',v)}
						>用户</InputItem>
						<WhiteSpace />
						<InputItem type="password"
							onChange={v=>this.props.handleChange('password',v)}
						>密码</InputItem>
					</List>
					<WhiteSpace />
					<Button type="primary"
						onClick={this.handleLogin.bind(this)}
					>登录</Button>
					<WhiteSpace />
					<Button onClick={this.register} type="primary">注册</Button>
				</WingBlank>
			</div>
		)
	}
}

export default Login;