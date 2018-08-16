var fs = require('fs');
var resolve = require('path').resolve;

fs.readFile(resolve('./specs/google.Directions.spec.js'), 'utf8', function(err, contents) {    
    let arr = contents.split("it('");    
    let steps = [];
    arr.forEach((item)=>{
        steps.push(item.substring(0, item.indexOf("'")));
    });
    let recordedClicks = steps.filter((step)=>{
        return step.indexOf("url") !==-1 || step.indexOf("click") !==-1 || step.indexOf("sendKeys") !==-1
    });
    console.log(recordedClicks);
});