var helper={
	workList:[],
	funList:[],
	docWorkList:document.getElementById('workList'),
	docFunList:document.getElementById('funList'),
	workCheckNameSpan:document.getElementById('work-checkName-span'),
	workCheckRankSpan:document.getElementById('work-checkRank-span'),
	funCheckNameSpan:document.getElementById('fun-checkName-span'),
	funCheckRankSpan:document.getElementById('fun-checkRank-span'),
	itemLen:0,
	currentTotalRankValue:0
};
function getCookieObject(){
	if (docCookies.hasItem('object')) {
		var text=docCookies.getItems('object'),
		object=JSON.parse(text);
		return object;
	}
	return null;
}
function getCookieTotalRankValue(){
	if (docCookies.hasItem('totalRankValue')) {
		var totalRankValue=parseInt(docCookies.getItems('totalRankValue'));
		return totalRankValue;
	}
	return 0;
}
function init(){
	var object=getCookieObject();
	helper.currentTotalRankValue=getCookieTotalRankValue();
	if (object!=null) {
		helper.workList=object.workList;
		helper.funList=object.funList;
		createEleList(0);
	};
	var workItem=document.getElementById("workItem"),
	funItem=document.getElementById('funItem'),
	workAdd=document.getElementById('workAdd'),
	funAdd=document.getElementById('funAdd'),
	workConfirmButton=document.getElementById('workConfirmButton'),
	workCancelButton=document.getElementById('workCancelButton'),
	funConfirmButton=document.getElementById('funConfirmButton'),
	rankDivSpan=document.getElementById('current-rank-value'),
	rankDivInput=document.getElementById('clear-total-value'),
	funCancelButton=document.getElementById('funCancelButton');
	rankDivSpan.innerHTML=helper.currentTotalRankValue;
	DOMhelp.addEvent(rankDivInput,'click',clearRankValue,false);
	DOMhelp.addEvent(workItem,'click',listChange,false);
	DOMhelp.addEvent(funItem,'click',listChange,false);
	DOMhelp.addEvent(workAdd,'click',addItem,false);
	DOMhelp.addEvent(funAdd,'click',addItem,false);
	DOMhelp.addEvent(workConfirmButton,'click',saveItem,false);
	DOMhelp.addEvent(funConfirmButton,'click',saveItem,false);
	DOMhelp.addEvent(workCancelButton,'click',function(e){var target=DOMhelp.getTarget(e);parent=target.parentNode;DOMhelp.cssjs('add',parent,'dis-none');},false);
	DOMhelp.addEvent(funCancelButton,'click',function(e){var target=DOMhelp.getTarget(e);parent=target.parentNode;DOMhelp.cssjs('add',parent,'dis-none');},false);
}
function createEleList(flag){
	var docFragment=document.createDocumentFragment(),
	nameSpan=document.createElement('span'),
	rankSpan=document.createElement('span'),
	li=document.createElement('li'),
	item=null,
	cancelButton=document.createElement('button');
	cancelButton.value="删除";
	helper.itemLen=0;
	DOMhelp.addEvent(cancelButton,'click',deleteItem,false);
	switch(flag){
		case 0:;
		case 1:
			for(var i=0;i<helper.workList.length;i++){
				item=helper.workList[i];
				var li=setListLi(item.name,item.rank);
				docFragment.appendChild(li);
				helper.itemLen++;
				console.log(docFragment);
			}
			helper.docWorkList.appendChild(docFragment);
			console.log(docFragment+'1');
			if (flag==0) {helper.itemLen=0;createEleList(2);};
		break;
		case 2: 
			for(i=0;i<helper.funList.length;i++){
				item=helper.funList[i];
				var li=setListLi(item.name,item.rank);
				docFragment.appendChild(li);
				helper.itemLen++;
				console.log("2"+docFragment);
	    	}
			helper.docFunList.appendChild(docFragment);
		break;
	}
}
function listChange(elm){
	var	list,flag=true;
	if (elm!=undefined&&!elm.stopPropagation) {
		list=elm;
		flag=false;
	}
	else{
		var evt=DOMhelp.getEvent(elm),
		workItem=document.getElementById("workItem"),
		list1=helper.docWorkList,
	    list2=helper.docFunList,
	    workDiv=document.getElementById('workDiv'),
		funDiv=document.getElementById('funDiv'),
		target=DOMhelp.getTarget(evt);
		list=(target===workItem?list1:list2);
		div=(target===workItem?workDiv:funDiv);
	}
	if (!DOMhelp.cssjs('check',list,'dis-none')&&flag) {
		DOMhelp.cssjs('add',list,'dis-none');
	}
	else{
		DOMhelp.cssjs('remove',list,'dis-none');
	}
	DOMhelp.cssjs('add',div,'dis-none');
	DOMhelp.cancelClick(evt);	
}//显示或隐藏列表
function addItem(e){
	var evt=DOMhelp.getEvent(e),
	target=DOMhelp.getTarget(evt),
	list1=document.getElementById('workDiv'),
	list2=document.getElementById('funDiv'),
	workAdd=document.getElementById('workAdd'),
	list=(target===workAdd?list1:list2);
	targetType=(target===workAdd?'work':'fun');
	var input1=list.getElementsByTagName('input')[0],
	input2=list.getElementsByTagName('input')[1];
	input1.value='';
	input2.value='';
	helper[targetType+'CheckNameSpan'].innerHTML='';
	helper[targetType+'CheckRankSpan'].innerHTML='';
	DOMhelp.cssjs('remove',list,'dis-none');
	DOMhelp.cancelClick(evt);
}//增加列表项
function listItem(name,rank){
	this.name=name;
	this.rank=rank;
	return this;
}
function saveItem(e){
	var evt=DOMhelp.getEvent(e),
	target=DOMhelp.getTarget(evt),li,list,docList,item,
	targetType=target.getAttribute('data-type');
	helper[targetType+'CheckNameSpan'].innerHTML='';
	helper[targetType+'CheckRankSpan'].innerHTML='';
	list=(targetType==="work"?helper.workList:helper.funList);
	docList=(targetType==="work"?helper.docWorkList:helper.docFunList);
	var name=document.getElementById(targetType+'-item-name'),
	rank=document.getElementById(targetType+'-item-rank');
	if (name.value=='') {
		helper[targetType+'CheckNameSpan'].innerHTML='请输入名称！！';
		name.focus();
		return false;
	};
	if (rank.value=='') {
		helper[targetType+'CheckRankSpan'].innerHTML="请输入星值！！";
		rank.focus();
		return false;
	};
	for (var i = 0; i < list.length; i++) {
		if (list[i].name==name.value) {
			helper[targetType+'CheckNameSpan'].innerHTML='该名称已经存在！！';
			name.focus();
			return false;
		};
	};
	if (rank.value.match(/[a-z]+/i)!=null||rank.value.match(/\W+/)!=null) {
		helper[targetType+'CheckRankSpan'].innerHTML="输入的星值不符合规范！！";
		rank.focus();
		return false;
	};
	item=new listItem(name.value,rank.value);
	helper.itemLen=list.length;
	list.push(item);
	var object=getCookieObject();
	if (object==null) {
		object={workList:[],funList:[]};
	}
	object[targetType+'List']=helper[targetType+'List'];
	var text=JSON.stringify(object);
	docCookies.removeItem('object');
	docCookies.setItem('object',text,Infinity);
	li=setListLi(item.name,item.rank);
	docList.appendChild(li);
	listChange(docList);
}
function setListLi(nameValue,rankValue){
	var nameSpan=document.createElement('span'),
	rankSpan=document.createElement('span'),
	li=document.createElement('li'),
	cancelButton=document.createElement('button');
	cancelButton.appendChild(document.createTextNode("删除"));
	DOMhelp.addEvent(cancelButton,'click',deleteItem,false);
	nameSpan.appendChild(document.createTextNode(nameValue));
	rankSpan.appendChild(document.createTextNode(rankValue));
	cancelButton.setAttribute('data-index',helper.itemLen);
	li.appendChild(nameSpan);
	li.appendChild(rankSpan);
	li.appendChild(cancelButton);
	DOMhelp.addEvent(li,'click',modifyRankValue,false);
	li.setAttribute('data-index',helper.itemLen);
	return li;
}
function deleteItem(e){
	var evt=DOMhelp.getEvent(e),
	target=DOMhelp.getTarget(evt),
	object=getCookieObject(),
	listType=target.parentNode.parentNode.getAttribute('data-type');
	itemIndex=parseInt(target.getAttribute('data-index'));
	list=helper[listType+'List'];
	list.splice(itemIndex,1);
	object[listType+'List']=list;
	var text=listType.replace(/\b\w+\b/g,function(word){
		                                   return word.substring(0,1).toUpperCase()+word.substring(1);});
	helper['doc'+text+'List'].innerHTML='';
	var flag=(listType==='work'?1:2);
	createEleList(flag);
	docCookies.removeItem('object');
	docCookies.setItem('object',JSON.stringify(object));
	DOMhelp.cancelClick(evt);
}
function modifyRankValue(e){
	var evt=DOMhelp.getEvent(e),
	target=DOMhelp.getTarget(evt);
	if (target.tagName.toLowerCase()!='li') {
		target=target.parentNode;
	};
	var itemIndex=parseInt(target.getAttribute('data-index')),
	targetType=target.parentNode.getAttribute('data-type'),
	currentList=helper[targetType+'List'],
	item=currentList[itemIndex],
	itemRankValue=parseInt(item.rank);
	if (targetType=='work') {
		helper.currentTotalRankValue+=itemRankValue;
	}
	else if (helper.currentTotalRankValue>=itemRankValue){
		helper.currentTotalRankValue-=itemRankValue;
	}
	else{
		alert('星值不够！！');
		DOMhelp.cancelClick(e);
		return false;
	}
	var
	rankDivSpan=document.getElementById('current-rank-value');
	rankDivSpan.innerHTML=helper.currentTotalRankValue;
	docCookies.removeItem('totalRankValue');
	docCookies.setItem('totalRankValue',helper.currentTotalRankValue,Infinity);
	DOMhelp.cancelClick(evt);
}
function clearRankValue(e){
	var evt=DOMhelp.getEvent(e),
	target=DOMhelp.getTarget(evt),
	totalRankValueSpan=document.getElementById('current-rank-value');
	helper.currentTotalRankValue=0;
	totalRankValueSpan.innerHTML=helper.currentTotalRankValue;
	docCookies.removeItem('totalRankValue');
	docCookies.setItem('totalRankValue',helper.currentTotalRankValue,Infinity);
}
DOMhelp.addEvent(window,'load',init);