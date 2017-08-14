
 var button=document.getElementById('counter');
var counter=0;

button.onclick=function(){

    counter=counter+1;
    
    var span=document.getElementById('count');
     alert(counter);
    span.innerHTML=counter.toString();
};