const blackboardUrl = 'bb.uvm.edu'

chrome.runtime.onInstalled.addListener(function() {
	// Replace all rules ...
	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([{
			conditions: [
				new chrome.declarativeContent.PageStateMatcher({
					pageUrl: { urlContains: blackboardUrl },
				})
			],
			// And shows the extension's page action
			actions: [ new chrome.declarativeContent.ShowPageAction() ]
		}])
	})
})

//Send message to content script to populate field on refresh
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
	if (tab.url.includes(blackboardUrl) && changeInfo.status === "complete"){
		chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
			chrome.storage.sync.get(['netId'], (syncedData)=> {
				if(chrome.runtime.lastError){
					console.log(chrome.runtime.lastError.message)
				}

				if(syncedData.netId){
					chrome.tabs.sendMessage(
						tabs[0].id,		//tabs[0] just in case multiple current tabs
						{
							msg: 'saveNetId', 
							netId: syncedData.netId
						}
					)
				}
			})
		})
	}
})