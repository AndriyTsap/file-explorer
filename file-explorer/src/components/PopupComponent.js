import React, {Component} from 'react';
import './PopupComponent.css';

class PopupComponent extends Component {

    content;

    componentWillMount() {
        console.log('sadadas');
        this.getDOMNode().modal('show');
        this.getDOMNode().on('hidden.bs.modal', this.props.handleHideModal);
    }

    render() {
        return (
            <div
                class="modal fade bs-example-modal-lg"
                tabindex="-1"
                role="dialog"
                aria-labelledby="myLargeModalLabel">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-body">
                            {this.content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupComponent;