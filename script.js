const num=document.getElementById("num"),
result=document.getElementById("result"),
answer=document.getElementById("answer"),
detail=document.getElementById("detail"),
history=document.getElementById("history"),
total=document.getElementById("total"),
even=document.getElementById("even"),
odd=document.getElementById("odd"),
icon=document.getElementById("icon");

let data=JSON.parse(localStorage.getItem("evenly"))||
{total:0,even:0,odd:0,history:[]};

function save(){
localStorage.setItem("evenly",JSON.stringify(data));
total.textContent=data.total;
even.textContent=data.even;
odd.textContent=data.odd;

history.innerHTML=data.history.map(x=>
`<li><span>${x.n}</span><b>${x.type}</b></li>`).join("");
}

function check(){
if(num.value.trim()==="")
return alert("Please enter a whole number.");

const n=Number(num.value);

if(!Number.isInteger(n))
return alert("Please enter a whole number only.");

const isEven=n%2===0;
const type=isEven?"EVEN":"ODD";

answer.textContent=type+" NUMBER";
detail.textContent=isEven
?"Divisible by 2 with no remainder."
:"Leaves a remainder of 1 when divided by 2.";

icon.textContent=isEven?"✓":"✕";
icon.className=isEven?"even-icon":"odd-icon";

data.total++;
isEven?data.even++:data.odd++;

data.history.unshift({n,type});
data.history=data.history.slice(0,5);

save();

result.animate(
[{transform:"scale(.96)",opacity:.5},
{transform:"scale(1)",opacity:1}],
{duration:300}
);
}

document.getElementById("check").onclick=check;

num.addEventListener("keydown",e=>{
if(e.key==="Enter")check();
});

document.getElementById("random").onclick=()=>{
num.value=Math.floor(Math.random()*1000)-500;
check();
};

document.getElementById("clear").onclick=()=>{
num.value="";
answer.textContent="—";
detail.textContent="Your result will appear here.";
icon.textContent="✓";
icon.className="even-icon";
};

document.getElementById("clearHistory").onclick=()=>{
data.history=[];
save();
};

document.getElementById("theme").onclick=()=>{
document.body.classList.toggle("light");
document.getElementById("theme").textContent=
document.body.classList.contains("light")?"☀":"☾";
};

save();