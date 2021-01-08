import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import style from './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App className={style} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
