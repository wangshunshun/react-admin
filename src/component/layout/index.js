import React from 'react';

import NavTop from '../nav-top/index.js';
import NavSide from '../nav-slide/index.js';

class Layout extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id="wrapper">
                <NavTop />
                <NavSide />
                {this.props.children}
            </div>
        );
    }
}

export default Layout;
