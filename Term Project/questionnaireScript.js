$(document).ready(function() {
    var currentPage = 1;
    var questionsPerPage = 10;
    var questionsData;
  
    $.getJSON("questions.json", function(data) {
        questionsData = data;
        loadQuestions();
    });
  
    function loadQuestions() {
        var start = (currentPage - 1) * questionsPerPage;

        var end = start + questionsPerPage;

        var selectedLanguage = $("#languageSelect").val();

        var questions = questionsData.filter(function(question) {
            return question.language === selectedLanguage;
        }).slice(start, end);

        var questionSection = $("#questionSection");
        questionSection.empty();
    
        $.each(questions, function(index, question) {
            var questionElement = $("<div class='question'>");
            questionElement.append("<h3>Question " + (start + index + 1) + "</h3>");
            questionElement.append("<p>" + question.question + "</p>");
    
            if (question.type === "true-false") {
            questionElement.append("<input type='radio' name='answer" + question.id + "' value='1'>True<br>");
            questionElement.append("<input type='radio' name='answer" + question.id + "' value='2'>False<br>");
            }
    
            questionSection.append(questionElement);
      });
  
    if (end >= questionsData.length) {
        $("#nextButton").hide();
        $("#submitButton").show();
    } else {
        $("#nextButton").show();
        $("#submitButton").hide();
        }
    }
  
    $("#nextButton").click(function() {
        currentPage++;
        loadQuestions();
    });
  
    $("#languageSelect").change(function() {
        currentPage = 1;
        loadQuestions();
    });
  
    
    $("#questionForm").submit(function(event) {
        event.preventDefault(); // Prevent form submission

        // Calculatating the result
        var answers = $("#questionForm").serializeArray();
        var correctnessResult = 0;
        answers.forEach(function(answer) {
            var questionId = answer.name.substring(6); 
            var question = questionsData.find(function(question) {
                return question.id === questionId;
            });
    
            if (question && question.answerId === answer.value) {
                correctnessResult++;
            }
        });
    
        var totalQuestions = Math.min(questionsData.length, (currentPage - 1) * questionsPerPage + answers.length);
        var correctnessPercentage = (correctnessResult / totalQuestions) * 100;
            alert("You got a grade of: " + correctnessPercentage + "%");
    });
  });