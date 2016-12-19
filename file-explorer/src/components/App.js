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

  root;
  sidebarCatalogs = [];
  contentCatalogs = [];
  searchResult = [];
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
        this.root = jData;
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
        key={this.guid()} obj={object}
        dbClickHandler={this.handleSidebarFolderDoubleClick.bind(this)}>
      </SidebarFolderComponent>
    );
  }

  createContentCatalog(key, object, clickHandler) {
    return (
      <ContentFolderComponent
        key={this.guid()} obj={object}
        dbClickHandler={clickHandler}>
      </ContentFolderComponent>
    );
  }

  createContentFile(key, object) {
    return (
      <ContentFileComponent key={this.guid()} obj={object}
        handleFileDoubleClick={this.handleFileDoubleClick.bind(this)}>
      </ContentFileComponent>
    );
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  guid() {

    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  initTree(data) {
    var root = data;

    this.sidebarCatalogs.push(
      this.createSidebarCatalog(root.name, root)
    );

    this.contentCatalogs.push(
      this.createContentCatalog("..", { name: ".." }, this.handleGoBackClick.bind(this))
    );

    this.contentCatalogs.push(
      this.createContentCatalog(root.name, root, this.handleContentFolderDoubleClick.bind(this))
    );

    this.setState({ contentCatalogs: this.contentCatalogs });
    this.setState({ sidebarCatalogs: this.sidebarCatalogs });
  }

  handleSidebarFolderDoubleClick(folder) {
    this.breadcrumbsComponent.reset(folder);
    this.handleFolderDoubleClick(folder);
  }

  handleContentFolderDoubleClick(folder) {
    this.breadcrumbsComponent.reset(folder);
    this.handleFolderDoubleClick(folder);
  }

  handleGoBackClick() {
    var breadcrumbs = this.breadcrumbsComponent.getBreadcrumbs();

    if (breadcrumbs.length > 1) {
      this.breadcrumbsComponent.reset(breadcrumbs[breadcrumbs.length - 2]);
      this.handleFolderDoubleClick(breadcrumbs[breadcrumbs.length - 2]);
    }

  }

  handleFolderDoubleClick(folder) {
    this.foldersCount = 0;
    this.filesCount = 0;
    this.contentCatalogs = [];
    this.contentCatalogs.push(
      this.createContentCatalog("..", { name: ".." }, this.handleGoBackClick.bind(this))
    );
    if (folder.children) {
      folder.children
        .forEach(c => {
          if (c.children) {
            this.foldersCount++;
            this.contentCatalogs.push(
              this.createContentCatalog(c.name, c, this.handleContentFolderDoubleClick.bind(this))
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
    var file1 = file;
    var breadcrumbs = [];
    while(file.father) {
      breadcrumbs.unshift(file.father);
      file = file.father;
    }
    console.log(breadcrumbs);
    this.modal = (
      <PopupComponent breadcrumbs={breadcrumbs} file={file1}></PopupComponent>
    );
    this.setState({ modal: this.modal });
    if (document.getElementById('win')) {
      document.getElementById('win').removeAttribute('style');
    }
  }

  searchHandler(e) {
    this.searchResult = [];
    e.stopPropagation();
    var breadcrumbs = this.breadcrumbsComponent.getBreadcrumbs();
    var name = document.getElementById("Search").value;
    if (breadcrumbs.length !== 0) {
      var folder = breadcrumbs[breadcrumbs.length - 1];
      this.search(folder, name);
    }
    else {
      console.log(this.root);
      this.search(this.root, name);
    }
    this.handleFolderDoubleClick({ name: "", children: this.searchResult });
  }

  search(folder, name) {
    folder.children.forEach(c => {
      if (c.name.startsWith(name)) {
        this.searchResult.push(c);
      }
      if (c.children) {
        this.search(c, name);
      }
    });
  }

  handleBreadcrumbClick(folder) {
    this.handleFolderDoubleClick(folder);
    this.breadcrumbsComponent.reset(folder);
  }

  render() {
    return (
      <div className="App">
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
                  <input type="text" className="  search-query form-control" id="Search" placeholder="Search" />
                  <span className="input-group-btn">
                    <button className="btn btn-danger" type="button" onClick={this.searchHandler.bind(this)}>
                      <span className=" glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="App-content">
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
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 foother">
              <div className="counts">
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
            <div className="col-md-6 col-sm-6">
              <img src={logo} className="App-logo" alt="logo" />
            </div>
          </div>
          {this.modal}
        </div>
      </div>
    );
  }
}

export default App;
