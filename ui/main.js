var button=document.getElementById("counter");
var counter=0;
button.onclick=function(){
    alert("hello");
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
};