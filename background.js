'use strict';
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains 'datonis.io'
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: 'datonis.io' },
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});

function forcePreview(){

chrome.tabs.query({ active: true, currentWindow: true}, function (tabs) {
if (tabs[0] && tabs[0].url)
{
   let additionalParam = "preview=true";
    let currentUrl =  new URL(tabs[0].url)
    let urlParams = currentUrl.search
    if(currentUrl.href.search("preview=true") >=0){
	return}
    if(urlParams.length > 0){
        chrome.tabs.update(tabs[0].id, {url: currentUrl + "&" + additionalParam});	
	}
	else{
	    chrome.tabs.update(tabs[0].id, {url: currentUrl + "?" + additionalParam});
	}

}

});
}

function enableBrowserAction(tabId, changeInfo, tabInfo){
    chrome.tabs.get(tabId, function (tab){
	if (tab.url.search("datonis.io") >= 0){
  chrome.browserAction.enable(tab.id);
	chrome.browserAction.setIcon({path: "assets/preview_enabled-32.png"});
	}else{
       chrome.browserAction.setIcon({path: "assets/preview_disabled-32.png"});
	     chrome.browserAction.disable(tab.id);	
	}
	})
}

/*
chrome.tabs.onActivated.addListener(function(activeInfo) {

    chrome.tabs.get(activeInfo.tabId, function (tab){
	if (tab.url.search("datonis.io") >= 0){
  chrome.browserAction.enable(tab.id);
	chrome.browserAction.setIcon({path: "assets/preview_enabled-32.png"});
	}else{
       chrome.browserAction.setIcon({path: "assets/preview_disabled-32.png"});
	     chrome.browserAction.disable(tab.id);	
	}
	})
});
*/

chrome.tabs.onUpdated.addListener(enableBrowserAction)

chrome.browserAction.onClicked.addListener(forcePreview)
