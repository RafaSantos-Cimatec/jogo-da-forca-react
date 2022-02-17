import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  gameInfoReducer: function (
    state = {
      word: null,
      playerName: null,
      gameLetters: [],
      remainingLetters: [],
    },
    action
  ) {
    switch (action.type) {
      case "gameInfo/set":
        return {
          word: action.word,
          playerName: action.playerName,
          gameLetters: action.gameLetters,
          remainingLetters: action.remainingLetters,
        };
      case "gameInfo/removeLetter":
        return {
          ...state,
          remainingLetters: state.remainingLetters.filter(
            (val) => val !== action.letter
          ),
        };
      case "gameInfo/showWord":
        return {
          ...state,
          remainingLetters: [],
        };
      case "reset":
        return {
          word: null,
          playerName: null,
          gameLetters: [],
          remainingLetters: [],
        };
      default:
        return state;
    }
  },
  hangmanStagesReducer: function (state = { value: [] }, action) {
    switch (action.type) {
      case "hangmanStages/concat":
        return { value: state.value.concat(action.newArray) };
      case "hangmanStages/shift":
        if (state.value.length === 1) return state;
        return { value: state.value.slice(1, state.value.length) };
      case "reset":
        return { value: [] };
      default:
        return state;
    }
  },
});

function storeConfig() {
  return createStore(reducers);
}

export default storeConfig;
