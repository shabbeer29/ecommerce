import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import {
  RouterProvider,
  createBrowserRouter,
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from "./Header";
import HomeAppliences from "./HomeAppliences";
import ShopByCategory from "./ShopByCategory";
import HomeSlider from "./HomeSlider";
import Fruits from "./Fruits";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: "/",
//         element: <Header />
//       },
//       {
//         path: "/homeappliences",
//         element: <HomeAppliences />
//       },
//       {
//         path: "/shopbycategory",
//         element: <ShopByCategory />
//       },
//       {
//         path: "/homeslider",
//         element: <HomeSlider />
//       },
//       {
//         path: "/fruits",
//         element: <Fruits />
//       }
//     ]
//   }
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<App />}>
        Home
      </Route>
      <Route path="/homeAppliences" element={<HomeAppliences />}>
        Home Appliences
      </Route>
      {/* <Route path="/mobiles" element={<Mobiles />}>
        Mobiles
      </Route>
      <Route path="/tvs" element={<TVS />}>
        TV's
      </Route> */}
      <Route path="/homeAppliences" element={<HomeAppliences />}>
        Home Appliences
      </Route>
      <Route path="/gadgets" element={<Fruits />}>
        Fruits
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
