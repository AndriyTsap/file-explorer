import React, { Component } from 'react';

class SidebarFolderComponent extends Component {

    arrowRight = 'fa fa-caret-right fa-fw';
    arrowDown = 'fa fa-caret-down fa-fw';
    arrow = this.arrowRight;
    folder = 'fa fa-folder-o fa-fw';
    childrenSafe;
    children = [];


    componentDidMount() {
        if (this.props.obj.isExtracted) {
            this.arrow = this.arrowDown;
            this.setState({ folder: this.folder });
            this.extractFolder();
        }
    }

    handleFolderDoubleClick(e) {
        e.stopPropagation();
        this.props.dbClickHandler(this.props.obj);
        if (!this.props.obj.isExtracted) {
            this.extractFolder();
        } else {
            this.closeFolder();
        }
    }

    handleArrowClick(e) {
        e.stopPropagation();
        if (!this.props.obj.isExtracted) {
            this.extractFolder();
        } else {
            this.closeFolder();
        }

    }

    extractFolder() {
        this.props.obj.isExtracted = true;
        this.arrow = this.arrowDown;
        if (this.childrenSafe) {
            this.children = this.childrenSafe;
        } else {
            var childrens = this.props.obj.children;
            if (childrens) {
                childrens.forEach(c => {
                    if (c.children) {
                        this.children
                            .push(
                            <SidebarFolderComponent key={c.name.toString()} obj={c}
                                dbClickHandler={this.props.dbClickHandler}>
                            </SidebarFolderComponent>
                            );
                    }
                });
            }
        }
        this.setState({ arrow: this.arrow });
        this.setState({ children: this.children });
    }

    closeFolder(e) {
        this.arrow = this.arrowRight;
        this.props.obj.isExtracted = false;
        this.childrenSafe = this.children;
        this.children = [];
        this.setState({ arrow: this.arrow });
        this.setState({ children: this.children });
    }

    render() {
        return (
            <ul>
                <li>
                    <i className={this.arrow} onClick={this.handleArrowClick.bind(this)}></i>
                    <span className="folder" onDoubleClick={this.handleFolderDoubleClick.bind(this)}>
                        <i className={this.folder}></i>
                        {this.props.obj.name}
                        {this.children}
                    </span>
                </li>
            </ul>
        );
    }
}

export default SidebarFolderComponent;