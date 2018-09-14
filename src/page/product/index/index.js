import React from 'react';
import { Button,Select,Row,Col,Input,Table,Pagination,Link} from 'antd';
import Product from '../../../service/product-service.js'
import MUtil from '../../../util/mm.js';

import PageTitle from '../../../component/page-title/index.js'
import ListSearch from './search.js'
import TableList from './list.js'
import './index.css'

const _mm=new MUtil();
const _product=new Product();

class ProductList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            pageNum:1,
            listType:'list'
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.loadProductList();
        })
        
    }
    // 加载商品列表
    loadProductList(){
        let listParam={}
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        // 请求接口
        _product.getProductList(listParam).then(res=>{
            this.setState(res)
        },err=>{

        })
    }
    onShowSizeChange(current, pageSize){
        console.log(current, pageSize);
    }
    editSource(){
        alert(1)
    }
    deletSource(){
        alert(2)
    }
    // 改变商品状态，上架 / 下架
    onSetProductStatus(e, row){
        let newStatus=row.status== 1 ? 2 :1,
            confrimTips=row.status==1 ? '确定要下架该商品？' : '确定要上架该商品？';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId:row.id,
                status:newStatus
            }).then(res=>{
                _mm.successTips(res);
                this.loadProductList();
            },err=>{

            })
        }        
    }
    render(){
        const columns = [{
            title: '商品ID',
            dataIndex: 'id',
            key:'id'
          }, {
            title: '商品信息',
            dataIndex: 'name',
            key:'name'
          }, {
            title: '价格',
            dataIndex: 'price',
            key:'price',
            render:(record,row)=>{
                return(
                    <div>￥{row.price}</div>   
                )
            }
          },{
            title: '状态',
            dataIndex: 'status',
            key:'status',
            render:(record,row)=>{
                return(
                    <div>
                        <span style={{display:'block'}}>{row.status==1 ?'在售':'已下架'}</span>
                        <button onClick={(e)=>{this.onSetProductStatus(e,row)}} style={{background:'#f0ad4e',border:'none'}}>{row.status==1 ?'下架':'上架'}</button>
                    </div> 
                )
            }
          },{
            title: '操作',
            width:200,
            render:(text,record)=>{
                return(
                    <span>
                    　　<a className="edit-data" onClick={this.editSource.bind(this,text)}>详情</a>
                    　　<a className="delete-data" onClick={this.deletSource.bind(this,text)}>编辑</a>
                    </span>
                )
            }
        }];
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Button type="primary" icon="plus" size="large">添加商品</Button>
                    </div>
                </PageTitle>  
                <ListSearch></ListSearch>
                <Table rowKey="id" pagination={false} dataSource={this.state.list} columns={columns} />
                <Pagination style={{marginTop:20}} showSizeChanger onShowSizeChange={this.onShowSizeChange} defaultCurrent={1} total={this.state.total} />,
            </div>  
        )
    }

}
export default ProductList;