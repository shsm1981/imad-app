
 var button1=document.getElementById('counter');
var counter=1;
  
button1.onClick=function(){
  
    counter=counter+1;alert(counter);
    var span=document.getElementById('count');
   
    span.innerHTML=counter.toString();
};