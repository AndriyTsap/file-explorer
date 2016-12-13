import React, { Component } from 'react';

class ContentFileComponent extends Component {

    constructor() {
        super();
    }

    icon = 'fa file fa-fw';
    textIcon = 'fa file-text fa-fw';
    imageIcon = 'fa file-image fa-fw';
    videoIcon = 'fa file-video fa-fw';
    audioIcon = 'fa file-audio fa-fw';
    archiveIcon = 'fa file-archive fa-fw';
    pdfIcon = 'fa file-pdf fa-fw';
    wordIcon = 'fa file-word fa-fw';
    excelIcon = 'fa file-excel fa-fw';

    componentDidMount() {
        var res = props.object.name.split('.');
        var spread = res[res.length - 1];

        switch (spread) {
            case 'mp3':
                this.icon=this.audioIcon
                break;
            case 'avi':
                this.icon=this.videoIcon
                break;
            default:
            this.icon;
        }
    }

    ender() {
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

export default ContentFileComponent; 