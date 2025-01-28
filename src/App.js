import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import HomeSlider from "./HomeSlider";
import ShopByCategory from "./ShopByCategory";

function App() {
  const a = [1, 2, 3, 4];
  return (
    <div>
      <Header />
      {/*<HomeSlider />*/}
      <ShopByCategory />
    </div>
  );
}

export default App;
