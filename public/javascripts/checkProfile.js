function checkProfile(form){

  var form_elems = form.elements;

  var i=0;
  for(i=0; i<form_elems.length-1; i++){

    if(form_elems[i].value == ""){
      alert("Error, " + form_elems[i].name + " cannot be blank!");
      return false;
    }

  }

  if(form.password.value != form.confirm_password.value){
    alert("Error, passwords do not match!");
    return false;
  }

   /*if(form.username.value == "") {
     alert("Error: Username cannot be blank!");
     form.username.focus();
     return false;
   }

   if(form.password.value == "" || form.confirm_password.value == "" ) {

     if(form.password.value == ""){
       form.password.focus();
     }
     if(form.confirm_password.value == ""){
       form.confirm_password.focus();
     }
     alert("Error: Password cannot be blank!");
     return false;
   }
   else if(
    form.password.value &&
    form.confirm_password.value &&
    form.password.value != form.confirm_password.value){

      alert("Error: Password does not match!");
      return false;

    }

  if(form.firstname.value == ""){
    alert("Error: Firstname cannot be blank!");
    form.firstname.focus();
    return false;
  }*/

  return true;
}
