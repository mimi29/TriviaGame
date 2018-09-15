
var maxTime = 30;
var timeRemaining = 30;
var correctAns = 0;
var wrongAns = 0;
var timer;

var movieQuestions = [{
    question: "Tom Cruise was injured while filming a movie attempting to jump between building, which movie was it?",
    possibleAns: [
        "Mission Impossible III",
        "Mission Impossible-Rogue Nation",
        "Mission Impossible-Fallout"],
    answer: 3
}, {
    question: "Which James Bond film that is played by Daniel Craig and the feature theme is performed by Adele?",
    possibleAns: [
        "Skyfall",
        "For Your Eyes Only",
        "License to Kill"
    ],
    answer: 1
}, {
    question: "Which Indiana Jones film made Harrison Ford a household name?",
    possibleAns: [
        "Raiders of the Lost Art",
        "Indiana Jones and the Temple of Doom",
        "Indiana Jones and the Last Crusade"
    ],
    answer: 1
}, {
    question: "Which Ocean's series with all women cast?",
    possibleAns: [
        "Ocean's 8",
        "Ocean's Eleven",
        "Ocean's Twelve"],
    answer: 1
}, {
    question: "Who play Marty McFly in the Back to Future movies?",
    possibleAns: [
        "Ben Affleck",
        "Michael J. Fox",
        "Robert Downey Jr."
    ],
    answer: 2
}];

function updateTime() {
    timeRemaining--;

    if (timeRemaining >= 0) {
        $("#timeRemain").text(timeRemaining);
    }
    else {
        showResults();
    }
}

function generateQuestions() {
    $("#quizId").empty();
    for (var i = 0; i < movieQuestions.length; i++) {
        var title = $("<p>").text(i + 1 + ".  " + movieQuestions[i].question);
        $("#quizId").append(title);

        for (var j = 0; j < movieQuestions[i].possibleAns.length; j++) {
            // Create and append the radio buttons
            var radio1 = $("<input>").attr("type", "radio").attr("name", i).attr("value", j + 1);
            $("#quizId").append(radio1, movieQuestions[i].possibleAns[j]);
        }
        $("#quizId").append("<br>");
    };
}

function showResults() {
    clearInterval(timer);

    $('.container').hide();
    if (timeRemaining < 0) {
        $('#finalMessage').text("You are running out of time");
    }
    else {
        $('#finalMessage').text("Final results")
    }
    $('#correctAnswers').text("No. correct answers: "+correctAns);
    $('#inCorrectAnswers').text("No. incorrect answers:"+wrongAns);
    $('.results').show();
}

$(document).ready(function () {
    $('.container').hide();
    $('.results').hide();
    $('#instructionModal').show();

    $('#modalId').click(function () {
        $('#instructionModal').hide();
        $('.container').show();
        generateQuestions();
        timer = setInterval(updateTime, 1000);
    });

    $("#done").click(function () {
        $('container').show();
        for (var i = 0; i < movieQuestions.length; i++) {
            // Check value of radio buttons by name
            var value = parseInt($("input[name=" + i + "]:checked").attr("value"))

            if (value === movieQuestions[i].answer) {
                correctAns++;
            } else {
                wrongAns++;
            }
        }

        // show results page
        showResults();
    });

});