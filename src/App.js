import React, { Component } from 'react';
import './App.css';
import Header from './components/Header';
import Tile from './components/Tile';
import Keyboard from './components/Keyboard';

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
      currentRow:0,
      currentWord: '',
      currentGuess: '',
      errorMessage: ''
    };
  }

 
  componentDidMount = () => {
    this.downloadFile();
    // let boardArray = [];
    // for(let i=0;i<30;i++){
    //   boardArray[i]={
    //     status: "blank",
    //     letter: ""
    //   }
    // }
    // this.setState({
    //   board:boardArray
    // })
    

  }

  async downloadFile() {
    let response = await fetch("5LetterWords.txt");
      
    if(response.status !== 200) {
      throw new Error("Server Error");
    }
      
    // read response stream as text
    let text_data = await response.text();
    let wordList = text_data.split("\n");
    this.setState({
      words: wordList
    });
    let maxWords = this.state.words.length;
    let wordNumber = getRandomInt(0,maxWords);
    this.setState({currentWord:this.state.words[wordNumber].toUpperCase()});
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
     if (this.checkword(wordSubmitted)){
     let currentBoard = [...this.state.board];
     let currentWord = this.state.currentWord;
     let boardRow = this.state.currentRow;
     let tileColor="white";
     let newRow = [];
     for(let i =0; i<wordSubmitted.length;i++){
       console.log(currentWord[i],wordSubmitted[i])
        if(currentWord.includes(wordSubmitted[i])){
        tileColor="blue";
        if(currentWord[i]===wordSubmitted[i]){
          tileColor="lightgreen";
        }
      }
      newRow[i]={
        letter: wordSubmitted[i],
        status: tileColor
      }
      tileColor="white";
     }
     
     currentBoard[boardRow]=newRow;
     console.log(currentBoard);
     boardRow++;
     this.setState({
       board:currentBoard,
       currentRow:boardRow
     })} 
  }

  keyboardType = (keyClicked) => {
   let errorMessage = '';
   let currentGuess= '';
   let guessBox = document.getElementById("guessWordBox");
   if(guessBox) {
    if(keyClicked==="Enter" && guessBox.value.length>=5){
      
      this.submitWord(guessBox.value);
    } else {
    if(guessBox.value.length<6){
     if(keyClicked==="←"){
      guessBox.value = guessBox.value.substring(0, guessBox.value.length - 1);
      currentGuess=guessBox.value; 
     }else 
     guessBox.value+=keyClicked;
     currentGuess=guessBox.value;
    }
     else {
     errorMessage="We're only looking for 5-digit words";
     currentGuess=''
    } 
    }
    }
  
 this.setState({
        errorMessage:errorMessage,
        currentGuess:currentGuess
      })
  }

  render(){
    console.log(this.state.currentWord);
  return (
    <div className="App">
     
      <header className="App-header">
         <Header errorMessage={this.state.errorMessage}/><br/>
        <div style={{width:'180px'}}>
        {this.state.board.map((board,idx)=>{
        return (
          <div>
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
          
          <input type="text" id="guessWordBox" value={this.state.currentGuess} maxlength="5" style={{marginTop:'5px'}} />
<br />
          <Keyboard keyboardType={this.keyboardType} />
      </header>
    </div>
  );
  }
}

export default App;
