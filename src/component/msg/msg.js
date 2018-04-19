import React from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

@connect(
	state=>state
)

class Msg extends React.Component{
	getList(arr){
		return arr[arr.length-1]
	}
	render(){
		console.log(this.props)
		const Item = List.Item;
		const Brief = Item.Brief;
		const userid = this.props.user._id;
		// 聊天信息分组
		const msgGroup = {}
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid] = msgGroup[v.chatid] || []
			msgGroup[v.chatid].push(v)
		})
		// console.log(msgGroup)
		// 取出分组中的object的value
		const chatList = Object.values(msgGroup).sort((a,b)=>{
			const a_last = this.getList(a).create_time;
			const b_last = this.getList(b).create_time;
			return b_last - a_last;
		})
		// console.log(chatList)

		/*
			1.eslint代码校验工具
			2.react16特有数据
			3.react性能优化

	


		*/	
		return(
			<div>
				
					{chatList.map(v=>{
						console.log(v)
						// 取出最后一条消息
						const lastItem = this.getList(v)
						// console.log(lastItem)
						// 如果用户id是from则 取用户为to 反之用户为from
						const targetId = v[0].from === userid?v[0].to:v[0].from;
						// 未读消息数量
						const unreadNum = v.filter(v=>!v.read&&v.to===userid).length;
						// console.log(targetId)
						// const name = this.props.chat.users[targetId] && this.props.chat.users[targetId].name
						if(!targetId){
							return null;
						}
						// cosnt name = this.props.chat.users[targetId]?this.props.chat.users[targetId].name:'';
						// cosnt avatar = this.props.chat.users[targetId]?this.props.chat.users[targetId].avatar:'';
						return (
							<List key={lastItem._id} >
								<Item
									extra={
										<Badge 
											text={unreadNum}
										></Badge>}
									// 缩略图
									thumb={require(`../img/${this.props.chat.users[targetId].avatar}.png`)}
									// 箭头
									arrow="horizontal"
									onClick={()=>{
										this.props.history.push(`/chat/${targetId}`)
									}}
								>
									{lastItem.content}
									<Brief>{this.props.chat.users[targetId].name}</Brief>
								</Item>
							</List>
						)
					})}
				
			</div>
		)
	}
}

export default Msg;
// 12-1