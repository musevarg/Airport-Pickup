checkToken();
getData();

function checkToken()
{
        var token = localStorage.getItem('token');
        $.getJSON("../php/check_token.php?token="+ token, function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        if(obj.status!='VALID')
        {
          localStorage.setItem('user', obj.user);
          location.replace("../");
        }
    });
}

function getData()
{
    var user = localStorage.getItem('user');

    $.getJSON("../php/get_profile.php?id=" + user, function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        document.getElementById('profile').innerHTML = `<hr>
  <div class="details"><b>Email</b><br>`+obj.email+`</div><hr>
  <div class="details"><b>Firstname</b><br>`+obj.forename+`</div><hr>
  <div class="details"><b>Lastname</b><br>`+obj.surname+`</div><hr>
  <div class="details"><b>Address</b><br>`+obj.street+ `, ` +obj.city+ `, ` +obj.postcode+ `</div><hr>
  <div class="details"><b>Subscription type</b><br>`+`</div><hr>
  <div class="details"><b>Subscription ends</b><br>`+`</div><hr>`;

  document.getElementById('modal-body').innerHTML = `
          <b>Email</b><br>
        <input type="text" class="form-control" id="email" value="`+obj.email+`">
        <b>Firstname</b>
        <input type="text" class="form-control" id="firstname" value="`+obj.forename+`">
        <b>Lastname</b>
        <input type="text" class="form-control" id="lastname" value="`+obj.surname+`">
        <b>Street</b>
        <input type="text" class="form-control" id="street" value="`+obj.street+`">
        <b>City</b>
        <input type="text" class="form-control" id="city" value="`+obj.city+`">
        <b>Postcode</b>
        <input type="text" class="form-control" id="postcode" value="`+obj.postcode+`">`
    });
}


function searchButton()
{
	location.replace("../app");
}

function updateDetails()
{
  console.log($("#firstname").val());
        var user = localStorage.getItem('user');
      $.getJSON("../php/update_profile.php?id="+ user + "&fname=" + $("#firstname").val() + "&sname=" + $("#lastname").val() + "&street=" + $("#street").val() + "&city=" + $("#city").val() + "&postcode=" + $("#postcode").val() + "&email=" + $("#email").val(), function(json) {
        var myJSON = JSON.stringify(json);
        obj = JSON.parse(myJSON);
        console.log(obj);
    });
      getData();
}

function logout()
{
	localStorage.removeItem('user');
	localStorage.removeItem('token');
	location.replace("../");
}