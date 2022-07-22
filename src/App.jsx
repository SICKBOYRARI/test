import React from 'react';
import './App.scss';
import ModalProvider from './context/ModalContextProvider';
import Control from './components/Control/Control';

function App() {
  return (
    <ModalProvider>
      <div className="App">
        <Control />
      </div>
    </ModalProvider>
  );
}

export default App;
