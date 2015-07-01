function checkLogin(form){

  var form_elems = form.elements;

  var i=0;
  for(i=0; i<form_elems.length-1; i++){

    if(form_elems[i].value == ""){
      alert("Error, " + form_elems[i].name + " cannot be blank!");
      return false;
    }

  }

  //no value for username
  /* if(form.username.value == "") {
     alert("Error: Username cannot be blank!");
     form.username.focus();
     return false;
   }

   if(form.password.value == "" ) {

     alert("Error: Password cannot be blank!");
     form.password.focus();
     return false;

  }*/

  return true;
}
