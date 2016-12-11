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
        <FolderComponent key={root.id} obj={root}></FolderComponent>
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
        <div className="container-fluid">
          <div className="row">
          </div>
          <div className="row">
          <div className="col-sm-5">
          <aside id="fileTree">
            <ul>
              {this.catalogs}
            </ul>
          </aside>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
