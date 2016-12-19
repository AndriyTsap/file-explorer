import React, { Component } from 'react';
import './ContentFileComponent.css';

class ContentFileComponent extends Component {

    icon;
    file = {};
    type;
    fileIcon = 'fa fa-file-o fa-fw';
    textIcon = 'fa fa-file-text-o fa-fw';
    imageIcon = 'fa fa-file-image-o fa-fw';
    videoIcon = 'fa fa-file-video-o fa-fw';
    audioIcon = 'fa fa-file-audio-o fa-fw';
    archiveIcon = 'fa fa-file-archive-o fa-fw';
    pdfIcon = 'fa fa-file-pdf-o fa-fw';
    wordIcon = 'fa fa-file-word-o fa-fw';
    excelIcon = 'fa fa-file-excel-o fa-fw';

    componentWillMount() {
        var res = this.props.obj.name.split('.');
        var spread = res[res.length - 1];
        switch (spread) {
            case 'txt':
            case 'csv':
                this.type = 'text'
                this.icon = this.textIcon;
                break;
            case 'mp3':
                this.type = 'audio';
                this.icon = this.audioIcon
                break;
            case 'avi':
            case 'mp4':
                this.type = 'video'
                this.icon = this.videoIcon
                break;
            case 'jpg':
            case 'png':
            case 'jpeg':
                this.type = 'image';
                this.icon = this.imageIcon;
                break;
            case 'rar':
            case '7zip':
                this.icon = this.archiveIcon;
                break;
            case 'pdf':
                this.icon = this.pdfIcon;
                break;
            case 'doc':
            case 'docx':
                this.icon = this.wordIcon;
                break;
            case 'xls':
            case 'xlsx':
                this.icon = this.excelIcon;
                break;
            default:
                this.icon = this.fileIcon;
        }

        this.setState({ icon: this.icon });
    }

    handleFileDoubleClick(e) {
        this.file = this.props.obj;
        this.file.type = this.type;
        this.props.handleFileDoubleClick(this.file);
        e.stopPropagation();
    }

    render() {
        return (
            <li>
                <span className="file"
                    onDoubleClick={this.handleFileDoubleClick.bind(this)}>
                    <i className={this.icon}></i>
                    {this.props.obj.name}
                </span>
                <span className="date">
                    {this.props.obj.birthTime}
                </span>
                <span className="size">
                    {this.props.obj.size}
                </span>
            </li>
        );
    };
}

export default ContentFileComponent;