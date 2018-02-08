let usernameCssId = 'user_id'
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=> {
	if(request.msg === 'saveNetId'){
		document.getElementById(usernameCssId).value = request.netId
	}
})