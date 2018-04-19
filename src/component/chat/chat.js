import React from 'react';
import { List, InputItem, Button, NavBar, Icon, Grid } from 'antd-mobile';
// import io from 'socket.io-client';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux';
import { getChatId } from '../../util'

// const socket = io('ws://172.16.120.109:9093');

@connect(
	state => state,
	{ getMsgList, sendMsg, recvMsg, readMsg }
)


class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state={
			text:'',
			msg:[],
			showEmoji:false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
	}
	componentDidMount(){
		console.log(this.props)
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList();
			this.props.recvMsg();
		}
		
		// socket.on('recvmsg',(data)=>{
		// 	console.log(data);
		// 	this.setState({
		// 		msg:[...this.state.msg,data.text]
		// 	})
		// })
	}
	componentWillUnmount(){
		const to = this.props.match.params.user
		this.props.readMsg(to)
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'))
		},0)
	}
	handleSubmit(){
		// console.log(this.state)
		// socket.emit('sendmsg',{text:this.state.text})
		// this.setState({text:''})
		// console.log(this.props)
		const from = this.props.user._id;
		const to = this.props.match.params.user;
		const msg = this.state.text;
		// 发送消息
		this.props.sendMsg(from ,to, msg);
		// 然后消息设为空
		this.setState({text:''})
	}

	render(){
		console.log(this.props)
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
										.map(v=>({text:v}));
				
		const userid = this.props.match.params.user;
		const Item = List.Item;
		const users = this.props.chat.users;
		if(!users[userid]){
			return null
		}
		// 过滤数据
		const chatid  = getChatId(userid, this.props.user._id);
		const chatmsg = this.props.chat.chatmsg.filter(v=>v.chatid=== chatid);
		console.log(chatmsg)
		return (
			<div id="chat-page">
				<NavBar 
					mode='dark'
					icon={<Icon type="left" />}
					onLeftClick={()=>{
						// 回跳 
						this.props.history.goBack()
					}}
				>
					{users[userid].name}
				</NavBar>
				{chatmsg.map(v => {
					const avatar = require(`../img/${users[v.from].avatar}.png`)
					return v.from === userid?(
							<List key={v._id}>
								<Item
									thumb={avatar}
								>{v.content}</Item>
							</List>
							// <p key={v._id}>对方发来的：{v.content}</p>
						):(
							<List key={v._id}>
								<Item 
									extra={<img src={avatar} alt="" />}
									className='chat-me'
								>{v.content}</Item>
							</List>
							// <p key={v._id}>我发送的：{v.content}</p>
						)
					// return <p key={v._id}>{v.content}</p>
				})}
				<div className="stick-footer">
					<List>
						<InputItem
							placeholder='请输入'
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span 
										style={{float:"left",fontSize:"28px",marginRight:10}}
										onClick={()=>{
											this.setState({
											  showEmoji:!this.state.showEmoji
											})
											this.fixCarousel()
									}}
									>😃</span>
									<Button 
										type="primary"
										size="small"
										onClick={this.handleSubmit}
									>发送</Button>
								</div>
							}
						></InputItem>
					</List>
					{this.state.showEmoji?<Grid
						data={emoji}
						columnNum={7}
						carouselMaxRow={4}
						isCarousel={true}
						hasLine={false}
						onClick={el=>{
							console.log(el)
							this.setState({
								text:this.state.text+el.text
							})
						}}
					/>:null}
					
					{/*<h2>chat with user:{this.props.match.params.user}</h2>*/}
				</div>
			</div>	
		)
	}
}

export default Chat;


// 10-9 00:10:40


