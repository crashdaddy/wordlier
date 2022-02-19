import React, { Component } from 'react';

class Header extends Component {


    render() {
       return (
        <div>
        <div style={{fontSize:'2.5em'}}> 🆆 🅾 🆁 🅳 🅻 🅴 🆁 <br/></div>
        <div style={{color:'red'}}>{this.props.errorMessage}</div>
        </div>
       )


    }

}

export default Header;

