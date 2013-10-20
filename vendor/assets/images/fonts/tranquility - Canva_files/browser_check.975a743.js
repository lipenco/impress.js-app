
var VERSION_CHROME = 27;
var VERSION_SAFARI = 6;
var VERSION_FIREFOX = 23;

if (
	(bowser.chrome && bowser.version < VERSION_CHROME) ||
	(bowser.safari && bowser.version < VERSION_SAFARI) ||
	(bowser.firefox && bowser.version < VERSION_FIREFOX && bowser.version != 3.6) ||
	(bowser.msie) ||
	// IE11
	(window.navigator.userAgent.match(/Trident/)) ||
	(bowser.opera) ||
	(bowser.mobile)
) {
	if (!(Storage!==undefined && localStorage.ignore_browser_cache)) {
		window.location.href = '/unsupported';
	}
}
