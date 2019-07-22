checkToken();

$(document).ready ( function () {

  $("#signupbtn").click(function() {
    $("#signin").fadeOut("fast", function() {
      $("#main-container-reg").fadeIn("fast");
      $('body').css("background-image", "none");  
    });
  });

  $("#signinbtn").click(function() {
    $("#main-container-reg").fadeOut("fast", function() {
      $("#signin").fadeIn("fast");
      $('body').css("background-image", "url('app/plane.png')");  
    });
  });

    $("#inputSubscription").change(function() {
      if($("#inputSubscription").val() == "personal")
      {
        $('#address').css("display", "block");
        document.getElementById("inputForename").required = true;
        document.getElementById("inputSurname").required = true;
        document.getElementById("inputStreet").required = true;
        document.getElementById("inputTownCity").required = true;
        document.getElementById("inputPostcode").required = true;  
      }
      else
      {
        $('#address').css("display", "none");  
        document.getElementById("inputForename").required = false;
        document.getElementById("inputSurname").required = false;
        document.getElementById("inputStreet").required = false;
        document.getElementById("inputTownCity").required = false;
        document.getElementById("inputPostcode").required = false;
      }
  });

});

function checkToken()
{
        var token = localStorage.getItem('token');
        $.getJSON("php/check_token.php?token="+ token, function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        console.log(obj);
        if(obj.status=='VALID')
        {
          localStorage.setItem('user', obj.user);
          location.replace("./app");
        }
    });
}

$("#form").submit(function(e) {
	
e.preventDefault();

var email = document.getElementById("email").value;

var password = document.getElementById("password").value;


if(testEmail(email)) {

     var query = {"email": email, "password": password};

     var json = JSON.stringify(query);

     $(document).ready(function(){

        $.ajax ({
            type: "POST",
            dataType: "json",
            url: "php/login.php",
            data: { data : json },
            success: function( result ) {

            console.log(result);
            		
		       if(result.status == "OK"){
          localStorage.setItem('token', result.token);
			    checkToken();
			   
			   } else {
				   
				 showErrorLogin();
				 setTimeout(hideErrorLogin, 2000);
				 
			    }
            }
        });
     });
	
} else {
   
   showErrorEmail();
   setTimeout(hideErrorEmail, 2000);
}	
});

// check if email address is valid
function testEmail(email) {
	
	if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
		
		return true;
		
	} else {
		
		return false;
	}
}
function showErrorLogin() {
  var x = document.getElementById("errorLogin");
  x.style.display = "block";
}
function hideErrorLogin() {
  var x = document.getElementById("errorLogin");
  x.style.display = "none";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}
 function showErrorEmail() {
  var x = document.getElementById("errorEmail");
  x.style.display = "block";
}
function hideErrorEmail() {
  var x = document.getElementById("errorEmail");
  x.style.display = "none";
  document.getElementById('email').value = "";
  document.getElementById('password').value = "";
}

/* registration */

$("#regForm").submit(function(e) {


e.preventDefault();

//user input
var email = document.getElementById("inputEmail").value;

var password = document.getElementById("inputPassword").value;

var password2 = document.getElementById("inputPassword2").value;

var forename = document.getElementById("inputForename").value;

var surname = document.getElementById("inputSurname").value;

var street = document.getElementById("inputStreet").value;

var townCity = document.getElementById("inputTownCity").value;

var postcode = document.getElementById("inputPostcode").value;

var subscription = document.getElementById("inputSubscription").value;

//test email address
var emailTest = testEmail(email);

//test postcode
var postcodeTest =  isValidPostcode(postcode);

if (password == password2)
{

if(emailTest==true) {
  
var query = {
           "email": email, 
             "password": password, 
             "forename": forename,
             "surname": surname,
             "street": street, 
             "townCity": townCity, 
             "postcode": postcode, 
             "subscription": subscription
             };

        var json = JSON.stringify(query);

     $(document).ready(function(){

         $.ajax ({
            type: "POST",
            dataType: "json",
            url: "php/registration.php",
            data: { data : json },
            success: function( result ) {
        //alert(result.sendToPaypal);
                           
         if (result.emailRegistered === "true" ){
            showErrorEmail();
                document.getElementById('errorEmail').innerHTML = "Email is alread registered!";
          var scroll = document.getElementById("inputEmail");
                    scroll.scrollIntoView(); 
                    setTimeout(hideErrorEmail, 2000);
          clearAllFields();
              
         }
         else
         { 
           if (result.sendToPaypal === "false"){
              document.location.replace("regMessage.html");
           }
           else
           {
            document.forms["paypalForm"].submit();
           }
        }

         }

        });
     });

     } else {
     if(!emailTest) {
       showErrorEmail();
       document.getElementById('errorEmail').innerHTML = "Invalid email address!";
       var scroll = document.getElementById("inputEmail");
           scroll.scrollIntoView(); 
           setTimeout(hideErrorEmail, 2000);
     }
       if(!postcodeTest){
       showErrorPostcode();
       var scroll = document.getElementById("inputPostcode");
           scroll.scrollIntoView();
           setTimeout(hideErrorPostcode, 2000);
     }     
   }
 }
 else
 {
  document.getElementById('pass').innerHTML = 'Password - <span style="color:red;">Passwords do not match</span>';
 }
});

// check if email address is valid
function testEmail(email) {
  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    
    return true;
    
  } else {
    
    return false;
  }
}

// check if postcode valid
function isValidPostcode(p) {
  var postcodeRegEx = /[A-Z]{1,2}[A-Z0-9]{1,2} ?[0-9][A-Z]{2}/i;
  return postcodeRegEx.test(p);
}

// format valid postcode
function formatPostcode(p) { 
    if (isValidPostcode(p)) { 
        var postcodeRegEx = /(^[A-Z]{1,2}[0-9]{1,2})([0-9][A-Z]{2}$)/i; 
        return p.replace(postcodeRegEx,"$1 $2"); 
    } else {
        return p;
    }
}
// change email error message 
function newErrorEmailMsg(msg) {
  showErrorEmail();
  document.getElementById('errorEmail').value = msg;
  
  setTimeout(hideErrorEmail, 2000);
  document.getElementById('errorEmail').value = "";
}


function showErrorEmail() {
  var x = document.getElementById("errorEmail");
  x.style.display = "block";
}

function hideErrorEmail() {
  var x = document.getElementById("errorEmail");
  x.style.display = "none";
  document.getElementById('inputEmail').value = "";
}

 function showErrorPostcode() {
  var x = document.getElementById("errorPostcode");
  x.style.display = "block";
}

 function hideErrorPostcode() {
  var x = document.getElementById("errorPostcode");
  x.style.display = "none";
  document.getElementById('inputPostcode').value = "";
}
function clearAllFields() {
document.getElementById('inputEmail').value = "";
document.getElementById('inputPassword').value = "";
document.getElementById('inputPassword2').value = "";
document.getElementById('inputForename').value = "";
document.getElementById('inputSurname').value = "";
document.getElementById('inputStreet').value = "";
document.getElementById('inputTownCity').value = "";
document.getElementById('inputPostcode').value = "";
document.getElementById('inputSubscription').value = "";
}
  
