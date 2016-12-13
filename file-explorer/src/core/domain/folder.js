var idCounter = 1;

export class Folder{  
    name = "";
    isExtracted = false;
    children = [];

    constructor(data){
        this.name = data.name;
        this.children = data.children;
        this.id=idCounter++;
    }
}