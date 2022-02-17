import React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";

import "../assets/styles/setup.css";

import CheckBoxInput from "../components/checkBoxInput";
import ButtonComponent from "../components/buttonComponent";
import getWord from "../words";

import stage0 from "../assets/img/stage0.png";
import stage1 from "../assets/img/stage1.png";
import stage2 from "../assets/img/stage2.png";
import stage3 from "../assets/img/stage3.png";
import stage4 from "../assets/img/stage4.png";
import stage5 from "../assets/img/stage5.png";
import finalStage from "../assets/img/finalStage.png";

function Setup(props) {
  const [playerName, setPlayerName] = React.useState("");
  const [word, setWord] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [playerFieldErr, setPlayerFieldErr] = React.useState(false);
  const [wordFieldErr, setWordFieldErr] = React.useState(false);
  const navigate = useNavigate();

  //função que realiza evento de clicar no botão de iniciar jogo
  const handleSubmit = (event) => {
    event.preventDefault();

    let isAuthenticated = true;
    //Autentica a palavra específica, caso tenha sido digitada
    if (isChecked) {
      if (word.search(/[^- ]+/) === -1) {
        //alert("palavra inválida");
        setWordFieldErr(true);
        setWord("");
        isAuthenticated = false;
      }
    }
    //Autentica o nome do jogador
    if (playerName.search(/[^ ]+/) === -1) {
      //alert("Nome inválido");
      setPlayerFieldErr(true);
      setPlayerName("");
      isAuthenticated = false;
    }
    if (!isAuthenticated) return;

    let gameWord = isChecked ? word : getWord();
    let remainingLetters = [];
    let gameLetters = [];
    for (let i = 0, letter; i < gameWord.length; i++) {
      letter = gameWord[i];
      gameLetters.push(letter);
      if (letter !== " " && letter !== "-") {
        if (!remainingLetters.find((val) => val === letter))
          remainingLetters.push(letter);
      }
    }
    remainingLetters.sort();
    props.dispatch({
      type: "gameInfo/set",
      playerName: playerName,
      word: gameWord,
      remainingLetters: remainingLetters,
      gameLetters: gameLetters,
    });
    props.dispatch({
      type: "hangmanStages/concat",
      newArray: [stage0, stage1, stage2, stage3, stage4, stage5, finalStage],
    });
    navigate("/game");
  };

  return (
    <div className="container">
      <div className="setupDiv">
        <h1 className="title">Jogo da Forca: React</h1>
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <TextField
            label="Nome do Jogador"
            variant="filled"
            inputProps={{ maxLength: 15 }}
            value={playerName}
            error={playerFieldErr}
            helperText={playerFieldErr ? "Nome inválido" : null}
            onChange={(event) => {
              setPlayerName(event.target.value);
              setPlayerFieldErr(false);
            }}
          />
          <CheckBoxInput
            checkBoxLabel="Jogar com uma palavra específica"
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            inputPlaceholder="Palavra"
            input={word}
            setInput={setWord}
            inputType="text"
            maxLength={20}
            handleSubmit={handleSubmit}
            inputErrState={{ state: wordFieldErr, setState: setWordFieldErr }}
          />
          <ButtonComponent
            onClick={(event) => handleSubmit(event, navigate)}
            value="Iniciar Jogo"
          />
        </form>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Setup);
