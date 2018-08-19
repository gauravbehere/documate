var fs = require('fs');
var resolve = require('path').resolve;
var settings = require(resolve('./config.js'));

fs.readFile(resolve('./recorder/specs/createUser.spec.js'), 'utf8', function (err, contents) {
    let arr = contents.split("it('");
    let steps = [];
    arr.forEach((item, idx) => {
        steps.push({ action: item.substring(0, item.indexOf("'")), idx: idx });
    });
    let recordedClicks = steps.filter((step) => {
        return settings.eventsToDocument.some((event)=>step.action.indexOf(event)!==-1);
    });
    let documentationSteps = [];
    recordedClicks.forEach((step) => {
        if (step.action.indexOf('url') !== -1) {
            documentationSteps.push({ action: "Go To: " + step.action.split(" ")[1], idx: step.idx });
        }
        else if (step.action.indexOf('sendKeys') !== -1) {
            documentationSteps.push({ action: "Enter Details", idx: step.idx });
        }
        else if (step.action.indexOf('click') !== -1) {
            documentationSteps.push({ action: step.action.slice(0, step.action.indexOf("(")), idx: step.idx });
        }
    });
    console.log(documentationSteps);
    /**
     * PDF Generation here
     */
});