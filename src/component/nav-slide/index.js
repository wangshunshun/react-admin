import React from 'react';
import { NavLink }    from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.css';




class NavSide extends React.Component{
	constructor(props){
		super(props);
		this.state={
			current:"mail"
		}
	}
	componentDidMount(){
		// console.log(this.state.current)
	}
	handleClick=(e)=>{
		this.setState({
			current:e.key
		})
		console.log(this.state.current)
	}
	render(){
		const SubMenu = Menu.SubMenu;
		return(
			<Menu
			className="menuList"
			openKeys={['sub1','sub2','sub3']}
			style={{ width: 260,height:'100%' }}
			onClick={this.handleClick}
			selectedKeys={[this.state.current]}
			mode="inline">
				<Menu.Item key="mail"><NavLink to="/"><span><Icon type="home" />首页</span></NavLink></Menu.Item>
				<SubMenu key="sub1" title={<span><Icon type="appstore" /><span>商品</span></span>}>
			        <Menu.Item key="setting:1"><NavLink to="/product">商品管理</NavLink></Menu.Item>
			        <Menu.Item key="setting:2">品类管理</Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub2" title={<span><Icon type="setting" /><span>订单</span></span>}>
		          	<Menu.Item key="setting:3"><NavLink to="/order">订单管理</NavLink></Menu.Item>
		        </SubMenu>
		        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>用户</span></span>}>
		          	<Menu.Item key="setting:4">用户管理</Menu.Item>
		        </SubMenu>
			</Menu>
		)
	}
}
export default NavSide;