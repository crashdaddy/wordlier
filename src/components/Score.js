import React, { Component } from 'react';
import '../App.css';
import deleteIcon from './deleteScores.png';

class Score extends Component {
    
    render() {
     let percentWon = parseFloat((this.props.gamesWon/this.props.gamesPlayed)*100).toFixed(1);

     if (isNaN(percentWon)) {percentWon=0;}
       return (
        <div style={{verticalAlign:"middle",fontSize:"20px",float:'left',display:'inline-block'}}>
            <div style={{float:'left'}}>
            Score: {this.props.score} Played: {this.props.gamesPlayed} Won: {this.props.gamesWon} -- {percentWon}% <br/>
            Current Streak: {this.props.currentStreak} Longest Streak: <font style={{color:'orange'}}>{this.props.longestStreak} </font>
            </div>
            <div style={{float:'left'}}>
            <img src={deleteIcon} alt= "Delete Scores?" title="Delete Scores" style={{display:"inline-block",verticalAlign:"middle",width:"48px",height:"48px",paddingBottom:"8px"}} onClick={this.props.clearScores} />
            </div>
        </div>
       )


    }

}

export default Score;