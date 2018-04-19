import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';
import { logoutSubmit } from '../../redux/user.redux';


@connect(
	state => state.user,
	{logoutSubmit}
)

class User extends React.Component{
	constructor(props){
		super(props)
		this.logout = this.logout.bind(this);
	}
	logout(){
		const alert = Modal.alert;
		alert('注销', 'Are you sure???', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: 'Ok', onPress: () => {
      	// 擦除cookie
      	browserCookie.erase('userid');
      	this.props.logoutSubmit()
      	// 强制刷新
      	// window.location.href = window.location.href;
      } },
    ])
		
		//browserCookie.erase('userid');
		//window.location.href = location.href
	}

	render(){
		console.log(this.props)
		const Item = List.Item;
		const Brief = List.Item.Brief 
		return this.props.user?(
				<div>
					<Result
						img={<img src={require(`../img/${this.props.avatar}.png`)} alt="" />}
						title={this.props.user}
						message={
							//this.props.type==='boss'&&<div>{this.props.company}</div>
							this.props.type==='boss'?
							<div>
								<div>{this.props.company}</div>
							</div>:null
						}
					/>
					<List renderHeader={()=>"简介"} >
						<Item
							wrap="true"
						>
							{this.props.title}
							{this.props.desc.split('\n').map(v =><Brief key={v}>{v}</Brief> )}
							{this.props.money?<Brief>薪资：{this.props.money}</Brief>:null}
						</Item>	
					</List>
					<WhiteSpace />
					<List>
						<Button 
							type="warning"
							//onClick={()=>{this.logout()}}
							onClick={this.logout}
						>注销</Button>
					</List>
			</div>
		):<Redirect to={this.props.redirectTo} />
	}
}

export default User;
