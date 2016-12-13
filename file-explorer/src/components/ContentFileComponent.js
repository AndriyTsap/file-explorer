import React, {Component} from 'react';
import PopupComponent from './PopupComponent';

class ContentFileComponent extends Component {

    icon;
    fileIcon = 'fa fa-file fa-fw';
    textIcon = 'fa fa-file-text fa-fw';
    imageIcon = 'fa fa-file-image fa-fw';
    videoIcon = 'fa fa-file-video fa-fw';
    audioIcon = 'fa fa-file-audio-o fa-fw';
    archiveIcon = 'fa fa-file-archive fa-fw';
    pdfIcon = 'fa fa-file-pdf fa-fw';
    wordIcon = 'fa fa-file-word fa-fw';
    excelIcon = 'fa fa-file-excel fa-fw';

    componentWillMount() {
        var res = this
            .props
            .obj
            .name
            .split('.');
        var spread = res[res.length - 1];
        switch (spread) {
            case 'txt':
            case 'csv':
                this.icon = this.textIcon;
                break;
            case 'mp3':
                this.icon = this.audioIcon
                break;
            case 'avi':
            case 'mp4':
                this.icon = this.videoIcon
                break;
            case 'jpg':
            case 'png':
            case 'jpeg':
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
                this.icon = this.fileIcon;;
        }

        this.setState({icon: this.icon});
    }

    handleFileDoubleClick(e) {
        e.stopPropagation();
        this.props.handleFileDoubleClick(this.props.obj);
    }

    render() {
        return (
            <li>
                <span
                    className="file"
                    onDoubleClick={this
                    .handleFileDoubleClick
                    .bind(this)}>
                    <i className={this.icon}></i>
                    {this.props.obj.name}
                </span>
            </li>
        )
    };

}

export default ContentFileComponent;