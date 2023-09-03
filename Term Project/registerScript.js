$(document).ready(function() {
    // Validation before submition
    $("form").submit(function(event) {
        event.preventDefault(); // Prenting the submission
  
        var firstName = $("#first").val();
        var lastName = $("#last").val();
        var studentID = $("#user").val();
        var email = $("#email").val();
        var password = $("#pass").val();
  
        // Regexes 
        var nameRegex = /^[A-Za-z- ]{2,}$/g;
        var studentIDRegex = /^\d{8}$/g;
        var emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/g;
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!$\.])[0-9a-zA-Z@!$\.]{8,24}$/g;
  
      
        if (!nameRegex.test(firstName)) {
            alert("[INVALID FIRST NAME] --> It should have at least 2 letters and allow '-' and space characters.");
            return;
        }
    
        if (!nameRegex.test(lastName)) {
            alert("[INVALID LAST NAME] --> It should have at least 2 letters and allow '-' and space characters.");
            return;
        }
  
        if (!studentIDRegex.test(studentID)) {
            alert("[INVALID STUDENTID] --> It should be an 8-digit number.");
            return;
        }
  
        var digitSum = studentID.split("").reduce(function(acc, digit) {
            return acc + parseInt(digit);
        }, 0);
        if (![34, 38, 42, 59].includes(digitSum)) {
            alert("[INVALID STUDENTID] --> The sum of the digits should be either 34, 38, 42, or 59.");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("[INVALID EMAIL] --> Please enter a valid email address.");
            return;
        }
    
        if (!passwordRegex.test(password)) {
            alert("[INVALID PASSWORD] --> It should have 8 to 24 characters, at least 1 digit, 1 capital letter, 1 lowercase letter, and allow '@', '!', '$', and '.'.");
            return;
        }

        $.ajax({
            url: "registration.php",
            type: "POST",
            data: $("form").serialize(),
            success: function(response) {
            
            var responseData = JSON.parse(response);
            
            if (responseData.code === "1") {
                // The registration is successful
                alert(responseData.message);
            } else {
                // The registration failed
                alert(responseData.message);
            }
            },
            error: function(xhr, status, error) {
            // Handle the error response
            alert("The Registration has failed. Please try again.");
            }
        });
      
    });
  });
  