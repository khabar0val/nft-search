import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Button } from './Components/Button';
import { Input } from './Components/Input';
import { CardNFT } from './Components/CardNFT/CardNFT';

function App() {
  return (
    <div className="App">
      <div className='block-search'>
        <Input /> 
      </div>
      <div className='block-cards'>
        <CardNFT />
      </div>
    </div>
  );
}

export default App;
