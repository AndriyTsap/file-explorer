import React, { Component } from 'react';
import { DataService } from '../core/services/data.service';
import SidebarFolderComponent from './SidebarFolderComponent';
import ContentFolderComponent from './ContentFolderComponent';
import ContentFileComponent from './ContentFileComponent';
import PopupComponent from './PopupComponent';
import BreadcrumbsComponent from './BreadcrumbsComponent';
import logo from '../logo.svg';
import './App.css';

class App extends Component {

  sidebarCatalogs = [];
  contentCatalogs = [];
  modal;
  breadcrumbsComponent;
  popupComponent;

  constructor(dataService) {
    super();
    dataService = new DataService();
    dataService
      .get()
      .then(data => {
        var jData = JSON.parse(data);
        this.formatData(jData)

        this.initTree(jData)
      }, err => console.log(err));
  }

  formatData(obj) {
    obj.children.forEach(c => {
      c.father = obj;
      if (c.children) {
        this.formatData(c);
      }
    });
  }

  createSidebarCatalog(key, object) {
    return (
      <SidebarFolderComponent
        key={key} obj={object}
        dbClickHandler={this.handleSidebarFolderDoubleClick.bind(this)}>
      </SidebarFolderComponent>
    );
  }

  createContentCatalog(key, object) {
    return (
      <ContentFolderComponent
        key={key} obj={object}
        dbClickHandler={this.handleContentFolderDoubleClick.bind(this)}>
      </ContentFolderComponent>
    );
  }

  createContentFile(key, object) {
    return (
      <ContentFileComponent key={key} obj={object}
        handleFileDoubleClick={this.handleFileDoubleClick.bind(this)}>
      </ContentFileComponent>
    );
  }

  initTree(data) {
    var root = data;

    this.sidebarCatalogs.push(
      this.createSidebarCatalog(root.name, root)
    );

    this.contentCatalogs.push(
      this.createContentCatalog(root.name, root)
    );

    let obj = { name: "public" };
    this.breadcrumbsComponent.push(obj);
    this.setState({ contentCatalogs: this.contentCatalogs });
    this.setState({ sidebarCatalogs: this.sidebarCatalogs });
  }

  handleSidebarFolderDoubleClick(folder) {
    this.breadcrumbsComponent.reset(folder);
    this.handleFolderDoubleClick(folder);
  }

  handleContentFolderDoubleClick(folder) {
    this.breadcrumbsComponent.push(folder);
    this.handleFolderDoubleClick(folder);
  }

  handleFolderDoubleClick(folder) {
    this.contentCatalogs = [];
    if (folder.children) {
      folder.children
        .forEach(c => {
          if (c.children) {
            this.contentCatalogs.push(
              this.createContentCatalog(c.name, c)
            );
          } else {
            this.contentCatalogs.push(
              this.createContentFile(c.name, c)
            );
          }
        });
    }
    this.setState({ contentCatalogs: this.contentCatalogs });
  }

  handleFileDoubleClick(file) {
    var breadcrumbs = this.breadcrumbsComponent.getBreadcrumbs();
    this.modal = (
      <PopupComponent breadcrumbs={breadcrumbs} file={file}></PopupComponent>
    );
    this.setState({ modal: this.modal });
    if (document.getElementById('win')) {
      document.getElementById('win').removeAttribute('style');
    }
  }

  handleBreadcrumbClick(folder){
    this.handleFolderDoubleClick(folder);
    this.breadcrumbsComponent.reset(folder);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-2 breadcrumbs">
              <BreadcrumbsComponent handleClick={this.handleBreadcrumbClick.bind(this)} ref={(breadcrumbsComponent) => {
                this.breadcrumbsComponent = breadcrumbsComponent;
              }
              }></BreadcrumbsComponent>
            </div>
            <div className="col-md-2 col-sm-2 breadcrumbs">
            </div>
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
        {this.modal}
      </div>
    );
  }
}

export default App;
