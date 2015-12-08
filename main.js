/***** Test Suite 1.3.1 *****/

/* require tools 4.10.3 */
/* require ajax 4.6.0 */

(function (udf){
  var win = window;
  
  var $ = win.$;
  win.$ = udf;
  
  var file = Test.file;
  win.Test = udf;
  
  var udfp = $.udfp;
  
  var al = $.al;
  var dmp = $.dmp;
  
  var map = $.map;
  var rpl = $.rpl;
  
  var push = $.push;
  
  var att = $.att;
  
  var tfn = $.tfn;
  var tfna = $.tfna;
  
  var apl = $.apl;
  var sli = $.sli;
  
  var stf = $.stf;
  
  var evl = $.evl;
  
  var elm = $.elm;
  var bot = $.bot;
  var cont = $.cont;
  
  var timer = $.timer;
  var tim = $.tim;
  
  var load = $.load;
  var aload = $.aload;
  
  ////// Types //////
  
  function typ(a){
    return a.type;
  }
  
  // run = string to eval
  // res = result it should be equal to
  // cfn = comparison fn (default is ===)
  function mktesteq(run, res, cfn){
    return {type: "testeq", run: run, res: res, cfn: cfn};
  }
  
  // speed test
  function mktestspd(run, lim){
    return {type: "testspd", run: run, lim: lim};
  }
  
  // error test
  function mktesterr(run){
    return {type: "testerr", run: run};
  }
  
  // result
  // rs(false, 234.53, "Failed: $1", a)
  function rs(pass, time){
    return {type: "res", pass: pass, time: time, mess: apl(stf, sli(arguments, 2))};
  }
  
  ////// Add Tests //////
  
  var tests = [];
  function test(run, res, cfn){
    push(mktesteq(run, res, cfn), tests);
  }
  
  function testspd(run, lim){
    push(mktestspd(run, lim), tests);
  }
  
  function testerr(run){
    push(mktesterr(run), tests);
  }
  
  ////// Run Tests //////
  
  var allpass = true;
  function runall(){
    allpass = true;
    for (var i = 0; i < tests.length; i++){
      var res = run1(tests[i]);
      if (!res.pass)allpass = false;
      outres(res.pass, res.time, tests[i], res.mess);
    }
    outfin(allpass);
  }
  
  function run1(a){
    var t = typ(a);
    var tr = timer();
    switch (t){
      case "testeq":
        var run = a.run;
        var cfn = a.cfn;
        var corr = a.res; // correct
        try {
          var res = evl(run);
          if (tfn(corr, cfn)(res))return rs(true, tr.time());
          if (udfp(cfn)){
            return rs(false, tr.time(), "-> $1 != $2", res, corr);
          }
          return rs(false, tr.time(), "-> $1 != $2 using $3", res, corr, cfn);
        } catch (e){
          return rs(false, tr.time(), "error $1", e);
        }
      case "testspd":
        var run = a.run;
        var lim = a.lim;
        try {
          var res = evl(run);
          var tim = tr.time();
          if (tim <= lim)return rs(true, tim);
          return rs(false, tim, "speed $1 > $2", res, lim);
        } catch (e){
          return rs(false, tim, "error $1", e);
        }
      case "testerr":
        var run = a.run;
        try {
          var res = evl(run);
          return rs(false, tr.time(), "-> $1 which isn't an error", res);
        } catch (e){
          return rs(true, tr.time(), "$1", e);
        }
    }
    return rs(false, tr.time(), "Unknown test type $1", t);
  }
  
  ////// DOM //////
  
  var res = $("results");
  
  function outres(pass, time, test, mess){
    var teststr = "";
    switch (typ(test)){
      case "testeq": teststr = test.run; break;
      case "testspd": teststr = "Speed <= " + test.lim + ": " + test.run; break;
      case "testerr": teststr = "Error: " + test.run; break;
    }
    att(res, elm("tr", {class: pass?"pass":"fail"},
               elm("td", pass?"Pass":"Fail"),
               elm("td", time),
               elm("td", teststr),
               elm("td", mess)));
    bot(document.body);
  }
  
  function outfin(pass){
    cont($("final"), pass?"Passed all tests!":elm("span", {class: "fail"}, "Failed some tests!"));
    bot(document.body);
  }
  
  function title(a){
    document.title = a;
    cont($("title"), a);
  }
  
  ////// Load Files //////
  
  var numtoload = 0;
  function aload2(a, v, f){
    if (udfp(f))f = v;
    else a = map(function (a){return a+"?v="+v;}, a);
    numtoload++;
    aload(a, function (){
      f();
      numtoload--;
      checkrun();
    });
  }
  
  var runready = false;
  function checkrun(){
    if (runready && numtoload == 0)runall();
  }
  
  window.test = test;
  window.testspd = testspd;
  window.testerr = testerr;
  window.load = load;
  window.aload = aload2;
  window.udf = udf;
  window.tfna = $.tfna;
  window.title = title;
  
  window.onerror = function (msg, url, line){
    outres(false, 0, "", "Error: " + msg + " at line " + line + " of " + url);
    return false;
  }
  
  aload(file, function (){
    runready = true;
    checkrun();
  });
  
  ////// Object Exposure //////
  
  win.Test = {
    mktesteq: mktesteq,
    mktestspd: mktestspd,
    rs: rs,
    
    tests: tests,
    test: test,
    
    runall: runall,
    run1: run1,
    
    outres: outres
  };
  
})();

