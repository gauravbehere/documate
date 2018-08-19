/**
 * Automated-Documentation-Generator
 * Config: export settings from here
 */

module.exports = {
        
    "attributes": "aria-label,title,id,role,value,data-value,type", /* Attribs to look for in DOM element */    
    
    "eventsToDocument": ["url", "click", "sendKeys"], /* Out of the events recorder through uirecorder, events which we are interested in documenting */

    "browsers": "chrome" /* comma seperated browser list: chrome, ie 11 etc */

}