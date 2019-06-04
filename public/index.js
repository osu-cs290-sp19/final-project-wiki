//index.js

function insertWikiPage(Title, Body, image) {
  var wikiContext = {
    title: "Cats",
    image: "http://placekitten.com/320/320/",
    body: "A very cute kitty."
  };

  var wikiHTML = Handlebars.templates.photoCard(photoCardContext);
  wikiContainer.insertAdjacentHTML('beforeend', wikiHTML);
}

var create = document.getElementById('createbutton');
var accept = document.getElementById('acceptbutton');
var cancel = document.getElementById('cancelbutton');
var scrollname = document.getElementById('newscrollname');
var modal = document.getElementById('modal');
var backdrop = document.getElementById('backdrop');

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
