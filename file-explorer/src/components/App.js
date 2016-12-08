import React, {Component} from 'react';
import { User } from '../core/domain/user';
import { DataService } from '../core/services/data.service';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  constructor(){
    super();
    var dataService = new DataService();
    dataService.get().then(data => console.log(data), 
      err => console.log(err));
    var user = new User('Andriy', 18);
    console.log(user);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React1</h2>
        </div>
        <p className="App-intro">
          To get started, edit
          <code>src/App.js</code>
          and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
