let questions = JSON.parse(localStorage.getItem("quiz")) || []

function save(){
localStorage.setItem("quiz",JSON.stringify(questions))
}

function addQuestion(){

let q = document.getElementById("question").value

let a1 = document.getElementById("a1").value
let a2 = document.getElementById("a2").value
let a3 = document.getElementById("a3").value
let a4 = document.getElementById("a4").value
let a5 = document.getElementById("a5").value

let correctIndex = document.getElementById("correct").value

if(!q || !a1 || !a2 || !a3 || !a4 || !a5){
alert("Бүх талбарыг бөглөнө үү")
return
}

let answers = [a1,a2,a3,a4,a5]

let question = {
q:q,
answers:answers,
correct:answers[correctIndex]
}

questions.push(question)

save()

renderQuiz()

document.getElementById("question").value=""
document.getElementById("a1").value=""
document.getElementById("a2").value=""
document.getElementById("a3").value=""
document.getElementById("a4").value=""
document.getElementById("a5").value=""
}

function renderQuiz(){

let quiz = document.getElementById("quiz")

quiz.innerHTML=""

questions.forEach((q,index)=>{

quiz.innerHTML += `
<div class="question">

<p><b>${index+1}. ${q.q}</b></p>

<label><input type="radio" name="q${index}" value="${q.answers[0]}"> ${q.answers[0]}</label><br>
<label><input type="radio" name="q${index}" value="${q.answers[1]}"> ${q.answers[1]}</label><br>
<label><input type="radio" name="q${index}" value="${q.answers[2]}"> ${q.answers[2]}</label><br>
<label><input type="radio" name="q${index}" value="${q.answers[3]}"> ${q.answers[3]}</label><br>
<label><input type="radio" name="q${index}" value="${q.answers[4]}"> ${q.answers[4]}</label>

<br><br>

<button class="delete" onclick="deleteQuestion(${index})">🗑 Устгах</button>

<div id="feedback${index}"></div>

</div>
`

})

}

function deleteQuestion(index){

if(confirm("Энэ асуултыг устгах уу?")){

questions.splice(index,1)

save()

renderQuiz()

}

}

function checkQuiz(){

let score = 0

questions.forEach((q,index)=>{

let selected = document.querySelector(`input[name="q${index}"]:checked`)
let feedback = document.getElementById(`feedback${index}`)

if(selected){

if(selected.value == q.correct){

score++

feedback.innerHTML="<span class='correct'>✔ Зөв</span>"

}else{

feedback.innerHTML=
"<span class='wrong'>❌ Буруу</span><br>Зөв хариу: "+q.correct

}

}else{

feedback.innerHTML=
"<span class='wrong'>Хариулт сонгоогүй</span>"

}

})

document.getElementById("result").innerHTML =
"📊 Таны оноо: "+score+" / "+questions.length

}

renderQuiz()
