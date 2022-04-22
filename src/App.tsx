import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from './Components/common/Button';
import { Input } from './Components/common/Input';
import { CardNFT } from './Components/common/CardNFT/CardNFT';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main } from './Pages/Main';
import { Check } from './Pages/Check/Check';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/check' element={<Check />}/>
        </Routes>
      </BrowserRouter>
      {/* <div className='block-search'>
        <Input /> 
      </div>
      <div className='block-cards'>
        <CardNFT />
      </div> */}

      <div>
        
      </div>
    </div>
  );
}

export default App;
