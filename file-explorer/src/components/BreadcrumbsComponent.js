import React, { Component } from 'react';
import './BreadcrumbsComponent.css'

class BreadcrumbsComponent extends Component {

    breadcrumbs = [];
    items = [];

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    guid() {

        return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
            this.s4() + '-' + this.s4() + this.s4() + this.s4();
    }

    getBreadcrumbs() {
        return this.breadcrumbs;
    }

    createItem(content, clickHadndler) {
        if (clickHadndler) {
            return (
                <span key={this.guid().toString()}>
                    <a onClick={clickHadndler}>{content}</a>
                    <span>></span>
                </span>
            );
        }
        else {
           return (
                <span key={this.guid().toString()}>
                    {content}
                </span>
            ); 
        }
    }

    push(item) {
        if (this.items[this.items.length - 1]) {
            this.items[this.items.length - 1] = (
                this.createItem(this.breadcrumbs[this.breadcrumbs.length - 1].name, this.handleClick.bind(this, this.breadcrumbs[this.breadcrumbs.length - 1]))
            );
        }

        this.breadcrumbs.push(item);
        this.items.push(
            this.createItem(item.name)
        );
        this.setState({ items: this.items });
    }

    pop() {
        this.items.pop();
        this.breadcrumbs.pop();
        this.items[this.items.length - 1] = (
            this.createItem(this.breadcrumbs[this.breadchumbs.length - 1].name)
        );
        this.setState({ items: this.items });
    }

    reset(folder) {
        this.items = [];
        this.breadcrumbs = [];

        this.breadcrumbs.unshift(folder);
        this.items.unshift(this.createItem(folder.name));

        while (folder.father) {
            folder = folder.father;
            this.breadcrumbs.unshift(folder);
            this.items.unshift(this.createItem(folder.name, this.handleClick.bind(this, folder)));
        }

        this.setState({ items: this.items });
    }

    handleClick(folder) {
        console.log(folder);
        this.props.handleClick(folder);
    }

    render() {
        return (
            <div className="breadcrumbsComponent">
                {this.items}
            </div>
        );
    }
}

export default BreadcrumbsComponent;