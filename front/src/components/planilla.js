//import logo from './logo.svg';
//import './App.css';
//import { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import React,{ Component }   from 'react'
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import {faEdit,faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Modal  ,ModalBody,ModalFooter,ModalHeader} from 'reactstrap';

const url = "https://localhost:4201/api/planilla-mayor/"
class Planilla extends Component{
    state ={
        data:[]
    }
    getPlanilla=()=>{
        axios.get(url).then(response=>{
            
            console.log('Here',response.data)
        })
    }
    // componentDidmount(){
    //     this.getPlanilla();
    // }
    render(){
        return
    }
}
// function Planilla() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default Planilla;
