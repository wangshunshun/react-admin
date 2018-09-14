import React        from 'react';
import { Link }     from 'react-router-dom';
import PageTitle from '../../component/page-title/index.js'
import { Card,Row,Col,Icon } from 'antd';
import './index.css'
import Statistic from '../../service/statistic-service.js'
import MUtil from '../../util/mm.js';
const _mm=new MUtil();
const _statistic=new Statistic();

class Home extends React.Component{
	constructor(props){
		super(props)
		this.state={
			userCount:'-',
			productCount:'-',
			orderCount:'-'	
		}
	}
	componentDidMount(){
		this.loadCount();
	}
	loadCount(){
		_statistic.getHomeCount().then(res=>{
			this.setState(res);
		},err=>{
			console.log(err);
		})
	}
	render(){
		return(
			<div id="page-wrapper">
				<PageTitle title="首页"/>
				<Row>
					<Col className="col" span={8}>
						<Link tag="div" to="/" className="color-box brown">
							<p className="count">{this.state.userCount}</p>
                            <p className="desc">
								<Icon type="user" theme="outlined" />
                                <span>用户总数</span>
                            </p>
						</Link>
					</Col>
					<Col className="col" span={8}>
						<Link to="/product" className="color-box green">
							<p className="count">{this.state.userCount}</p>
							<p className="desc">
								<i className="fa fa-user-o"></i>
								<span>商品总数</span>
							</p>
						</Link>
					</Col>
					<Col className="col" span={8}>
						<Link to="/" className="color-box blue">
							<p className="count">{this.state.userCount}</p>
							<p className="desc">
								<i className="fa fa-user-o"></i>
								<span>订单总数</span>
							</p>
						</Link>
					</Col>
				</Row>
			</div>
		)
	}
}
export default Home;
