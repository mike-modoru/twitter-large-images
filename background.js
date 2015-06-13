// Chrome extension - Twitter Large Image Redirector
// Redirects all images on to twitter timelines to their large versions
// Background page for browser action
(function() {
  "use strict";
 
  // Status of extension (Inactive / Active only) or of a twitter tab
  // Slightly complex arrangement needed to refresh tabs only when needed, but also handle first
  // installation and enabling/disabling of extension
  var Status = {
    NoMatch:  0, // No urls to redirect on this tab
    Inactive: 1, // Extension is inactive (on this tab)
    Active:   2  // Extension is active (on this tab)
  };
  
  // Status of twitter tabs - each has a {tabId: Status} entry. Non-twitter tabs have no entry
  var tabStatus = {};
  
  // Status of the extension itself (toggled via browser action icon)
  var active = Status.Active;
  var firstRun = false;

  // Redirect twitter image requests to the large version of the image
  function redirectRequest(request) {
    var suffix;
    tabStatus[request.tabId] = active; // Found a url match, set tab status to extension status
    if (active === Status.Active) {    // Only redirect if extension active
      suffix = request.url.substr(request.url.length - 6).toUpperCase();
      if (suffix !== ":LARGE" && suffix !== ":THUMB") { // Skip thumbnails & already large images
        return {redirectUrl : request.url + ":orig"};
      }
    }
    return {};
  }

  // Set browser action icon and update local storage to reflect current status
  function updateActiveStatus() {
    chrome.browserAction.setIcon({
      path: active === Status.Active ? {
        "19": "media/icon_19.png",
        "38": "media/icon_38.png"
      } : {
        "19": "media/icon_off_19.png",
        "38": "media/icon_off_38.png"
      }
    });
    chrome.storage.local.set({"active": active});
  }

  // Toggle extension status on browser action icon click
  function toggleBrowserAction(tab) {
    if (firstRun) {
      // Message shown on first click
      alert(chrome.i18n.getMessage("first_run"));
      firstRun = false;
    }
    else
    {
      active = (active === Status.Active ? Status.Inactive : Status.Active);
      if (tabStatus[tab.id] === Status.Active || tabStatus[tab.id] === Status.Inactive) {
        chrome.tabs.reload(tab.id, {bypassCache: true}); // Refresh current tab if it had redirects
      }
      updateActiveStatus();
    }
  }

  // Navigating to new page, update tab status
  function pageNavigate(navigation) {
    if (navigation.frameId !== 0) {  // Only main frame
      return;
    }
    // If navigating to a twitter page, identify it with a NoMatch tabStatus
    if (navigation.url && navigation.url.indexOf("twitter.com") > -1) {
      tabStatus[navigation.tabId] = Status.NoMatch;
    }
    else {
      // Navigating to a non-twitter page, remove tabStatus entry.
      delete tabStatus[navigation.tabId];
    }
  }

  // Switching to new tab, refresh tab if extension active status has changed since loading it
  function tabChange(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
      // Two situations require a refresh on switching to new tab:
      // - Tab is a twitter page with no tabStatus entry, so extension did not process it's loading
      // - Tab has an active/inactive tabStatus entry that doesn't match current active status
      // Easier to write condition where tab does not need be refreshed
      if (tabStatus[activeInfo.tabId] === active || tabStatus[activeInfo.tabId] === Status.NoMatch ||
          (tabStatus[activeInfo.tabId] === undefined && (!tab.url || tab.url.indexOf("twitter.com") === -1))) {
          return;
      }
      chrome.tabs.reload(activeInfo.tabId, {bypassCache: true});
    });
  }

  //----------

  // Extension start-up
  chrome.browserAction.disable();
  chrome.storage.local.get("active", function(storage) {
    // Read stored activation status, if nothing stored then this is first run so activate and prepare message
    active = storage.active; 
    if (active === undefined) {
      active = Status.Active;
      firstRun = true;
    }
    updateActiveStatus();
    
    // Set listeners
    chrome.webNavigation.onBeforeNavigate.addListener(pageNavigate);
    chrome.webRequest.onBeforeRequest.addListener(redirectRequest, {urls : ["*://pbs.twimg.com/media/*"]}, ["blocking"]);
    chrome.tabs.onActivated.addListener(tabChange);
    chrome.browserAction.onClicked.addListener(toggleBrowserAction);

    chrome.browserAction.enable();
  });
  
}());
