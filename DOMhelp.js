DOMhelp={
	init:function(){
		if (!document.getElementById||document.createTextNode) {return};
	},
	cssjs:function(a,o,c1,c2){
		switch(a){
			case 'check':
			     var found=false;
			     var tempArrary=o.className.split(' ');
			     for (var i = 0; i < tempArrary.length; i++) {
				     if (tempArrary[i]==c1) {found=true;};
				     break;
			     };
			     return found;
			break;
			case 'swap':
			    o.className=!DOMhelp.cssjs('check',o,c1)?o.className.replace(c2,c1):o.className.replace(c1,c2);
			break;
			case 'add':
				if (!DOMhelp.cssjs('check',o,c1)) {o.className+=o.className?' '+c1:c1;};
			break;
			case 'remove':
				if (DOMhelp.cssjs('check',o,c1)) {
					o.className=o.className.replace(c1,'');
				};
			break;
		}
	},
	addEvent: function(elm, evType, fn, useCapture){
		if (elm.addEventListener){
			elm.addEventListener(evType, fn, useCapture);
			return true;
		} else if (elm.attachEvent) {
			var r = elm.attachEvent('on' + evType, fn);
			return r;
		} else {
			elm['on' + evType] = fn;
		}
	},
	hasChild:function(elmF,elm){
		for (var i = 0; i < elmF.childNodes.length; i++) {
			if (elmF.childNodes[i]===elm) {return true};
		};
		return false;
	},
	removeEvent: function(elm,evType,fn,useCapture){
		if (elm.removeEventListener) {
			elm.removeEventListener(evType,fn,useCapture);
		}
		else if (elm.detachEvent) {
			elm.detachEvent('on'+evType,fn);
		}
		else{
			elm['on'+evType]=null;
		}
	},
	cancelClick:function(o){
		if (window.event) {
			window.event.cancelBubble=true;
			window.event.returnValue=false;
		};
		if (o&&o.stopPropagation&&o.preventDefault) {
			o.stopPropagation();
			o.preventDefault();
		};
	},
	firstTrueChild:function(elm){
		for (var i = 0; i < elm.childNodes.length; i++) {
			if (elm.childNodes[i].nodeType==1||elm.childNodes[i]==null) {
				var tempElm=elm.childNodes[i];
				break;
			};
		};
		return (tempElm.nodeType==1)?tempElm:false;
	},
	nextTrueSibling:function(elm){
		var tempElm=elm.nextSibling;
		while(tempElm.nodeType!=1&&tempElm!=null){
			tempElm=tempElm.nextSibling;
		}
		return (tempElm.nodeType==1)?tempElm:false;
	},
	addFocus:function(elm){
		if (!elm.hasFocus()) {
			elm.focus();
			return true;
		}
		else return false;
	},
	getElementLeft:function(elm){
		var elmParent=elm.offsetParent;
		var elmLeft=elm.offsetLeft;
		while (elmParent) {
			elmLeft+=elmParent.offsetLeft;
			elmParent=elmParent.offsetParent;
		};
		return elmLeft;
	},
	getElementTop:function(elm){
		var elmParent=elm.offsetParent;
		var elmTop=elm.offsetTop;
		while (elmParent) {elmTop+=elmParent.offsetTop;
			elmParent=elmParent.offsetParent};
		return elmTop;
	},
	scrollToTop:function(elm,num){
		if (elm.scrollTop!=num) {
			elm.scrollTop=num;
		};
	},
	scrollToLeft:function(elm,num){
		if (elm.scrollLeft!=num) {
			elm.scrollLeft=num;
		};
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getCurrentTarget:function(event){
		return event.currentTarget;
	},
	stopPagation:function(event){
		if (event.stopPagation) {
			event.stopPropagation();
		}
		else {
			event.cancelBubble=true;
		};
	},
	preventDefault:function(event){
		if (event.preventDefault) {
			event.preventDefault();
		}
		else{
			event.returnValue=false;
		};
	},
	getTarget:function(event){
		return event.target||event.srcElement;
	},
	getRelativeTarget:function(event){
		var relativeTarget=null;
		if (event.relatedTarget) {
			relativeTarget=event.relatedTarget;
		}
		else if (event.fromElement) {
			relativeTarget=event.fromElement;
		}
		else{
			relativeTarget=event.toElement;
		}
		return relativeTarget;
	},
	getButton:function(event){
		if (document.implementation.hasFeature('mouseEvents','2.0')) {
			return event.button;
		}
		else {
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
				return 0;
				case 2:
				case 6:
				return 2;
				case 4:
				return 1;
			}
		}
	}
}