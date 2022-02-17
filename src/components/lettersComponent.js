import React from "react";
import { CSSTransition } from "react-transition-group";
import "../assets/styles/lettersComponent.css";
import "../assets/styles/animations.css";
import { connect } from "react-redux";

//Component de letra do jogo
const LetterComponent = ({ children, ...props }) => {
  const nodeRef = React.useRef(null);
  const getLetter = (letter) => {
    if (letter === " " || letter === "-") return letter;
    if (props.remainingLetters.indexOf(letter) === -1) return letter;

    return "_";
  };
  return (
    <div className="letterDiv">
      <CSSTransition
        nodeRef={nodeRef}
        in={getLetter(props.letter) !== "_"}
        timeout={500}
        classNames="fade"
      >
        <p ref={nodeRef} style={{ fontSize: "2.5rem" }}>
          {getLetter(props.letter)}
        </p>
      </CSSTransition>
    </div>
  );
};

//Component das letras do jogo
const LettersComponent = connect(mapStateToProps)((props) => {
  return (
    <div className="lettersDiv">
      {props.gameInfoReducer.gameLetters.map((letter, index) => {
        return (
          <LetterComponent
            letter={letter}
            key={index}
            remainingLetters={props.gameInfoReducer.remainingLetters}
          />
        );
      })}
    </div>
  );
});

function mapStateToProps(state) {
  return state;
}

export default LettersComponent;
