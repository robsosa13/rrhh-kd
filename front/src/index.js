import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components/Index'

//import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

//const element =<h1>Hello asdasd!! </h1>
const container = document.getElementById('root')


ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  // document.getElementById('root')
  <Index />,container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
