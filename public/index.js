//index.js

function insertWikiPage(Title) {
  var wikiContext = {
    title: Title
  };
  var wikiHTML = Handlebars.templates.wiki(wikiContext);
  var wikiContainer = document.querySelector('#nameOfPage');

  var wikiRecentContainer = document.querySelector('.recentlist');
  var wikiTitleContainer = document.querySelector('#nameOfPage');


  wikiContainer.insertAdjacentHTML('beforeend', wikiHTML);
  wikiTitleContainer.insertAdjacentHTML('beforeend', wikiHTML);
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


//edit page code
var editButton = document.getElementById('edit-page-button');
var acceptButton = document.getElementById('accept-edit-button');
var cancelButton = document.getElementById('cancel-edit-button');

editButton.onclick = function(){
  var inputNameBoxes = document.getElementsByClassName('newSectionName');
  var nameBoxes = document.getElementsByClassName('sectionName');
  var inputTextBoxes = document.getElementsByClassName('newSectionText');
  var textBoxes = document.getElementsByClassName('sectionText');

  var numberOfBoxes = inputNameBoxes.length;
  var numberOfTexts = inputTextBoxes.length;

  for(var i = 0; i < numberOfBoxes; i++){
    inputNameBoxes[i].value = nameBoxes[i].innerHTML;
  }

  for(var i = 0; i < numberOfTexts; i++){
    inputTextBoxes[i].value = textBoxes[i].innerHTML;
  }

  for(var i = 0; i < numberOfTexts; i++){
    inputNameBoxes[i].classList.remove('hidden');
    inputTextBoxes[i].classList.remove('hidden');

    nameBoxes[i].classList.add('hidden');
    textBoxes[i].classList.add('hidden');
  }

//  console.log(acceptButton);

//  acceptButton.classlist.remove('hidden');
  //cancelButton.classList.remove('hidden');

  editButton.classList.add('hidden');
}

acceptButton.onclick = function(){
  var inputNameBoxes = document.getElementsByClassName('newSectionName');
  var nameBoxes = document.getElementsByClassName('sectionName');
  var inputTextBoxes = document.getElementsByClassName('newSectionText');
  var textBoxes = document.getElementsByClassName('sectionText');

  var numberOfBoxes = inputNameBoxes.length;
  var numberOfTexts = inputTextBoxes.length;

  for(var i = 0; i < inputNameBoxes.length; i++){
    nameBoxes[i].innerHTML = inputNameBoxes[i].value;
  }

  for(var i = 0; i < inputTextBoxes.length; i++){
    textBoxes[i].innerHTML = inputTextBoxes[i].value;
  }


  for(var i = 0; i < numberOfTexts; i++){
    inputNameBoxes[i].classList.add('hidden');
    inputTextBoxes[i].classList.add('hidden');

    nameBoxes[i].classList.remove('hidden');
    textBoxes[i].classList.remove('hidden');
  }

  editButton.classList.remove('hidden');
  acceptButton.classlist.add('hidden');
  cancelButton.classList.add('hidden');
}

cancelButton.onclick = function(){
  var inputNameBoxes = document.getElementsByClassName('newSectionName');
  var nameBoxes = document.getElementsByClassName('sectionName');
  var inputTextBoxes = document.getElementsByClassName('newSectionText');
  var textBoxes = document.getElementsByClassName('sectionText');

  var numberOfBoxes = inputNameBoxes.length;
  var numberOfTexts = inputTextBoxes.length;

  for(var i = 0; i < numberOfTexts; i++){
    inputNameBoxes[i].classList.add('hidden');
    inputTextBoxes[i].classList.add('hidden');

    nameBoxes[i].classList.remove('hidden');
    textBoxes[i].classList.remove('hidden');
  }


  editButton.classList.remove('hidden');
  acceptButton.classlist.add('hidden');
  cancelButton.classList.add('hidden');
}
