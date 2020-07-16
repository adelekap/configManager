import React from 'react';
import './App.css';

import {ConfigTable} from "../table/ConfigTable"
import { TableContextProvider } from '../table/TableContext';

function App() {
  return (
    <div className="App">
      <div>
        <TableContextProvider> 
          <ConfigTable/> 
        </TableContextProvider>    
      </div>
    </div>
  );
}

export default App;
