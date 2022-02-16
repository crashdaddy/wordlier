import React, { Component } from 'react';

class Keyboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            alphabet:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","←","Enter"]
        };
      }

     handleClick = (event) => {
        this.props.keyboardType(event.currentTarget.textContent);
      };

    render() {
       return (
        <div style={{width:"300px",textAlign:"center",marginTop:'5px'}}>
        {this.state.alphabet.map((letter,idx)=> 
        <div style={{display:'inline-block',marginTop:'4px',paddingLeft:'4px',paddingRight:'4px',height:'30px',overflow:'auto',float:'left',border:'1px solid white',marginRight:'8px',margintTop:'4px'}} key={letter} onClick={this.handleClick} >{letter}</div>
        )}
        </div>
       )


    }

}

export default Keyboard;