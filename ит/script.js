// хадгалагдсан асуултууд
let questions = JSON.parse(localStorage.getItem("quiz")) || []

// хадгалах
function save(){
localStorage.setItem("quiz",JSON.stringify(questions))
}

// асуулт нэмэх
function addQuestion(){

let q = document.getElementById("question").value
let a1 = document.getElementById("a1").value
let a2 = document.getElementById("a2").value
let a3 = document.getElementById("a3").value
let correctIndex = document.getElementById("correct").value

if(!q || !a1 || !a2 || !a3){
alert("Бүх талбарыг бөглөнө үү")
return
}

let answers = [a1,a2,a3]

let question = {
q:q,
answers:answers,
correct:answers[correctIndex] // зөв хариуг текстээр хадгална
}

questions.push(question)

save()

renderQuiz()

// input цэвэрлэх
document.getElementById("question").value=""
document.getElementById("a1").value=""
document.getElementById("a2").value=""
document.getElementById("a3").value=""
}

// тестийг дэлгэцэнд гаргах
function renderQuiz(){

let quiz = document.getElementById("quiz")

quiz.innerHTML=""

questions.forEach((q,index)=>{

quiz.innerHTML += `
<div class="question">

<p><b>${index+1}. ${q.q}</b></p>

<label>
<input type="radio" name="q${index}" value="${q.answers[0]}">
${q.answers[0]}
</label><br>

<label>
<input type="radio" name="q${index}" value="${q.answers[1]}">
${q.answers[1]}
</label><br>

<label>
<input type="radio" name="q${index}" value="${q.answers[2]}">
${q.answers[2]}
</label>

<br><br>

<button class="delete" onclick="deleteQuestion(${index})">
🗑 Устгах
</button>

<div id="feedback${index}"></div>

</div>
`

})

}

// асуулт устгах
function deleteQuestion(index){

if(confirm("Энэ асуултыг устгах уу?")){

questions.splice(index,1)

save()

renderQuiz()

}

}

// тест шалгах
function checkQuiz(){

let score = 0

questions.forEach((q,index)=>{

let selected = document.querySelector(`input[name="q${index}"]:checked`)
let feedback = document.getElementById(`feedback${index}`)

if(selected){

if(selected.value == q.correct){

score++

feedback.innerHTML =
"<span class='correct'>✔ Зөв</span>"

}else{

feedback.innerHTML =
"<span class='wrong'>❌ Буруу</span><br>Зөв хариу: "+q.correct

}

}else{

feedback.innerHTML =
"<span class='wrong'>Хариулт сонгоогүй</span>"

}

})

document.getElementById("result").innerHTML =
"📊 Таны оноо: "+score+" / "+questions.length

}

// page load үед тест гаргах
renderQuiz()
