import * as React from 'react';
import Hometown from './Hometown'
import { HashRouter } from 'react-router-dom';



function App (props) {
  return (
    <div>
      <HashRouter>
        <Hometown />
      </HashRouter>
    </div>
  );
};

export default App