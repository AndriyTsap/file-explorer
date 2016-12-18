import React, { Component } from 'react';
import './PopupComponent.css';

class PopupComponent extends Component {

    content;
    trigger = true;
    isDid = false;

    componentDidMount() {
        if (this.trigger) {
            this.setContent();
            this.trigger = false;
            this.setState({ content: this.content });
        }
        this.trigger = false;

    }

    componentDidUpdate() {
        if (this.trigger) {
            this.setContent();
            this.trigger = false;
            this.isDid = true;
            this.setState({ content: this.content });
        }
        this.trigger = false;

    }

    shouldComponentUpdate() {
        if (!this.isDid) {
            this.trigger = true;
        }
        this.isDid = false;
        return true;
    }

    setContent() {
        // eslint-disable-next-line
        let path = "";
        this.props.breadcrumbs.forEach(bc => {
            path += (bc.name + "/");
        });
        path += this.props.file.name;
        if (this.props.file.type === "id") {
            let pathS = path.split('.');
            if (pathS[pathS.length - 1] === "png") {
                this.content = (<img className="image" src={require("../../" + pathS[pathS.length - 2] + ".png")} alt="something wrong" />);
            }
            if (pathS[pathS.length - 1] === "jpg") {
                this.content = (<img className="image" src={require("../../" + pathS[pathS.length - 2] + ".jpg")} alt="something wrong" />);
            }
        }
        if (this.props.file.type === "audio") {
            let pathS = path.split('.');
            if (pathS[pathS.length - 1] === "mp3") {
                this.content = (<audio id="media" src={require("../../" + pathS[pathS.length - 2].toString() + ".mp3")} controls>
                    Your browser does not support the <code>audio</code> element.
                </audio>);
            }
            if (pathS[pathS.length - 1] === "wav") {
                this.content = (<audio id="media" src={require("../../" + pathS[pathS.length - 2].toString() + ".wav")} controls>
                    Your browser does not support the <code>audio</code> element.
                </audio>);
            }
        }
        if (this.props.file.type === "video") {
            let pathS = path.split('.');
            if (pathS[pathS.length - 1] === "mp4") {
                this.content = (<video id="media" src={require("../../" + pathS[pathS.length - 2].toString() + ".mp4")} controls>
                    Your browser does not support the <code>audio</code> element.
                </video>);
            }
            if (pathS[pathS.length - 1] === "avi") {
                this.content = (<video id="media" src={require("../../" + pathS[pathS.length - 2].toString() + ".avi")} controls>
                    Your browser does not support the <code>audio</code> element.
                </video>);
            }
        }
        this.content = (<h3>Previeving this type of files is not supported</h3>);
        this.setState({content: this.content});
    }

    closeModal() {
        document.getElementById('win').style.display = 'none';
        if (this.props.file.type === "video" || this.props.file.type === "audio") {
            document.getElementById('media').pause();
        }
    }

    render() {
        return (
            <div id="win">
                <div className="overlay"></div>
                <div className="visible">
                    <div className="header">
                        <span>
                            <h2>{this.props.file.name}</h2>
                            <button type="button" onClick={this.closeModal.bind(this)}>закрыть</button>
                        </span>
                    </div>
                    <div className="content">
                        {this.content}
                    </div>
                </div>
            </div>
        );

    }
}

export default PopupComponent;