import React from 'react';
import './App.css';

import {ConfigTable} from "../table/ConfigTable"
import {Header} from "../design/Header"
import { TableContextProvider } from '../table/TableContext';
import { AddRowButton } from '../buttons/Buttons';


function App() {
  return (
    <div className="App">
      <Header/>
      <div>
        <TableContextProvider> 
          <ConfigTable/> 
          <AddRowButton/>
        </TableContextProvider>    
      </div>
    </div>
  );
}

export default App;
