import React, { Component } from 'react';
import { DataService } from '../core/services/data.service';
import SidebarFolderComponent from './SidebarFolderComponent';
import ContentFolderComponent from './ContentFolderComponent';
//import ContentFileComponent from './ContentFileComponent';
import { Folder } from '../core/domain/folder';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  sidebarCatalogs = [];
  contentCatalogs = [];
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
      .sidebarCatalogs
      .push(
      <SidebarFolderComponent key={root.id} obj={root} dbClickHandler={this.handleFolderDoubleClick.bind(this)}></SidebarFolderComponent>
      );
    
    this.contentCatalogs.push(
      <ContentFolderComponent key={root.id} obj={root} dbClickHandler={this.handleFolderDoubleClick.bind(this)}></ContentFolderComponent>
    );

    this.setState({contentCatalogs: this.contentCatalogs});
    this.setState({sidebarCatalogs: this.sidebarCatalogs});
  }

  handleFolderDoubleClick(folder) {
    this.contentCatalogs=[];
    console.log(folder.children);
    if (folder.children) {
      folder.children.forEach(c => {
        this.contentCatalogs.push(
          <ContentFolderComponent key={c.id} obj={c} dbClickHandler={this.handleFolderDoubleClick.bind(this)}></ContentFolderComponent>
        )
      });
    }
    console.log(this.contentCatalogs);
    this.setState({ contentCatalogs: this.contentCatalogs });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          <div className="row">
          </div>
          <div className="row">
            <div className="col-md-5 col-sm-5 sidebarCatalogsTree">
              <aside id="fileTree">
                <ul>
                  {this.sidebarCatalogs}
                </ul>
              </aside>
            </div>
            <div className="col-md-5 col-sm-5 sidebarCatalogsTree">
              <ul>
                {this.contentCatalogs}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
