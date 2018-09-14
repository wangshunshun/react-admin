import React from 'react';
import MUtil from '../../util/mm.js';
import User from '../../service/user-service.js'
import { Row,Col,Input,Button  } from 'antd';
import img1 from '../../assets/images/slider.jpg'
import img2 from '../../assets/images/slider2.jpg'
import img3 from '../../assets/images/slider3.jpg'
import './index.css'
const _mm=new MUtil();
const _user = new User();
const imgArr=[img1,img2,img3];
//随机数0-2
let random=Math.floor(Math.random()*3);
//把随机取到的图片赋值给class为row的元素

const backgroundImg={
    backgroundImage: `url(${imgArr[random]})`,
    backgroundSize:"cover",
    backgroundRepeat:'no-repeat'
}
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }
    onInputChange(e){
        let inputValue=e.target.value,
            inputName=e.target.name;
        this.setState({
            [inputName]:inputValue
        })
    }
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    //当用户提交表单
    onSubmit(){
        let loginInfo = {
            username : this.state.username,
            password : this.state.password
        },
        checkResult = _user.checkLoginInfo(loginInfo);
        // 验证通过
        if(checkResult.status){
            _user.login(loginInfo).then(res=>{
                _mm.setStorage('userInfo', res);
                this.props.history.push(this.state.redirect);
            },err=>{
                _mm.errorTips(err);
            })
        //验证不通过
        }else{
            _mm.errorTips(checkResult.msg);
        }
    }
    render(){
        return(
            <Row className="row" style={backgroundImg}>
                <Col md={{span:8,offset:8}}>
                    <div className="panel">
                        <div className="panel-header">欢迎登录 - MMALL管理系统</div>
                        <div className="panel-body">
                            <Input name="username" value={this.state.username} onKeyUp={e => this.onInputKeyUp(e)} onChange={this.onInputChange.bind(this)}  style={{marginBottom:15}} placeholder="请输入用户名" />
                            <Input name="password" value={this.state.password} onKeyUp={e => this.onInputKeyUp(e)} onChange={this.onInputChange.bind(this)} placeholder="请输入密码" />
                        </div>
                        <div style={{padding:15}}>
                            <Button onClick={this.onSubmit.bind(this)} style={{width:'100%'}} size={"large"} type="primary">登录</Button>
                        </div>
                        
                    </div>
                </Col>
            </Row>  
        )
    }
}
export default Login