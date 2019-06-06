//index.js


// first store data of the wiki on the client

if(document.URL.length <= 22){
   function getWikiIDFromURL() {
     var path = window.location.pathname;
     var pathParts = path.splite('/');
     if (pathParks[1] == "wiki") {
       return pathParts[2];
     }
     else {
       return null;
     }
   }


   function handleCreateWikiClick() {
     // native JS XMLHttpRequest

     var title = document.getElementById('modal');
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

     /*wikiObject = {
        titleToLower = {
          'title': title,
          'summary': '',
          'image': '',
          'sectionData': []
       }*/
    // }

     //var requestBody = JSON.stringify(wikiObject);
     console.log("== made wiki page", requestBody);

     request.addEventListener('load', function (event) {
       if (event.target.status === 200) {
         var wikiTemplate = Handlebars.templates.wiki;
         var newWikiHTML = wikiTemplate({
             'title': title,
             'summary': '',
             'image': '',
             'sectionData': []
         });
         // we don't need to insert any HTML in the DOM

       } else {
         var message = event.target.response;
         alert("Error storing wiki on server: " + message);
       }
     })

     request.setRequestHeader('Content-Type', 'application/json');
     request.send(requestBody);

   };

   function insertWikiPage(Title) {
     var wikiContext = {
       title: Title,
       summary: "", // can add
       image: "",
       sectionData: [],
     };
     var wikiHTML = Handlebars.templates.wiki(wikiContext);
     var wikiContainer = document.querySelector('#nameOfPage');

     var wikiRecentContainer = document.querySelector('.recentlist');
     var wikiTitleContainer = document.querySelector('#nameOfPage');


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
}
else{

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

  acceptButton.onclick = function(){
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

    pageName.innerHTML = inputPageName.value;
    pageSummary.innerHTML = inputPageSummarry.value;
    image.src =inputImage.value;

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
 }
}
