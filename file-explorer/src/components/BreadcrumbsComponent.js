import React, { Component } from 'react';
import './BreadcrumbsComponent.css'

class BreadcrumbsComponent extends Component {

    breadcrumbs = [];
    items = [];

    getBreadcrumbs() {
        return this.breadcrumbs;
    }

    createItem(content, clickHadndler) {
        return (
            <span key={this.breadcrumbs.length.toString()}>
                <a onClick={clickHadndler}>{content}</a>
                <span>></span>
            </span>
        );
    }

    push(item) {
        if (this.items[this.items.length - 1]) {
            this.items[this.items.length - 1] = (
                this.createItem(this.breadcrumbs[this.breadcrumbs.length - 1].name, this.handleClick.bind(this))
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
            this.items.unshift(this.createItem(folder.name, this.handleClick.bind(this)));
        }

        var root = { name: 'public', children: [folder] };
        this.breadcrumbs.unshift(root)
        this.items.unshift(this.createItem(root.name));

        console.log(this.breadcrumbs);
        this.setState({ items: this.items });
    }

    handleClick() {
        console.log("sdasd");
    }

    render() {
        return (
            <div>
                {this.items}
            </div>
        );
    }
}

export default BreadcrumbsComponent;