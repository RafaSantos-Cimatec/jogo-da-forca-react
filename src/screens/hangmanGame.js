import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Fade, Slide, Zoom } from "@mui/material";

import "../assets/styles/hangmanGame.css";
import "../assets/styles/animations.css";

import ButtonComponent from "../components/buttonComponent";
import LettersComponent from "../components/lettersComponent";
import Keyboard from "../components/keyboardComponent";

import stage0 from "../assets/img/stage0.png";

function HangmanGame(props) {
  const navigate = useNavigate();
  const [hangmanStage, setHangmanStage] = React.useState(stage0);
  const [gameResult, setGameResult] = React.useState("");
  const [slideIn, setSlideIn] = React.useState(true);
  const [showWord, setShowWord] = React.useState(false);
  const gameInfo = props.gameInfoReducer;
  const hangmanStages = props.hangmanStagesReducer;
  const dispatch = props.dispatch;

  const getAlphabetLetters = () => {
    let letters = [];
    for (let letterCode = 97; letterCode < 123; letterCode++) {
      letters.push(String.fromCharCode(letterCode));
    }
    return letters;
  };
  const gameIsOver = () => {
    return gameResult !== "";
  };

  useEffect(() => {
    if (!gameInfo.word) {
      navigate("/");
      return;
    }

    setHangmanStage(hangmanStages.value[0]);
    if (hangmanStages.value.length <= 1) {
      //Perdeu o jogo
      if (gameResult === "") setShowWord(true);
      dispatch({ type: "gameInfo/endGame" });
      setGameResult(`Que pena ${gameInfo.playerName}, você perdeu :(`);
    } else if (gameInfo.remainingLetters.length === 0) {
      //Ganhou o jogo
      dispatch({ type: "gameInfo/endGame" });
      setGameResult(`Parabéns ${gameInfo.playerName}, você ganhou :)`);
    }
  }, [
    gameInfo.word,
    gameInfo.remainingLetters.length,
    gameInfo.playerName,
    hangmanStages.value,
    navigate,
    gameResult,
    dispatch,
  ]);

  if (!gameInfo.word) return <></>;
  return (
    <div className="container">
      <div className="hangmanDiv">
        <header className="header">
          <ButtonComponent
            value="Voltar ao menu"
            type="button"
            onClick={() => {
              props.dispatch({ type: "reset" });
              navigate("/");
            }}
          />
          <h1 style={{ fontSize: "1.3rem" }}>Jogador: {gameInfo.playerName}</h1>
        </header>
        <div className="gameDiv">
          <Slide direction="right" in={slideIn}>
            <img src={hangmanStage} alt="hangmanStage" />
          </Slide>
          <div>
            <LettersComponent />
          </div>
          <div className="showWordDiv">
            <Fade in={showWord} mountOnEnter unmountOnExit>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#f7bb4d",
                  color: "black",
                  height: "2.7rem",
                  fontSize: "1rem",
                }}
                onClick={() => {
                  dispatch({ type: "gameInfo/showWord" });
                  setShowWord(false);
                }}
              >
                Mostrar palavra
              </Button>
            </Fade>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Keyboard
            letters={getAlphabetLetters()}
            setSlideIn={setSlideIn}
            gameResult={gameResult}
          />
          <Keyboard
            letters={["á", "â", "ã", "é", "ê", "í", "ó", "ô", "õ", "ú", "ç"]}
            setSlideIn={setSlideIn}
            gameResult={gameResult}
          />
        </div>
        <Zoom in={gameIsOver()} style={{ transitionDelay: "500ms" }}>
          <div className="showResultDiv">
            <h3>{gameResult}</h3>
          </div>
        </Zoom>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(HangmanGame);
