import { Button } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import "../assets/styles/keyboardComponent.css";

//Component de tecla
const Key = (props) => {
  const [disabled, setDisabled] = React.useState(false);
  const [color, setColor] = React.useState("#f7bb4d");
  let dimension = "2rem";
  return (
    <Button
      variant="contained"
      disabled={disabled}
      style={{
        maxHeight: dimension,
        minHeight: dimension,
        maxWidth: dimension,
        minWidth: dimension,
        margin: "0.1rem",
        backgroundColor: color,
        color: "black"
      }}
      onClick={() => {
        if (props.gameIsOver) return;

        //Errou letra
        if (props.word.indexOf(props.letter) === -1) {
          props.setSlideIn(false);
          setTimeout(() => {
            props.setSlideIn(true);
            props.dispatch({ type: "hangmanStages/shift" });
          }, 100);
        } else {
          //Acertou letra
          props.dispatch({
            type: "gameInfo/removeLetter",
            letter: props.letter,
          });
        }

        //props.dispatch({ type: "gameInfo/removeLetter", letter: props.letter });
        setDisabled(true);
        setColor("#D5D5D5");
      }}
    >
      {props.letter}
    </Button>
  );
};

//Component do teclado
const Keyboard = connect(mapStateToProps)((props) => {
  return (
    <div className="keyboardDiv">
      {props.letters.map((letter, index) => {
        return (
          <Key
            letter={letter}
            key={index}
            dispatch={props.dispatch}
            word={props.gameInfoReducer.word}
            setSlideIn={props.setSlideIn}
            gameIsOver={props.gameResult !== ""}
          />
        );
      })}
    </div>
  );
});

function mapStateToProps(state) {
  return state;
}

export default Keyboard;
