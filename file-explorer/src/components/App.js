import React, {Component} from 'react';
import {DataService} from '../core/services/data.service';
import SidebarFolderComponent from './SidebarFolderComponent';
import ContentFolderComponent from './ContentFolderComponent';
import ContentFileComponent from './ContentFileComponent';
import PopupComponent from './PopupComponent';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  sidebarCatalogs = [];
  contentCatalogs = [];
  showModal = false;

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
    var root = JSON.parse(data);

    this
      .sidebarCatalogs
      .push(
        <SidebarFolderComponent
          key={root
          .name
          .toString()}
          obj={root}
          dbClickHandler={this
          .handleFolderDoubleClick
          .bind(this)}></SidebarFolderComponent>
      );

    this
      .contentCatalogs
      .push(
        <ContentFolderComponent
          key={root
          .name
          .toString()}
          obj={root}
          dbClickHandler={this
          .handleFolderDoubleClick
          .bind(this)}></ContentFolderComponent>
      );

    this.setState({contentCatalogs: this.contentCatalogs});
    this.setState({sidebarCatalogs: this.sidebarCatalogs});
  }

  handleFolderDoubleClick(folder) {
    this.contentCatalogs = [];
    if (folder.children) {
      folder
        .children
        .forEach(c => {
          if (c.children) {
            this
              .contentCatalogs
              .push(
                <ContentFolderComponent
                  key={c
                  .name
                  .toString()}
                  obj={c}
                  dbClickHandler={this
                  .handleFolderDoubleClick
                  .bind(this)}></ContentFolderComponent>
              );
          } else {
            this
              .contentCatalogs
              .push(
                <ContentFileComponent
                  key={c
                  .name
                  .toString()}
                  obj={c}
                  handleFileDoubleClick={this
                  .handleFileDoubleClick
                  .bind(this)}></ContentFileComponent>
              );
          }
        });
    }
    this.setState({contentCatalogs: this.contentCatalogs});
  }

  handleFileDoubleClick(file) {
    console.log("sadas");
    this.showModal = true;
    this.setState({showModal: this.showModal})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h2>Welcome to React</h2>
        </div>
        <div className="container">
          <div className="row"></div>
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
        {this.showModal
          ? <PopupComponent handleHideModal={this.handleHideModal}/>
          : console.log('sadasd')}
      </div>
    );
  }
}

export default App;
