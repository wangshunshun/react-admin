import React, { Component } from 'react';
import { Button, Select, Input, Row, Col,message } from 'antd';
import { Link } from 'react-router-dom'
import Order from '../../service/order-service.js'

//组件
import PageTitle from '../../component/page-title/index.js'
import TablePage from '../../component/table/index.js'
import Pagation  from '../../component/pagination/index.js'
const _order=new Order();
const Option = Select.Option;
class OrderPage extends Component{
    constructor(props) {
        super(props);
        this.state= {
            pageSizeOptions: ['20', '50', '100', '150', '200'],
            list: [],
            pageNum: 1,
            pageSize: 20,
            total: 0,
            orderNo: ''//文本框的值
        }
    }
    componentWillMount = () => {
        document.title = '订单管理' + '-admin'
    }
    componentDidMount = () => {
        this.getOrderList()
    }
    /**
     * 获取订单列表数据
     */
    getOrderList(){
        let { pageNum, pageSize, total } = this.state
      
        let paramsInfo = {
            pageNum: pageNum,
            pageSize: pageSize,
            total: total
        }
        _order.getOrderList(paramsInfo).then(res=>{
            // 设置序号的展示模式
            let count = ((pageNum - 1) * pageSize) + 1
            let leng = res.list.length
            res.list.forEach((item) => {
                if (count > 0 && leng > 0) {
                    item.sequence = count
                    count = count + 1
                }
                return res.list
            })
            // set 结果集
            this.setState(res)
        })
    }
    /**
     * 搜索
     */
    onSerach(){
        let { pageSize, pageNum, orderNo } = this.state
        let paramsInfo={
            pageNum: pageNum,
            pageSize: pageSize,
            orderNo:orderNo
        }
        _order.getSearchList(paramsInfo).then(res=>{
            // 设置序号的展示模式
            let count = ((pageNum - 1) * pageSize) + 1
            let leng = res.list.length
            res.list.forEach((item) => {
                if (count > 0 && leng > 0) {
                    item.sequence = count
                    count = count + 1
                }
                return res.list
            })
            // set 结果集
            this.setState(res)
        },err=>{
            message.error(err)
            let dataInfo={
                list: [],
                pageNum: 1,
                pageSize: 20,
                total: 0,
            }
            this.setState(dataInfo)
        })
        .catch(err=>{
            message.error(err)
        })
    }
    /**
     * 获取input文本值
     */
    onValueChange(e){
        this.setState({
            orderNo: e.target.value
        })
    }
     /**
     * 查看详情
     */
    handelDetail(){

    }
    render(){
        const columns = [
            {
                title: '序号',
                dataIndex: 'sequence',
                width: '60px',
                align: 'center'
            }, {
                title: '订单号',
                dataIndex: 'orderNo',
                align: 'center'
            }, {
                title: '收件人',
                dataIndex: 'receiverName',
                align: 'center'
            }, {
                title: '订单状态',
                dataIndex: 'statusDesc',
                align: 'center'
            }, {
                title: '订单总价',
                dataIndex: 'payment',
                align: 'center'
            }, {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'center'
            }, {
                title: '操作',
                dataIndex: 'operation',
                width: '80px',
                align: 'center',
                key: 'categoryId',
                render: (text, record, index) => {
                    return (
                        <div>
                            <Link to={`/orders/detail/${record.orderNo}`}>
                                <Button type="text" size="small" onClick={() => this.handelDetail(record)}>查看</Button>
                            </Link>
                        </div >
                    )
                }
            }
        ]
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <Row style={{marginBottom:20}}>
                    <Col span={24}>
                        <Select defaultValue="id" style={{ width: 180 }} onChange={(e)=>this.handleChange(e)}>
                            <Option value="id">按订单号查询</Option>
                        </Select>
                        <Input style={{ width: 180,marginLeft:10 }} value={this.state.orderNo} placeholder="请输入订单号" onChange={(e) => this.onValueChange(e)}/>
                        <Button style={{marginLeft:10}} onClick={()=>{this.onSerach()}} type="primary">搜索</Button>
                        <Button style={{marginLeft:10}} onClick={() => {this.onCancel()}} type="primary">清空</Button>
                    </Col>
                </Row>
                {/* 表格数据 */}
                <TablePage rowKey="sequence" columns={columns} dataSource={this.state.list} />
                 {/* 分页器 */}
                
            </div>  
        )
    }
}
export default OrderPage

