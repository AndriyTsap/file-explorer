export class Folder{
    name = "";
    children = [];

    constructor(data){
        this.name = data.name;
        this.children = data.children;
    }
}