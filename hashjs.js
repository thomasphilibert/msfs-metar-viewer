var fs = require('fs')
var crypto = require('crypto');

var jsname


fs.readFile('./dist/js/bundle.min.js', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }
    var hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    hash.write(data);
    hash.end();
    var hashstr = hash.read()
    jsname = 'bundle.' + hashstr + '.js'
    fs.rename('./dist/js/bundle.min.js', './dist/js/' + jsname, function (err) {
        if (err) console.log('ERROR: ' + err);
    });

    fs.readFile('./public/index.html', 'utf8', function (err, data) {
        var result = data.replace(/bundle.min.js/g, jsname);
        fs.writeFile('./dist/index.html', result, 'utf8', function (err) {
            if (err) return console.log('ERROR: ' + err);
        });
    });

    console.log('Renamed js to ' + jsname)
});

