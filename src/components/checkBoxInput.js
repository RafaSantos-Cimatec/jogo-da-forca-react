import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";

import "../assets/styles/checkBoxInput.css";
import "../assets/styles/animations.css";
import { Fade } from "@mui/material";

//Função que valida entrada
const inputIsValid = (input) => {
  if (input.startsWith(" ")) return false;

  let regex = /^[-a-záâãéêíóôõúç ]+$/i;
  if (input.slice(-1) === "-" || input === "" || input.search(regex) !== -1) {
    return true;
  }
  return false;
};

//Component que retorna uma checkbox que, ao ser checada, mostra um input
const CheckBoxInput = (props) => {
  return (
    <div className="checkBoxInput">
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.isChecked}
              onChange={(event) => {
                props.setIsChecked(event.target.checked);
                props.inputErrState.setState(false);
                if (!event.target.checked) {
                  props.setInput("");
                }
              }}
            />
          }
          label={props.checkBoxLabel}
        />
      </FormGroup>
      <Fade in={props.isChecked} mountOnEnter unmountOnExit>
        <TextField
          type="password"
          label={props.inputPlaceholder}
          variant="filled"
          inputProps={{
            style: { fontSize: "0.9rem" },
          }}
          error={props.inputErrState.state}
          helperText={props.inputErrState.state ? "Palavra inválida" : null}
          value={props.input}
          onChange={(event) => {
            props.inputErrState.setState(false);
            
            let input = event.target.value;
            if (inputIsValid(input)) {
              props.setInput(input.toLowerCase());
            }
          }}
        />
      </Fade>
    </div>
  );
};

export default CheckBoxInput;
