import React, { Component } from 'react';
import './PopupComponent.css';

class PopupComponent extends Component {

    content;

    componentDidMount() {
        this.setContent();
    }

    /*componentDidUpdate() {
        this.setContent();
    }*/

    setContent() {
        // eslint-disable-next-line
        let path;
        this.props.breadcrumbs.forEach(bc => {
            path += (bc.name + '/');
        });
        path += this.props.file.name;
        console.log(path.toString());
        if (this.props.file.type === 'image') {
            var pathS = path.toString();
            this.content = (
                <img className="image" width="520" height="300" src={require('../../../server/'+pathS)} alt="something wrong" />
                //<img className="image" width="520" height="300" src={require("../../../server/public/Home/folder1/mockup.png")} alt="something wrong" />
            );
        }
        this.setState({content: this.content});
    }

    closeModal() {
        document.getElementById('win').style.display = 'none'
    }

    render() {
        return (
            <div id="win">
                <div className="overlay"></div>
                <div className="visible">
                    <h2>Заголовок окна</h2>
                    <div className="content">
                        <p>Содержание</p>
                        <p>Модальное окно фиксированной ширины</p>
                        {this.content}
                    </div>
                    <button type="button" onClick={this.closeModal}>закрыть</button>
                </div>
            </div>
        );

    }
}

export default PopupComponent;