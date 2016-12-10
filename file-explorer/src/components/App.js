import React, {Component} from 'react';
import {DataService} from '../core/services/data.service';
import FolderComponent from './FolderComponent'
import {Folder} from '../core/domain/folder';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  catalogs = [];
  name = 'Taras';

  constructor(dataService) {
    super();
    dataService = new DataService();
    dataService
      .get()
      .then(data => {
        this.initTree(data)
      }, err => console.log(err));
  }

  initTree(data) {
    var root = new Folder(JSON.parse(data));

    this
      .catalogs
      .push(
        <FolderComponent key={root.id} children={root.children} name={root.name}></FolderComponent>
      );

    this.setState(this.catalogs);

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <aside id="fileTree">
          <ul>
            {this.catalogs}
          </ul>
        </aside>
      </div>
    );
  }
}



export default App;
