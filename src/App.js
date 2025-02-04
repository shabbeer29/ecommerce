import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from "./Home";
import { useMobile } from "./Mobiles";
function App() {
  const { mobiles} = useMobile();
  return (
    <div>
      {
        mobiles.map((mobile) => (
          <li key={mobile.id}>{ mobile.name}</li>
        ))
      }
          <Home/>
      </div>
  );
}
export default App;
