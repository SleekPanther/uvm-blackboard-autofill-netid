document.addEventListener("DOMContentLoaded", ()=>{

	$('#populateNetidButton').on('click', (e)=>{
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
	})

	chrome.storage.sync.get(['netId'], (syncedData)=> {
		if(chrome.runtime.lastError){
			console.log(chrome.runtime.lastError.message)
		}

		if(syncedData.netId){
			document.getElementById('netId').value = syncedData.netId
		}
	})

})