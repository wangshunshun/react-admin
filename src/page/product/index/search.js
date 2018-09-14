import React        from 'react';
import {Select,Row,Col,Input,Button } from 'antd';
const Option = Select.Option;
class ListSearch extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchType:'productId',
            searchKeyword   : ''
        }
    }
    // 改变select搜索条件
    handleChange(e){
        this.setState({
            searchType:e
        })
    }
    // 点击搜索按钮的时候
    onSerach(){
        this.props.onSearch(this.state.searchType, this.state.searchKeyword);
        console.log(this.state.searchType, this.state.searchKeyword)
    }
    // 输入关键字后按回车，自动提交
    onSearchKeywordKeyUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return(
            <Row style={{marginBottom:20}}>
                <Col span={24}>
                    <Select name="searchType" defaultValue="productId" style={{ width: 180 }} onChange={(e)=>{this.handleChange(e)}}>
                        <Option value="productId">按商品ID查询</Option>
                        <Option value="productName">按商品名称查询</Option>
                    </Select>
                    <Input  name="searchKeyword" value={this.state.searchInfo} style={{width:180,marginLeft:10}} placeholder="请输入查询商品id或名称" onChange={(e)=>{this.handleChange(e)}} onKeyUp={(e)=>{this.onSearchKeywordKeyUp(e)}}/>
                    <Button style={{marginLeft:10}} onClick={()=>{this.onSerach()}} type="primary">搜索</Button>
                    <Button style={{marginLeft:10}} type="primary">清空</Button>
                </Col>
            </Row>
        )
    }
}
export default ListSearch;