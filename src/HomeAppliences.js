import "bootstrap/dist/css/bootstrap.min.css";
import { useReducer } from "react";
import { Button, Container } from "react-bootstrap";
const countChange = (state, action) => {
    switch (action.type) {
      case "increment":
        return { count: state.count + 1 };
      case "decrement":
        return { count: state.count - 1 };
      default:
        return state;
    }
  };
function HomeAppliences() {
  const [state, dispatch] = useReducer(countChange, { count: 0 });
  return (
    <div>
      <div className="mt-5">
        <Container>
          <h3>
            <span className="ms-3">Home Appliences</span>
          </h3>
          <h1>Count : { state.count }</h1>
          <Button onClick={() => dispatch({type:'increment'})}>Add</Button>
          <Button onClick={() => dispatch({type:'decrement'})} disabled={state.count === 0}>Decrement</Button>
        </Container>
      </div>
    </div>
  );
}

export default HomeAppliences;
