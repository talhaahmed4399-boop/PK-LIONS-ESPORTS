function join(){
alert("Tournament registration coming soon");
}

function calc(){
let r=document.getElementById("rank").value;
let p=0;
if(r==1)p=10;
if(r==2)p=6;
if(r==3)p=4;
document.getElementById("result").innerHTML="Points: "+p;
}
