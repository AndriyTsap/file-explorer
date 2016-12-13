import React, { Component } from 'react';

class ContentFolderComponent extends Component {

    constructor() {
        super();
    }

    folder = 'fa fa-folder fa-fw';

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