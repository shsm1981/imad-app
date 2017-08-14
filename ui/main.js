
 var button=document.getElementById('counter');
var counter=1;
  alert(button);
button.onClick=function(){
  
    counter=counter+1;alert(counter);
    var span=document.getElementById('count');
   
    span.innerHTML=counter.toString();
};