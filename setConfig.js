var fs = require('fs');
var resolve = require('path').resolve;
var obj = JSON.parse(fs.readFileSync(resolve('./recorder/config.json'), 'utf8'));
var settings = require(resolve('./config'));

obj.recorder.pathAttrs = settings.attributes;
obj.webdriver.browsers = settings.browsers;

fs.writeFile(resolve('./recorder/config.json'), JSON.stringify(obj), ()=>{
    console.log('Altered Configuration');
});