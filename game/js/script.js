// TBC: get a taxon ID for guessing game.
function getSpecies() {}


// assume data collected 
var taxonID = 686;
var correctName = 'wallum froglet';
var imgURL = 'https://wildnet.itp.qld.gov.au/wws/images/3589';
// insert img: TBC
var imgBox = document.getElementById('imgbox');
var simg = document.createElement('img');
simg.src = imgURL;
imgBox.appendChild(simg);


// boundary values: TBC
// get extra ids
var ids = []; // 690, 694, 698
for (let i = 0; i < 3; i++) {
    ids.push(taxonID + (i + 1) * 81);
}
console.log(ids);


// get another three options (names)
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function makeButton(name, id) {
    var optFrame = document.getElementById('options');
    var button = document.createElement('button');
    button.innerHTML = name;
    button.id = id;
    button.onclick = function(){selectAnswer(this.id)};
    optFrame.appendChild(button);
}

function getData(ids) {
    // clear previous contents if existing
    document.getElementById('options').textContent = null;
    // asynchronous: https://stackoverflow.com/questions/14220321/how-do-i-return-the-response-from-an-asynchronous-call
    // insert correct answer randomly: https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index-javascript
    var correctNO = Math.floor(Math.random() * 4);console.log(correctNO);
    ids.splice(correctNO, 0, taxonID);
    for (let i = 0; i < ids.length; i++) {
        // generate correct element
        var url = 'https://apps.des.qld.gov.au/species/?op=getspeciesbyid&taxonid=' + ids[i];
        var result = '';
        getJSON(url, function(err, data){
            result = String(data.Species.AcceptedCommonName);
            makeButton(result, ids[i]);
        });
    }
    
}

getData(ids);

// options.push(correctName);

// generate buttons
// var optFrame = document.getElementById('options');
// for (let i = 0; i < options.length; i++) {
//     var button = document.createElement('button');
//     button.innerHTML = options[i];
//     optFrame.appendChild(button);
//     // setting result page: correct -> success, incorrect -> guess again
// 
// }
// generate buttons function


// set onclick reactions
// https://stackoverflow.com/questions/19633201/get-text-from-an-link-with-onclick-in-javascript
function selectAnswer(id) {
    var answer = id;
    var optFrame = document.getElementById('options');
    // For incorrect answers
    if(id != taxonID) {
        // remove previous hint if exist
        try {
            var previousHint = document.getElementById('hint');
            var previousLink = document.getElementById('info-link');
            optFrame.removeChild(previousHint);
            optFrame.removeChild(previousLink);
        } catch (error) {
            console.log('No existing hint.');
        }
        // create new hint
        var hint = document.createElement('p');
        hint.innerHTML = 'Let\'s try again. ';
        hint.id = 'hint';
        optFrame.appendChild(hint);
        
    }

    // for correct answer
    if(id == taxonID) {
        optFrame.textContent = null;
        var hint = document.createElement('p');
        hint.innerHTML = 'Wonderful! Let\'s get another.';
        hint.id = 'hint';
        optFrame.appendChild(hint);
    }

    // Info page link
    var infoLink = document.createElement('a');
        infoLink.innerHTML = 'Learn the species.';
        infoLink.href = 'https://apps.des.qld.gov.au/species/?op=getspeciesbyid&taxonid=' + id;
        infoLink.id = 'info-link';
        optFrame.appendChild(infoLink);

}