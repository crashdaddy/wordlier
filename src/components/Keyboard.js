import React, { Component } from 'react';
import '../App.css';

class Keyboard extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            topRow:["Q","W","E","R","T","Y","U","I","O","P"],
            middleRow:["A","S","D","F","G","H","J","K","L"],
            bottomRow:["Z","X","C","V","B","N","M","←","Enter"]
        };
      }

     handleClick = (event) => {
        this.props.keyboardType(event.currentTarget.textContent);
      };

    render() {
     
       return (
        <div style={{display: "flex",flexWrap:"wrap",justifyContent:"center",width:"330px",textAlign:"center"}}>
        <div style={{display: "flex",flexWrap:"wrap",justifyContent:"center",width:"100%"}}>
        {this.state.topRow.map((letter,idx)=> {
          let bgColor = "#4B2A0C"
          if(this.props.usedList.includes(letter)){
            bgColor="#282c34";
          }
          if(this.props.foundList.includes(letter)){
            bgColor="blue";
          }
          if(this.props.correctList.includes(letter)){
            bgColor="green";
          }
        return(
        <div className='keyStyle' key={letter} style={{backgroundColor:bgColor}} onClick={this.handleClick} >{letter}</div>
        )})}</div>  <br/>
        <div style={{display: "flex",flexWrap:"wrap",justifyContent:"center",width:"100%"}}>
        {this.state.middleRow.map((letter,idx)=> {
          let bgColor = "#4B2A0C"
          if(this.props.usedList.includes(letter)){
            bgColor="#282c34";
          }
          if(this.props.foundList.includes(letter)){
            bgColor="blue";
          }
          if(this.props.correctList.includes(letter)){
            bgColor="green";
          }
        return(
        <div className='keyStyle' key={letter} style={{backgroundColor:bgColor}} onClick={this.handleClick} >{letter}</div>
        )})}</div><br/>
        <div style={{display: "flex",flexWrap:"wrap",justifyContent:"center",width:"100%"}}>
        {this.state.bottomRow.map((letter,idx)=> {
          let bgColor = "#4B2A0C"
          if(this.props.usedList.includes(letter)){
            bgColor="#282c34";
          }
          if(this.props.foundList.includes(letter)){
            bgColor="blue";
          }
          if(this.props.correctList.includes(letter)){
            bgColor="green";
          }
        return(
        <div className='keyStyle' key={letter} style={{backgroundColor:bgColor}} onClick={this.handleClick} >{letter}</div>
        )})}
        </div>
        </div>
       )


    }

}

export default Keyboard;