import React from 'react'
import { Table } from 'antd'

export default class TablePage extends React.Component{
    render(){
        return(
            <Table  size="middle" pagination={false} {...this.props} bordered />
        )
    }
}