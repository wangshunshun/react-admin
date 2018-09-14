/*
* @Author: Rosen
* @Date:   2018-01-23 22:18:41
* @Last Modified by:   Rosen
* @Last Modified time: 2018-01-23 22:26:09
*/
import React from 'react';
import {Link } from 'react-router-dom'
import { Menu, Dropdown, Icon } from 'antd';
import User from '../../service/user-service.js'
import MUtil from '../../util/mm.js';
import './index.css'
const _mm=new MUtil();
const _user = new User();

class PageTitle extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username: _mm.getStorage("userInfo").username || ''
        }
    }
    componentWillMount(){
        document.title = this.props.title + ' - HAPPY MMALL';
    }
    onLogout(){
        _user.logout().then(res=>{
            _mm.removeStorage('userInfo');
            window.location.href = '/login';
        },err=>{
            console.log(err)
            _mm.errorTips(err);
        })
    }
    render(){
        const menu =(
            <Menu onClick={()=>{this.onLogout()}}>
                <Menu.Item>
                    <a rel="noopener noreferrer">退出登录</a>
                </Menu.Item>
            </Menu>
        )
        return (
            <div className="header">
                <div className="header-left">
                    <Link to="/"><b>HAPPY</b>MMALL</Link>
                </div>
                <div className="header-right">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" href="#">
                        <Icon type="user" />
                        {
                            this.state.username ? <span>欢迎，{this.state.username}</span> :<span>欢迎您</span>
                        }<Icon type="down" />
                        </a>
                    </Dropdown>     
                </div>
            </div>
        );
    }
}

export default PageTitle;