document.addEventListener("DOMContentLoaded", ()=>{

	$('#populateNetidButton').on('click', (e)=>{
		sendNetIdToContentScript()
	})

	//Handle enter key
	$('#netId').on('keydown', (e)=> {
		if (e.which == 13) {
			sendNetIdToContentScript()
		}
	})

	//Auto-populate field in popup with synced value when popup opens
	chrome.storage.sync.get(['netId'], (syncedData)=> {
		if(chrome.runtime.lastError){
			console.log(chrome.runtime.lastError.message)
		}

		if(syncedData.netId){
			document.getElementById('netId').value = syncedData.netId
		}
	})

})

function sendNetIdToContentScript(){
	chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
		let netId = document.getElementById('netId').value.trim()
		chrome.storage.sync.set({
			'netId': netId
		})
		chrome.tabs.sendMessage(
			tabs[0].id,		//tabs[0] just in case multiple current tabs
			{
				msg: 'saveNetId', 
				netId: netId
			}
		)
	})
}