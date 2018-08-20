# documate
 Utility to generate PDF documentation of a web application's features

# About
- Generate UI Automation Specs, without writing code.
- Translate the generated specs into production ready documentation/user guide of your web-application.
- Generate easily shippable PDF per feature of your application with screenshots of the steps.
- Explain the consumer how to use your application in easy steps.

# Usage
### Setup
- Clone https://github.com/gauravbehere/documate
- npm install
- npm run setup
- npm run setconfig

### Record Features (generates feature's spec file)
- npm run start
- npm run record <path to spec file> (format: recorder/spec/myFeature.spec.js)

### Run Feature Spec (generates screenshots)
- npm run singletest <path to spec file> eg: recorder/spec/myFeature.spec.js

### Generate documentation (generates PDF documentaion for the application's features
- npm run generateDoc (Generates PDF documented steps in the same folder, with the version number provided in config file.)

# Configuration
```javascript
/**
 * Documate.js configuration
 * Generate documentation/user guide/pdf for your web-application
 * @author: Gaurav Behere, gaurav.techgeek@gmail.com
 * URL: https://github.com/gauravbehere/documate
 */
module.exports = {
    "attributes": "aria-label,title", /* Attribs to look for in DOM element */ 
    "eventsToDocument": ["url", "click", "sendKeys"], /* Out of the events recorder through uirecorder, events which we are interested in documenting */
    "browsers": "chrome", /* comma seperated browser list: chrome, ie 11 etc*/
    /**
     * Format the PDF content, set header & footer styles
     */
    "pdfOptions": {
        "format": 'Letter',
        "header": {
            "height": "5mm",
            "contents": '<div style="text-align: center; font-size: 24px;">Product User Guide</div><div style="text-align: center; font-size: 24px;">Version: 1.0</div><hr>'
        },
        "footer": {
            "height": "10mm",
            "contents": "<hr><div style='text-align: center; font-size: 24px;'>Generated Through 'Documate' - Automated Documentation Generator</div>"
        }
    },
    "docVersion": 1.2, /* Increment this for a new set of product guide */
    "specFeatureMap": {
        /**
         * Add a entry here to describe what the test case does.
         * eg: "google.Directions.spec.js": "Finding directions between two places using google maps"
         */
        "google.Directions.spec.js": "Finding directions between two places using google maps"
    }
}
```

# Dependencies
- UIRecorder: https://github.com/alibaba/uirecorder (Big Thanks to Alibaba !)
- NodeJS > v7.x

