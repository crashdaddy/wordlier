import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Tile from './components/Tile';
import Keyboard from './components/Keyboard';
import Score from './components/Score';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      words:[],
      board:[
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
      ],
      correctList:[],  // right letter right spot
      foundList: [],   // right letter wrong spot
      usedList:[],     // any letter typed 
      currentRow:0,
      currentWord: '',
      currentGuess: '',
      errorMessage: String.fromCharCode(160),
      gameOver: false,
      score: 0,
      gamesPlayed: 0,
      gamesWon: 0,
      currentStreak: 0,
      longestStreak: 0
    };
  }

  getScores = () => {
      if (localStorage.getItem("score")){
      // setting the score from memory
      let oldScore = Number(localStorage.getItem("score"));
      this.setState({
      score: oldScore
      })
      } else {
      // creating the score for the first time
      localStorage.setItem("score", "0");
      }
      if (localStorage.getItem("gamesPlayed")){

      let gamesPlayed = Number(localStorage.getItem("gamesPlayed"));
      this.setState({
      gamesPlayed: gamesPlayed
      })
      localStorage.setItem("gamesPlayed",gamesPlayed.toString());
      } else {

      localStorage.setItem("gamesPlayed", "0");
      }
      if (localStorage.getItem("gamesWon")){
      let gamesWon = Number(localStorage.getItem("gamesWon"));
      this.setState({
      gamesWon: gamesWon
      })
      } else {
      localStorage.setItem("gamesWon", "0");
      }
      if (localStorage.getItem("currentStreak")){
        // setting the current streak from memory
        let currentStreak = Number(localStorage.getItem("currentStreak"));
        this.setState({
        currentStreak: currentStreak
        })
        } else {
        // creating the streak for the first time
        localStorage.setItem("currentStreak", "0");
        }
        if (localStorage.getItem("longestStreak")){
          // setting the current streak from memory
          let longestStreak = Number(localStorage.getItem("longestStreak"));
          this.setState({
          longestStreak: longestStreak
          })
          } else {
          // creating the streak for the first time
          localStorage.setItem("longestStreak", "0");
          }
}

  clearScores = () => {
    localStorage.setItem("score","0");
    localStorage.setItem("gamesPlayed","0");
    localStorage.setItem("gamesWon","0");
    localStorage.setItem("currentStreak","0");
    localStorage.setItem("longestStreak","0");
    this.setState({
      gamesPlayed:0,
      gamesWon:0,
      score:0,
      currentStreak: 0,
      longestStreak: 0
    })
  }
 
  componentDidMount = () => {
    this.downloadDictionary();

    this.getScores();
  }

  async downloadDictionary() {
    let response = await fetch("5LetterWords.txt");
      
    if(response.status !== 200) {
      throw new Error("Server Error");
    }
      
    // read response stream as text
    let text_data = await response.text();
    let wordList = text_data.split("\n");
 
    let maxWords = wordList.length;
    let wordNumber = getRandomInt(0,maxWords);
    this.setState({
      words: wordList,
      currentWord:wordList[wordNumber].toUpperCase()
    });
  }

  checkword = (wordToCheck) => {
    let wordList = this.state.words;
    let word = wordToCheck.toLowerCase();
    if (wordList.includes(word)){
      return(true);
    }
    else {
      this.setState({
        errorMessage:"That word is not in my dictionary"
      })

    }
  }

  submitWord = (wordSubmitted) => {
    let guessBox = document.getElementById("guessWordBox");
    if(!this.state.gameOver){
     if (this.checkword(wordSubmitted)){
     let currentBoard = [...this.state.board];
     let currentWord = this.state.currentWord;
     let boardRow = this.state.currentRow;
     let errorMessage= this.state.errorMessage;
     let tileColor="white";
     let foundList = this.state.foundList;
     let usedList = this.state.usedList;
     let correctList = this.state.correctList;
     let currentScore = this.state.score;
     let gamesWon = this.state.gamesWon;
     let gamesPlayed = this.state.gamesPlayed;
     let currentStreak = this.state.currentStreak;
     let longestStreak = this.state.longestStreak; 
     let newRow = [];
     for(let i =0; i<wordSubmitted.length;i++){
       usedList.push(wordSubmitted[i]);
        if(currentWord.includes(wordSubmitted[i])){
        tileColor="blue";
        foundList.push(wordSubmitted[i])
        if(currentWord[i]===wordSubmitted[i]){
          tileColor="lightgreen";
          correctList.push(wordSubmitted[i]);
        }
      }
      newRow[i]={
        letter: wordSubmitted[i],
        status: tileColor
      }
      tileColor="white";
     }
     
     currentBoard[boardRow]=newRow;
     boardRow++;
     let gameOver = false
     if(boardRow>5) {
       gameOver=true;
       errorMessage="Bad Luck. The word was "+ currentWord + ". Play again!";
       if(wordSubmitted!==currentWord){
       gamesPlayed++;
       currentStreak=0;
       }
     }
     if(wordSubmitted===currentWord){
       errorMessage="You WIN!"
       gameOver=true;
       switch (boardRow-1) {
        case 0:
          currentScore+= 1000;
          break;
        case 1:
          currentScore+= 200;
          break;
        case 2:
          currentScore+= 100;
          break;
        case 3:
          currentScore+= 60;
          break;
        case 4:
          currentScore+= 45;
          break;
        case 5:
          currentScore+= 30;
          break;
        default:
          break;
      }
      currentStreak++;
      if(currentStreak>longestStreak) {
        longestStreak= currentStreak;
      }
      gamesWon++;
      gamesPlayed++;
     }
      localStorage.setItem("gamesPlayed",gamesPlayed.toString());      
      localStorage.setItem("score",currentScore.toString());
      localStorage.setItem("gamesWon",gamesWon.toString());
      localStorage.setItem("currentStreak",currentStreak.toString());
      localStorage.setItem("longestStreak",longestStreak.toString());
     this.setState({
       board:currentBoard,
       currentRow:boardRow,
       gameOver:gameOver,
       errorMessage: errorMessage,
       usedList:usedList,
       foundList:foundList,
       correctList:correctList,
       score: currentScore,
       gamesWon: gamesWon,
       gamesPlayed:gamesPlayed,
       currentStreak: currentStreak,
       longestStreak:longestStreak
     })} 
     guessBox.value='';
    }
  }

  handleChange = (event) => {
    event.target.value=event.target.value.toUpperCase();
    if(event.key==="Enter"){
      console.log("himom")
      this.keyboardType("Enter");
    }
  }


  keyboardType = (keyClicked) => {
   this.setState({
     errorMessage:String.fromCharCode(160)
   })
   let errorMessage = String.fromCharCode(160);
   let currentGuess= '';
   let gameOver = this.state.gameOver;
   let guessBox = document.getElementById("guessWordBox");
   if(guessBox && !gameOver) {
    if(keyClicked==="Enter" && guessBox.value.length>=5){
      
      this.submitWord(guessBox.value);
    } else {
    if(guessBox.value.length<=5){
     if(keyClicked==="←"){
      guessBox.value = guessBox.value.substring(0, guessBox.value.length - 1);
      currentGuess=guessBox.value; 
     }else 
     if(keyClicked!=="Enter"){guessBox.value+=keyClicked.toUpperCase();}

     currentGuess=guessBox.value;
    }
     else {
     errorMessage="We're only looking for 5-digit words";
     currentGuess='';
     guessBox.value='';
     this.setState({
      errorMessage:errorMessage
    })
    } 
    }
    }
  
 this.setState({
        currentGuess:currentGuess
      })
  }

  render(){
    console.log(this.state.currentWord);

  return (
    <div className="App">
     
      <header className="App-header">
         <Header errorMessage={this.state.errorMessage}/>
        <div style={{width:'180px'}}>
              {this.state.board.map((board,idx)=>{
              return (
              <div key = {idx}>
                  {board.map((row,idx)=>{
                  return(
                  <div><Tile letter={row.letter} color={row.status} key={idx}/></div>
                  )
                  })
                  }  
              </div>
              )
              })}
        </div>
          
          <input style={{textTransform:'uppercase'}} type="text" id="guessWordBox" defaultValue={this.state.currentGuess} maxlength="5" className='inputBox' onKeyDown={this.handleChange} />
          
          <Keyboard keyboardType={this.keyboardType} usedList={this.state.usedList} foundList={this.state.foundList} correctList={this.state.correctList} />
          <Score score={this.state.score} gamesWon={this.state.gamesWon} gamesPlayed={this.state.gamesPlayed} clearScores={this.clearScores} currentStreak={this.state.currentStreak} longestStreak={this.state.longestStreak} />
      </header>
    </div>
  );
  }
}

export default App;
