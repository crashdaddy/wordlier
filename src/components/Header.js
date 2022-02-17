import React, { Component } from 'react';

class Header extends Component {


    render() {
       return (
        <div>
        <div style={{fontSize:'xx-large'}}> 🆆 🅾 🆁 🅳 🅻 🅴 🆁 <br/></div>
        <div style={{color:'red'}}>{this.props.errorMessage}</div>
        </div>
       )


    }

}

export default Header;

