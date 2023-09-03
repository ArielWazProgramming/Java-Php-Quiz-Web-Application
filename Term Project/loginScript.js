$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault(); 

        $.ajax({
            url: "login.php",
            type: "POST",
            data: $(this).serialize(),
            success: function(response) {
                var responseData = JSON.parse(response);

                if (responseData.code === 1) {
                    // 1 means successful
                    alert("Welcome to the Questionnaire!");
                    window.location.href = "Questionnaire.html";
                } else {
                    alert(responseData.message);
                }
            },
            error: function(xhr, status, error) {
                alert("The Login has failed. Please try again.");
            }
        });
    });
});