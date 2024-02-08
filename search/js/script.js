var url = 'https://apps.des.qld.gov.au/species/?op=getkingdomnames&f=json';
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
function getData(url) {
    // clear contents
    document.getElementById('main').textContent = null;    

    // list data element
    getJSON(url, function(err, data){
      // set page title
      const main = document.getElementById('main');
      var pageTitle = Object.keys(data)[0];
      var title = document.createElement('h1');
      title.innerHTML = pageTitle;
      main.appendChild(title);

      // iterate elements
      data[pageTitle].forEach(element => {
          var br = document.createElement('br');
          var box = document.createElement('button');

          box.innerHTML = element[pageTitle + 'CommonName'];

          // https://stackoverflow.com/questions/38824349/how-to-convert-an-object-to-an-array-of-key-value-pairs-in-javascript
          var result = Object.keys(element).map((key) => [key, element[key]]);
          // https://stackoverflow.com/questions/54649449/if-input-value-is-something-add-onclick-to-the-button
          box.onclick = function(){getData(result.at(-1).at(-1))};
          // box.setAttribute('onclick', 'getData(' + result.at(-1).at(-1) + ');');
          document.getElementById('main').appendChild(box);
          document.getElementById('main').appendChild(br);
      });
    });
}
// 两个问题：1. element的元素没有对应，如换成class，就是familynameurl（possible solution: regex?）；2. 写传递url的函数 (debug)；3. 界面清空





// data.forEach(element => {
//     var box = document.createElement('a');
//     // box.innerHTML = element.
// });
getData(url);



// 0914现在的问题：1. species界面如何处理；2. 返回键