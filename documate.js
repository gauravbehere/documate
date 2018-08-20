/**
 * Documate.js
 * Generate documentation/user guide/pdf for your web-application
 * @author: Gaurav Behere, gaurav.techgeek@gmail.com
 * URL: https://github.com/gauravbehere/documate
 */

const fs = require('fs');
const path = require('path');
const settings = require(path.resolve('./config.js'));
const pdf = require('html-pdf');
const options = settings.pdfOptions;
const glob = require('glob');

glob(path.resolve("recorder/specs/**/*.spec.js"), (error, files) => {
    files.forEach((fileName) => {
        fs.readFile(path.resolve(fileName), 'utf8', function (err, contents) {
            let fileNameStripped = fileName.substring(fileName.lastIndexOf('/') + 1, fileName.length);
            let featureDesc = settings.specFeatureMap[fileNameStripped] || 'Provide a feature description in config\'s specFeatureMap';
            let feature = fileNameStripped.replace(".spec.js", "");
            let screenshotPath = feature.replace(/\./g, '_') + "_spec_chrome_";
            let arr = contents.split("it('");
            let steps = [];
            let stepIdx = 1;
            arr.forEach((item) => {
                if (item.indexOf("async function()") !== -1)
                    steps.push({ action: item.substring(0, item.indexOf("'")), idx: stepIdx++ });
            });
            let recordedClicks = steps.filter((step) => {
                return settings.eventsToDocument.some((event) => step.action.indexOf(event) !== -1);
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
                    if (step.action.indexOf('aria-label') !== -1) {
                        documentationSteps.push({ action: step.action.slice(0, step.action.indexOf("(")) + ",  " + step.action.slice(step.action.indexOf('aria-label="') + 11, step.action.indexOf("]")), idx: step.idx });
                    }
                    else {
                        documentationSteps.push({ action: step.action.slice(0, step.action.indexOf("(")), idx: step.idx });
                    }
                }
            });
            /**
             * PDF Generation here
             */
            let html = "<div style='margin-top:100px;padding: 20px; font-size: 24px;'><h2>" + featureDesc + "</h2>";
            documentationSteps.forEach((step, idx) => {
                let filepath = path.join('file://', path.resolve('recorder/screenshots/specs'), screenshotPath + step.idx + '.png');
                html += "<div style='margin-top: 30px;'>" + (idx + 1) + ". " + step.action + "</div><img style='text-align:center;width: 800px; height:400px' src='" + filepath + "'>";
            });
            html += "</div>";
            pdf.create(html, options).toFile(path.resolve("documate-v" + settings.docVersion + '/' + feature + '.pdf'), function (err, res) {
                if (err) return console.log(err);
                console.log(res);
            });
        });
    });
});