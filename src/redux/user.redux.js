import axios from 'axios'

import { getRedirectPath }  from '../util'

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const AUTH_SUCCESS = 'AUTH_SUCCESS';

const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const LOGOUT = 'LOGOUT';

const initState = {
	redirectTo:'',
	//isAuth:false,
	isSuccess:false,
	msg:'',
	user:'',
	// password:'',
	// repeatpwd:'',
	type:''
}
// redux
export function user(state = initState, action){
	switch(action.type){
		/*
		case REGISTER_SUCCESS:
			return {...state, msg:'注册成功', redirectTo:getRedirectPath(action.payload), isAuth:true, isSuccess:true, ...action.payload }
		case LOGIN_SUCCESS:
			return {...state, msg:'登录成功', redirectTo:getRedirectPath(action.payload), isAuth:true, isSuccess:true, ...action.payload }
		*/

		case AUTH_SUCCESS:
			return {...state, msg:'成功', redirectTo:getRedirectPath(action.payload), isSuccess:true, ...action.payload }

		case LOAD_DATA:
			return	{...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, isSuccess:false, msg:action.msg}
		case LOGOUT:
			return {...initState, redirectTo:'/login'}	
		default:
			return state
	}
	
}

/*function registerSuccess(data){
	return { type: REGISTER_SUCCESS, payload:data }
}

function loginSuccess(data){
	return { type: LOGIN_SUCCESS, payload:data }
}*/

function authSuccess(obj){
	// 过滤掉password
	const { pwd,...data } = obj;
	return { type: AUTH_SUCCESS, payload:data }
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function loadData(userinfo){
	return { type: LOAD_DATA, payload:userinfo.data }
}

export function logoutSubmit(){
	return { type: LOGOUT }
}

export function update(data){
	return dispatch => {
		axios.post('/user/update',data)
			.then(res=>{
				if(res.status === 200 && res.data.code === 0){
					// 请求成功
					dispatch(authSuccess(res.data.data))
				}else{
					// 请求失败
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
}

export function login({user,password}){
	if(!user || !password){
		return errorMsg('请输入用户名密码！');
	}
	return dispatch => {
		axios.post('/user/login',{user,password})
			.then(res=>{
				if(res.status === 200 && res.data.code === 0){
					// 请求成功
					//dispatch(loginSuccess(res.data.data));
					dispatch(authSuccess(res.data.data))
				}else{
					// 请求失败
					dispatch(errorMsg(res.data.msg));
				}
			})
	}

}

export function register({user,password,repeatpwd,type}){
	if(!user || !password || !type){
		return errorMsg('用户名密码必须输入！');
	}
	if(password !== repeatpwd){
		return errorMsg('输入的两次密码不相同！');
	}
	return dispatch => {
		axios.post('/user/register',{user,password,type})
			.then(res=>{
				if(res.status === 200 && res.data.code === 0){
					// 请求成功
					//dispatch(registerSuccess({user,password,type}));
					dispatch(authSuccess(res.data.data))
				}else{
					// 请求失败
					dispatch(errorMsg(res.data.msg));
				}
			})
	}
	
}


//  7-2  00:08:40