import Button from "@mui/material/Button";
import { connect } from "react-redux";
import "../assets/styles/buttonComponent.css";

//Component de um botão personalizado
const ButtonComponent = (props) => {
  return (
    <Button
      variant="contained"
      onClick={props.onClick}
      style={{
        backgroundColor: "#f7bb4d",
        color: "black",
        height: "2.7rem",
        fontSize: "1rem",
      }}
    >
      {props.value}
    </Button>
  );
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(ButtonComponent);
