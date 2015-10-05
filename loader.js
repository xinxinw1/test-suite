/***** Test Suite Loader *****/

var tsversion = "1.2.0";

window.onload = function (){
  document.body.innerHTML = "<div id=\"page\"><div id=\"results\"></div></div>";
  
  function loadjs(a, f){
    var s = document.createElement("script");
    s.src = a;
    s.onreadystatechange = f;
    s.onload = f;
    document.getElementsByTagName("head")[0].appendChild(s);
  }
  
  function loadcss(a, f){
    var s = document.createElement("link");
    s.rel = "stylesheet";
    s.href = a;
    document.getElementsByTagName("head")[0].appendChild(s);
  }
  
  loadjs(Test.dir + "/lib/tools/tools.js?v=" + tsversion, function (){
    loadjs(Test.dir + "/lib/ajax/ajax.js?v=" + tsversion, function (){
      loadjs(Test.dir + "/main.js?v=" + tsversion);
    });
  });
  loadcss(Test.dir + "/test-suite.css?v=" + tsversion);
};

