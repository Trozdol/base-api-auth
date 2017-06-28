loadModels: function () {
    for (var i = 0; i < this.models.length; i++) {
        eval(`App.models.${this.models[i].module} = require('${this.models[i].path}')`);
    }
},
getModels: function (dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {
        filenames.forEach(function(filename) {
            const model = {
                module: filename.charAt(0).toUpperCase() + filename.slice(1).replace('.js', ''),
                path: dirname + '/' + filename.replace('.js', '')
            };
            App.models.push(model);
        });

        App.loadModels();
    });
},
init: function (App) {
    console.log('init');
}
