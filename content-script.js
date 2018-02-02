chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
	if(request.msg === 'saveNetId'){
		document.getElementById('user_id').value = request.netId
	}
})