//index.js


function insertWikiPage(Title) {
  var wikiContext = {
    title: Title,
    summary: "", // can add
    image: "",
    sectionData: [],
  };
  var wikiHTML = Handlebars.templates.wiki(wikiContext);
  var wikiContainer = document.querySelector('#name-of-page');

  var wikiRecentContainer = document.querySelector('.recent-list');
  var wikiTitleContainer = document.querySelector('#name-of-page');


  wikiContainer.insertAdjacentHTML('beforeend', wikiHTML);
  wikiTitleContainer.insertAdjacentHTML('beforeend', wikiHTML);
}


var create = document.getElementById('create-button');
var accept = document.getElementById('accept-button');
var cancel = document.getElementById('cancel-button');
var scrollname = document.getElementById('new-scroll-name');
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
  var inputNameBoxes = document.getElementsByClassName('new-section-name');
  var nameBoxes = document.getElementsByClassName('section-name');
  var inputTextBoxes = document.getElementsByClassName('new-section-text');
  var textBoxes = document.getElementsByClassName('section-text');

  var numberOfBoxes = inputNameBoxes.length;
  var numberOfTexts = inputTextBoxes.length;

  for(var i = 0; i < numberOfBoxes; i++){
    inputNameBoxes[i].value = nameBoxes[i].innerHTML;
  }

    var wikiRecentContainer = document.querySelector('.recent-list');
    var wikiTitleContainer = document.querySelector('#name-of-page');


    wikiContainer.insertAdjacentHTML('beforeend', wikiHTML);
    wikiTitleContainer.insertAdjacentHTML('beforeend', wikiHTML);
  }


  var create = document.getElementById('create-button');
  var accept = document.getElementById('accept-button');
  var cancel = document.getElementById('cancel-button');
  var scrollname = document.getElementById('new-scroll-name');
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

//else{
  //edit page code
  var editButton = document.getElementById('edit-page-button');
  var acceptButton = document.getElementById('accept-edit-button');
  var cancelButton = document.getElementById('cancel-edit-button');

  editButton.onclick = function(){
    var inputNameBoxes = document.getElementsByClassName('new-section-name');
    var nameBoxes = document.getElementsByClassName('section-name');
    var inputTextBoxes = document.getElementsByClassName('new-section-text');
    var textBoxes = document.getElementsByClassName('section-text');

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

    console.log(acceptButton);

    acceptButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');

    editButton.classList.add('hidden');
  }

  acceptButton.onclick = function(){
    var inputNameBoxes = document.getElementsByClassName('new-section-name');
    var nameBoxes = document.getElementsByClassName('section-name');
    var inputTextBoxes = document.getElementsByClassName('new-section-text');
    var textBoxes = document.getElementsByClassName('section-text');

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
    acceptButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
  }

  cancelButton.onclick = function(){
    var inputNameBoxes = document.getElementsByClassName('new-section-name');
    var nameBoxes = document.getElementsByClassName('section-name');
    var inputTextBoxes = document.getElementsByClassName('new-section-text');
    var textBoxes = document.getElementsByClassName('section-text');

    var numberOfBoxes = inputNameBoxes.length;
    var numberOfTexts = inputTextBoxes.length;

    for(var i = 0; i < numberOfTexts; i++){
      inputNameBoxes[i].classList.add('hidden');
      inputTextBoxes[i].classList.add('hidden');

      nameBoxes[i].classList.remove('hidden');
      textBoxes[i].classList.remove('hidden');
    }


    editButton.classList.remove('hidden');
    acceptButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
  }
//}
