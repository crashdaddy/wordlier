import React, { Component } from 'react';
import '../App.css';
import deleteIcon from './deleteScores.png';

class Score extends Component {
    
    render() {
     
       return (
        <div style={{verticalAlign:"middle",fontSize:"24px"}}>
            Score: {this.props.score} Played: {this.props.gamesPlayed} Won: {this.props.gamesWon} <img src={deleteIcon} alt= "Delete Scores?" style={{display:"inline-block",verticalAlign:"middle",width:"32px",height:"32px",paddingBottom:"8px"}} onClick={this.props.clearScores} />
        </div>
       )


    }

}

export default Score;