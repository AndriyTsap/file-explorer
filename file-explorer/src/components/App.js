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
  foldersCount;
  filesCount;

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

  createContentCatalog(key, object, clickHandler) {
    return (
      <ContentFolderComponent
        key={key} obj={object}
        dbClickHandler={clickHandler.bind(this)}>
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

  handleGoBackClick(){
    var breadcrumbs = this.breadcrumbsComponent.getBreadcrumbs();
    this.breadcrumbsComponent.reset(breadcrumbs[breadcrumbs.length-2]);
  }

  handleFolderDoubleClick(folder) {
    this.foldersCount = 0;
    this.filesCount = 0;
    this.contentCatalogs = [];
    this.contentCatalogs.push(
      this.createContentCatalog("..", {name: ".."})
    );
    if (folder.children) {
      folder.children
        .forEach(c => {
          if (c.children) {
            this.foldersCount++;
            this.contentCatalogs.push(
              this.createContentCatalog(c.name, c)
            );
          }
        });
      folder.children
        .forEach(c => {
          if (!c.children) {
            this.filesCount++;
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

  handleBreadcrumbClick(folder) {
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
            <div className="col-md-6 col-sm-6 breadcrumbs">
              <BreadcrumbsComponent handleClick={this.handleBreadcrumbClick.bind(this)} ref={(breadcrumbsComponent) => {
                this.breadcrumbsComponent = breadcrumbsComponent;
              }
              }></BreadcrumbsComponent>
            </div>
            <div className="col-md-6 col-sm-6">
              <div id="custom-search-input">
                <div className="input-group col-md-12">
                  <input type="text" className="  search-query form-control" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button">
                      <span className=" glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3 sidebarCatalogsTree">
              <aside id="fileTree">
                <ul>
                  {this.sidebarCatalogs}
                </ul>
              </aside>
            </div>
            <div className="col-md-9 col-sm-9 contentCatalogsTree">
              <ul>
                {this.contentCatalogs}
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 foother">
            <span>
              <span>
                Folders:  {this.foldersCount}
              </span>
              <span>
                &nbsp;|&nbsp;
              </span>
              <span>
                Files:  {this.filesCount}
              </span>
              </span>
            </div>
          </div>
          {this.modal}
        </div>
      </div>
    );
  }
}

export default App;
