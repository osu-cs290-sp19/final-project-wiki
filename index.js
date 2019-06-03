//index.js

var create = document.getElementById('createbutton');
var accept = document.getElementById('acceptbutton');
var cancel = document.getElementById('cancelbutton');
var scrollname = document.getElementById('newscrollname');
var modal = document.getElementById('modal');
var backdrop = document.getElementById('modalbackdrop');

//display modal
create.addEventListener('click',function(event){
  modal.classList.remove('hidden');
  backdrop.classList.remove('hidden');
});

cancel.addEventListener('click',function(event){
  modal.classList.add('hidden');
  backdrop.classList.add('hidden');
  scrollname.value = "";
});

accept.addEventListener('click',function(event){
  modal.classList.add('hidden');
  backdrop.classList.add('hidden');
  scrollname.value = "";
  //send signal to server to create a new empty scroll page
  //redirect to 'edit' page for this scroll
});
