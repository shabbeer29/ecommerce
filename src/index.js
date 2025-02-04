import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mobiles from './Mobiles';
import Header from './Header';
import Home from './Home';
import Fruits from './Fruits';
import HomeAppliences from './HomeAppliences';
import ThemeProvider from './ThemeProvider';
import { mobileContext } from './Mobiles';
const root = ReactDOM.createRoot(document.getElementById("root"));
function RootComponent() {
  const [mobiles, setMobiles] = useState([]);
  return(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
            <mobileContext.Provider value={{ mobiles, setMobiles }}>
          <Routes>
              <Route path='/' element={<App />} />
              {/* <Route path='/' element={ <Home/>}/> */}
              <Route path='/mobiles' element={<Mobiles />}>Mobiles</Route>
              <Route path="/homeAppliences" element={<HomeAppliences />}>
                Home Appliences
              </Route>
              <Route path="/gadgets" element={<Fruits />}>
                Gadgets
              </Route>
            </Routes>
            </mobileContext.Provider>
            
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
root.render(<RootComponent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
