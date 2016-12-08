export class DataService {
    
    _baseUri = 'http://localhost:5000/'

    get() {

        var uri = this._baseUri + 'tree';

        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', uri);
            xhr.onload = function () {
                if (this.status == 200) {
                    resolve(this.response);
                } else {
                    var error = new Error(this.statusText);
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send();
        });;
    }
}