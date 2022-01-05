
function begin(){
    document.getElementById("beginbtn").style.display = "none";
    document.getElementById("welcome-msg").style.display = "none";
    poseQuestion();
}
var btncount = 0;
function poseQuestion(){
    
    var questions;
    $.getJSON("https://opentdb.com/api.php?amount=1000",function(data){
        questions = data.results;

        var question = questions[Math.floor(Math.random() * questions.length)]
        document.getElementById("questionframe").innerHTML = question.question;

        let allAns = question.incorrect_answers;
        allAns.push(question.correct_answer);
        allAns = shuffle(allAns);
        
        
        for(let i =0; i < allAns.length; i++){
            let ansBut = document.createElement("button");
            ansBut.innerHTML = allAns[i];
            ansBut.id= String(btncount);
            document.getElementById("btnframe").appendChild(ansBut);
            ansBut.onclick = function(){validateAnswer(ansBut.id, question.correct_answer);};  
            btncount++;
        }

        var timeleft = 10;
        document.getElementById("timer").hidden = false; 
        var qsTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(qsTimer);
            document.getElementById("timer").innerHTML = "Time's up!";
        } else {
            document.getElementById("timer").innerHTML = timeleft + " seconds remaining";
        }
        timeleft -= 1;
        }, 1000);

        document.getElementById("next").disabled = true;
        document.getElementById("next").style.background = "yellow";
        document.getElementById("next").style.color = "black";

        setTimeout(() => {  
            document.getElementById("questionframe").innerHTML ="";
            if(document.getElementById("rightAns"))
                document.getElementById("rightAns").remove();
            removeAllbuttons();
            document.getElementById("next").disabled = false;
            document.getElementById("next").style.background = "green";
            document.getElementById("next").style.color = "white";
            document.getElementById("timer").innerHTML = "Time's up!";
            }, 11000);
    });
    
    
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function validateAnswer(btn, correct_ans){
    console.log(document.getElementById(btn).innerHTML);
    if(document.getElementById(btn).innerHTML == correct_ans){
        document.getElementById(btn).style.background = "#00FF00";
          
        var rightAns = document.createElement("p");

        rightAns.innerHTML = "Correct!";
        rightAns.id = "rightAns";
        rightAns.align = "center";
        document.body.appendChild(rightAns);
        
    }
    else{
        document.getElementById(btn).style.background = "#FF0000";
    
        var rightAns = document.createElement("p");
       
        rightAns.innerHTML = "Correct answer: " + correct_ans;
        rightAns.id = "rightAns";
        rightAns.align = "center";
        document.body.appendChild(rightAns);
    }

    let buttons = document.getElementsByTagName("button");

    for(let i = 0; i < buttons.length; i++){
        buttons[i].disabled = true;
    }
}

function removeAllbuttons(){
    buttons = document.getElementsByTagName("button");
    //console.log(buttons)
    for(let i =0; i < buttons.length; i++){
        //console.log(i);
        if(buttons[i].innerHTML == "Next Question"){
            continue;
        }
       buttons[i].style.display = "none";
       buttons[i].disabled = true; 
    }
}


