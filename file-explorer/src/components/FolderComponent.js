import React, {Component} from 'react';

class FolderComponent extends Component {

    isExtracted = false;
    closedFolder = "fa fa-folder fa-fw";
    openedFolder = "fa fa-folder-open-o fa-fw";
    folder = this.closedFolder;
    childrenSafe;
    children = [];

    extractFolder(e) {
        e.stopPropagation();
        if (!this.isExtracted) {
            this.isExtracted = true;
            this.folder = this.openedFolder;
            if (this.childrenSafe) { 
                this.children = this.childrenSafe;
                console.log(this.children);
            }
            else {
                var childrens = this.props.children;
                if (childrens) {
                    childrens.forEach(c => {
                        if (c.children) {
                            this
                                .children
                                .push(
                                    <FolderComponent name={c.name} children={c.children}></FolderComponent>
                                );
                        }
                    });
                }
            }
        } else {
            this.isExtracted = false;
            this.folder = this.closedFolder;
            this.childrenSafe = this.children;
            this.children = [];
        }
        this.setState({folder: this.folder});
    }

    render() {
        return (
            <ul>
                <li
                    onClick={this
                    .extractFolder
                    .bind(this)}>
                    <i className={this.folder}></i>
                    {this.props.name}
                    {this.children}
                </li>
            </ul>
        );
    }
}

export default FolderComponent;