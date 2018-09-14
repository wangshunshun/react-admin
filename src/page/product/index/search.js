import React        from 'react';
import {Select,Row,Col,Input,Button } from 'antd';
const Option = Select.Option;
class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchType:'productId',
        }
    }
    // 数据变化的时候
    onValueChange(e){
       this.setState.searchType=e;
    }
    render(){
        return(
            <Row style={{marginBottom:20}}>
                <Col span={24}>
                <Select defaultValue="productId" style={{ width: 180 }} onChange={(e)=>this.onValueChange(e)}>
                    <Option value="productId">按商品ID查询</Option>
                    <Option value="productName">按商品名称查询</Option>
                </Select>
                <Input style={{width:180,marginLeft:10}} placeholder="关键字" />
                <Button style={{marginLeft:10}} type="primary">搜索</Button>
                </Col>
            </Row>
        )
    }
}
export default ListSearch;