import React, { Component } from 'react'
import { Pagination } from 'antd'

export default class Paginations extends Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                {this.props.counts.length > 0 ?
                    (
                        <Pagination {...this.props} showSizeChanger showQuickJumper hideOnSinglePage='true' />
                    ) : ''
                }
            </div>
        )
    }
}
