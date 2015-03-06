function addUser(){
            
    window.location.href = '/frais/add';
}
function cancelAdd(){
    
    window.location.href = '/frais';
}

function cancelCommentAdmin(){
    
    window.location.href = '/admin/index';
}

function removeEditer(){

	var link = document.getElementsByClassName("a-inside edit")[0];
	link.parentNode.removeChild(link);
	

}
/*
window.onload = function(){
  var divs = document.getElementsByTagName("a");
	//alert(<%=data[i].status%>);	
  for(var i=0, len=divs.length;i < len; i++){
  		
	   // if(data[i].status==1 || data[i].status==3){
	    if(divs[i].className=="a-inside edit" ){removeEditer()}
			//}
  }
};*/
