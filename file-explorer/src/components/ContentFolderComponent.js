import React, { Component } from 'react';

class ContentFolderComponent extends Component {

    folder = 'fa fa-folder-o fa-fw';

    handleFolderDoubleClick(e) {
        e.stopPropagation();
        this.props.dbClickHandler(this.props.obj);
    }

    render() {
        return (
            <li>
                <span className="folder" onDoubleClick={this.handleFolderDoubleClick.bind(this)}>
                    <i className={this.folder}></i>
                    {this.props.obj.name}
                </span>
            </li>
        )
    };
}

export default ContentFolderComponent;