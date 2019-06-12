//index.js

// search: "TODO" for things to be done

// UTILITY FUNCTIONS
var currentDate = new Date();

function capitalize_Words(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

// first store data of the wiki on the client
var port = document.URL;
port = port.slice(17,21);
var homePage = "http://localhost:" + port + "/";
console.log(homePage +  "    " + document.URL);

var query = document.getElementsByClassName('search-input')[0];
var search = document.getElementsByClassName('search-button')[0];
search.addEventListener('click',function(event){
  var request = new XMLHttpRequest();
  var requestURL = '/search/' + query.value;
  console.log('query.value', query.value);
  request.open('GET', requestURL);
  var requestBody = query.value;
  // request.setRequestHeader('Content-type', 'stringvalue');
  // request.addEventListener('load', function(event){});
  request.send(requestBody);
  console.log('sent search request');
});

if(document.URL === homePage){

   function hideModal() {
    modal.classList.add('hidden');
    backdrop.classList.add('hidden');
    scrollname.value = "";
   };

   function handleCreateWikiClick() {
     // native JS XMLHttpRequest
    console.log("create wiki handler called");
     var title = document.querySelector('#new-scroll-name').value;
     console.log("== Title from doc:", title);
     if (!title) {
       alert("you have to put a title!");
     }
     else
     {
     var request = new XMLHttpRequest(); // create object
     var requestURL = 'wiki/' + title + '/addWiki';
     request.open('POST', requestURL); // make request
     }
     // create wiki object
     var requestObject = { // our create wiki only takes in a title
          'title': title
     }

     var requestBody = JSON.stringify(requestObject);
     console.log("== made wiki page", requestBody);

     // below is for cleint sided changes using templates
     request.addEventListener('load', function (event) {
       if (event.target.status === 200) {
          var urlTitle = title.toLowerCase().replace(/ /g,"_"); // client sided json data
          var url = 'http://localhost:3400/wiki/' + urlTitle;
          var formattedTitle = capitalize_Words(title);
          var recentTemplate = Handlebars.templates.recentScrolls;
          var newRecentScrolls = recentTemplate({
             'title': formattedTitle,
             'url': url
         });
         var recentScrollsContainer = document.querySelector('.recent-list');
         recentScrollsContainer.insertAdjacentHTML('beforeend', newRecentScrolls);

         // We need to insert to recent DOM

       } else {
         var message = event.target.response;
         alert("Error storing wiki on server: " + message);
       }
     })

    request.setRequestHeader('Content-Type', 'application/json');
    request.send(requestBody);
    hideModal();
  };

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

   accept.addEventListener('click',handleCreateWikiClick);
}
else{

  function getWikiIDFromURL() {
    var path = window.location.pathname.toString();
    var pathParts = path.split('/');
    if (pathParts[1] == "wiki") {
      return pathParts[2].toLowerCase().replace(/ /g,"_");
    }
    else {
      return null;
    }
  }
  // new handler

  function hideEditModal() {
    var inputNameBoxes = document.getElementsByClassName('new-section-name');
    var nameBoxes = document.getElementsByClassName('section-name');
    var inputTextBoxes = document.getElementsByClassName('new-section-text');
    var textBoxes = document.getElementsByClassName('section-text');

    var inputPageName = document.getElementById('new-page-title');
    var pageName = document.getElementById('name-of-page');
    var inputPageSummarry = document.getElementById('new-page-summary');
    var pageSummary = document.getElementById('text-in-summary');
    var inputImage = document.getElementById('new-page-image');
    var image = document.getElementById('page-image');

    var numberOfBoxes = inputNameBoxes.length;
    var numberOfTexts = inputTextBoxes.length;

    for(var i = 0; i < numberOfTexts; i++){
      inputNameBoxes[i].classList.add('hidden');
      inputTextBoxes[i].classList.add('hidden');

      nameBoxes[i].classList.remove('hidden');
      textBoxes[i].classList.remove('hidden');
    }

    pageName.classList.remove('hidden');
    pageSummary.classList.remove('hidden');
    image.classList.remove('hidden');

    inputPageName.classList.add('hidden');
    inputPageSummarry.classList.add('hidden');
    inputImage.classList.add('hidden');

    editButton.classList.remove('hidden');
    acceptButton.classList.add('hidden');
    cancelButton.classList.add('hidden');
    addButton.classList.add('hidden');
  }
  function handleEditWikiClick() {

    // native JS XMLHttpRequest
   console.log("Edit wiki handler called");
   // get the current URL id for the database
    var id = getWikiIDFromURL();
    console.log("== id from URL:", id);
    if (!id) {
      alert("There's a bug with the url parsing");
    }
    else
    {
    var request = new XMLHttpRequest(); // create object
    var requestURL = id + '/editWiki'; // edit Wiki request

    console.log("== REQUEST URL:", requestURL);

    request.open('POST', requestURL); // make request
    }

    // TODO: PULL VALUES FROM THE DOM: title, summary, image, sectionData
    var title = document.getElementById('new-page-title').value;
    var summary = document.getElementById('new-page-summary').value;
    var image = document.getElementById('new-page-image').value;
    //var sectionNames = document.getElementsByClassName('new-section-name').value;
    //var sectionTexts = document.getElementsByClassName('new-section-text').value;

    console.log(title, summary, image);

    var urlTitle = title.toLowerCase().replace(/ /g,"_"); // client sided json data
    var url = 'http://localhost:3400/wiki/' + urlTitle;
    // create wiki object
    var requestObject = {
         'title': title,
         'summary': summary,
         'image': image,
         'url': url
    }

    var requestBody = JSON.stringify(requestObject);
    console.log("== made wiki page", requestBody);

    // below is for cleint sided changes using templates
    request.addEventListener('load', function (event) {
      if (event.target.status === 200) {

         // TODO: REPLACE VALUES IN THE DOM: title, summary, image
         var pageName = document.getElementById('name-of-page');
         var pageSummary = document.getElementById('text-in-summary');
         var image = document.getElementById('page-image');
         pageName.innerHTML = title;
         pageSummary.innerHTML = summary;
         image.innerHTML = image;

      } else {
        var message = event.target.response;
        alert("Error storing wiki on server: " + message);
      }
    })

   request.setRequestHeader('Content-Type', 'application/json');
   request.send(requestBody);
   hideEditModal()
 };

 function handleAddSectionClick() {
  // native JS XMLHttpRequest
  console.log("Add section handler called");
   // get the current URL id for the database
   var id = getWikiIDFromURL();
   console.log("== id from URL:", id);
   if (!id) {
     alert("There's a bug with the url parsing");
   }
   else
   {
   var request = new XMLHttpRequest(); // create object
   var requestURL = id + '/addSection'; // edit Wiki request
   request.open('POST', requestURL); // make request
   }

  // create wiki object
  var requestObject = { // our create wiki only takes in a title
       'name': '*Add name for section here',
       'text': '*add text for section here'
  }

  var requestBody = JSON.stringify(requestObject);
  console.log("== made wiki page", requestBody);

  // below is for cleint sided changes using templates
  request.addEventListener('load', function (event) {
    if (event.target.status === 200) {
       var sectionTemplate = Handlebars.templates.section;
       var newSection = sectionTemplate({
          'name': '*Add name for section here',
          'text': '*add text for section here'
      });
      var sectionContainer = document.querySelector('#sections-container');
      sectionContainer.insertAdjacentHTML('beforeend', newSection);

    } else {
      var message = event.target.response;
      alert("Error storing wiki on server: " + message);
    }
  })

 request.setRequestHeader('Content-Type', 'application/json');
 request.send(requestBody);
};

  //edit page code
  var editButton = document.getElementById('edit-page-button');
  var acceptButton = document.getElementById('accept-edit-button');
  var cancelButton = document.getElementById('cancel-edit-button');
  var addButton = document.getElementById('add-section-button');

  editButton.onclick = function(){
    var inputNameBoxes = document.getElementsByClassName('new-section-name');
    var nameBoxes = document.getElementsByClassName('section-name');
    var inputTextBoxes = document.getElementsByClassName('new-section-text');
    var textBoxes = document.getElementsByClassName('section-text');

    var inputPageName = document.getElementById('new-page-title');
    var pageName = document.getElementById('name-of-page');
    var inputPageSummarry = document.getElementById('new-page-summary');
    var pageSummary = document.getElementById('text-in-summary');
    var inputImage = document.getElementById('new-page-image');
    var image = document.getElementById('page-image');

    var numberOfBoxes = inputNameBoxes.length;
    var numberOfTexts = inputTextBoxes.length;

    inputPageName.value = pageName.innerHTML;
    inputPageSummarry.value = pageSummary.innerHTML;
    inputImage.value = image.src;

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

    pageName.classList.add('hidden');
    pageSummary.classList.add('hidden');
    image.classList.add('hidden');

    inputPageName.classList.remove('hidden');
    inputPageSummarry.classList.remove('hidden');
    inputImage.classList.remove('hidden');

    acceptButton.classList.remove('hidden');
    cancelButton.classList.remove('hidden');
    addButton.classList.remove('hidden');

    editButton.classList.add('hidden');
  }

  acceptButton.onclick = function() {handleEditWikiClick()};

//   acceptButton.onclick = function(){
//   var inputNameBoxes = document.getElementsByClassName('new-section-name');
//   var nameBoxes = document.getElementsByClassName('section-name');
//   var inputTextBoxes = document.getElementsByClassName('new-section-text');
//   var textBoxes = document.getElementsByClassName('section-text');

//   var inputPageName = document.getElementById('new-page-title');
//   var pageName = document.getElementById('name-of-page');
//   var inputPageSummarry = document.getElementById('new-page-summary');
//   var pageSummary = document.getElementById('text-in-summary');
//   var inputImage = document.getElementById('new-page-image');
//   var image = document.getElementById('page-image');

//   var numberOfBoxes = inputNameBoxes.length;
//   var numberOfTexts = inputTextBoxes.length;

//   pageName.innerHTML = inputPageName.value;
//   pageSummary.innerHTML = inputPageSummarry.value;
//   image.src =inputImage.value;

//   for(var i = 0; i < inputNameBoxes.length; i++){
//     nameBoxes[i].innerHTML = inputNameBoxes[i].value;
//   }

//   for(var i = 0; i < inputTextBoxes.length; i++){
//     textBoxes[i].innerHTML = inputTextBoxes[i].value;
//   }


//   for(var i = 0; i < numberOfTexts; i++){
//     inputNameBoxes[i].classList.add('hidden');
//     inputTextBoxes[i].classList.add('hidden');

//     nameBoxes[i].classList.remove('hidden');
//     textBoxes[i].classList.remove('hidden');
//   }

//   pageName.classList.remove('hidden');
//   pageSummary.classList.remove('hidden');
//   image.classList.remove('hidden');

//   inputPageName.classList.add('hidden');
//   inputPageSummarry.classList.add('hidden');
//   inputImage.classList.add('hidden');

//   editButton.classList.remove('hidden');
//   acceptButton.classList.add('hidden');
//   cancelButton.classList.add('hidden');
//   addButton.classList.add('hidden');
// }

cancelButton.onclick = function(){
  var inputNameBoxes = document.getElementsByClassName('new-section-name');
  var nameBoxes = document.getElementsByClassName('section-name');
  var inputTextBoxes = document.getElementsByClassName('new-section-text');
  var textBoxes = document.getElementsByClassName('section-text');

  var inputPageName = document.getElementById('new-page-title');
  var pageName = document.getElementById('name-of-page');
  var inputPageSummarry = document.getElementById('new-page-summary');
  var pageSummary = document.getElementById('text-in-summary');
  var inputImage = document.getElementById('new-page-image');
  var image = document.getElementById('page-image');

  var numberOfBoxes = inputNameBoxes.length;
  var numberOfTexts = inputTextBoxes.length;

  for(var i = 0; i < numberOfTexts; i++){
    inputNameBoxes[i].classList.add('hidden');
    inputTextBoxes[i].classList.add('hidden');

    nameBoxes[i].classList.remove('hidden');
    textBoxes[i].classList.remove('hidden');
  }


  pageName.classList.remove('hidden');
  pageSummary.classList.remove('hidden');
  image.classList.remove('hidden');

  inputPageName.classList.add('hidden');
  inputPageSummarry.classList.add('hidden');
  inputImage.classList.add('hidden');

  editButton.classList.remove('hidden');
  acceptButton.classList.add('hidden');
  cancelButton.classList.add('hidden');
  addButton.classList.add('hidden');
}

addButton.onclick = function(){
   alert("Did add section but in the function");
   ///This is where you add another section to the list of sections for the specific pages
   handleAddSectionClick();
}
}
