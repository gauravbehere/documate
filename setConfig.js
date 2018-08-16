var fs = require('fs');
var resolve = require('path').resolve;
var obj = JSON.parse(fs.readFileSync(resolve('./recorder/config.json'), 'utf8'));

obj.recorder.pathAttrs = "title,id,role,value,data-value,type";
obj.webdriver.browsers = "chrome";

fs.writeFile(resolve('./recorder/config.json'), JSON.stringify(obj), ()=>{
    console.log('Altered Configuration');
});