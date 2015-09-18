var docCookies={
	getItems:function(sKey){
		if (!sKey) {return null;}
		if (docCookies.hasItem(sKey)) {return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
	}
	    else return null;
		
	},
	setItem:function(sKey,sValue,vEnd,sDomain,sPath,bSecure){
		if(!sKey||/^(?:expires|max\-age|domain|path|secure)$/i.test(sKey)){return false;};
		var expires="";
		if (vEnd) {
			switch(vEnd.constructor){
				case Number:
				expires=vEnd===Infinity?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+vEnd;
				break;
				case String:
				expires="; expires="+vEnd;
				break;
				case Date:
				expires="; expires="+vEnd.toUTCString();
				break;
			}
		};
		document.cookie=encodeURIComponent(sKey)+"="+encodeURIComponent(sValue)+expires+(sDomain?"; domain="+sDomain:'')+(sPath?"; path="+sPath:'')+(bSecure?"; secure":'');
		return true;
	},
	hasItem:function(sKey){
		return (new RegExp("(?:^|;\\s*)"+encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&")+"\\s*\\=")).test(document.cookie);
	},
	removeItem:function(sKey, sPath, sDomain){
		if (!sKey||!this.hasItem(sKey)) {return false;}
		document.cookie=encodeURIComponent(sKey)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(sPath?"; path="+sPath:'')+(sDomain?"; domain="+sDomain:'');
		return true;
	},
	keys:function () {
    	var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    	for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    	return aKeys;
	}
}