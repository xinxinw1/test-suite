/***** Test Suite 1.1 *****/

/* require tools 4.5.1 */
/* require ajax 4.5.0 */

(function (udf){
  var win = window;
  
  var $ = win.$;
  win.$ = udf;
  
  var file = Test.file;
  win.Test = udf;
  
  var udfp = $.udfp;
  
  var al = $.al;
  var dmp = $.dmp;
  
  var rpl = $.rpl;
  
  var psh = $.psh;
  
  var tfn = $.tfn;
  var tfna = $.tfna;
  
  var apl = $.apl;
  var sli = $.sli;
  
  var stf = $.stf;
  
  var evl = $.evl;
  
  var load = $.load;
  var aload = $.aload;
  
  ////// Types //////
  
  function typ(a){
    return a.type;
  }
  
  // cfn = comparison fn
  function tseq(run, res, cfn){
    return {type: "testeq", run: run, res: res, cfn: cfn};
  }
  
  function grun(a){
    return a.run;
  }
  
  function gres(a){
    return a.res;
  }
  
  function gcfn(a){
    return a.cfn;
  }
  
  function rs(pass){
    return {type: "res", pass: pass, mess: apl(stf, sli(arguments, 1))};
  }
  
  function gpass(a){
    return a.pass;
  }
  
  function gmess(a){
    return a.mess;
  }
  
  ////// Add Tests //////
  
  var tests = [];
  function test(run, res, cfn){
    return psh(tseq(run, res, cfn), tests);
  }
  
  ////// Run Tests //////
  
  var allpass = true;
  function runall(){
    allpass = true;
    out("Running tests...");
    out("");
    for (var i = 0; i < tests.length; i++){
      var res = run1(tests[i]);
      if (!gpass(res)){
        allpass = false;
        out(gmess(res));
      }
    }
    out("");
    if (allpass)out("Passed all tests!");
    else out("Failed some tests!");
  }
  
  function run1(a){
    var t = typ(a);
    switch (t){
      case "testeq":
        var run = grun(a);
        var cfn = gcfn(a);
        var corr = gres(a); // correct
        try {
          var res = evl(run);
          if (tfn(corr, cfn)(res))return rs(true);
          if (udfp(cfn)){
            return rs(false, "Failed: $1 -> $2 != $3", run, res, corr);
          }
          return rs(false, "Failed: $1 -> $2 != $3 using $4", run, res, corr, cfn);
        } catch (e){
          return rs(false, "Failed: $1 with error $2", run, e);
        }
    }
    return rs(false, "Unknown test type $1", t);
  }
  
  ////// DOM //////
  
  var res = $("results");
  var pg = $("page");
  
  var bot = $.bot;
  var atth = $.atth;
  
  function ou(){
    atth(esc(apl(stf, arguments)), res);
    bot(pg);
  }
  
  function out(){
    atth(esc(apl(stf, arguments)) + "<br>", res);
    bot(pg);
  }
  
  function esc(a){
    return rpl(["<", ">", "\n"],
               ["&lt", "&gt", "<br>"], a);
  }
  
  function title(a){
    document.title = a;
  }
  
  ////// Load Files //////
  
  var numtoload = 0;
  function aload2(a, f){
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
  window.load = load;
  window.aload = aload2;
  window.udf = udf;
  window.tfna = $.tfna;
  window.title = title;
  
  window.onerror = function (msg, url, line){
    out("Error: " + msg + " at line " + line + " of " + url);
    out("");
    return false;
  }
  
  aload(file, function (){
    runready = true;
    checkrun();
  });
  
  ////// Object Exposure //////
  
  win.Test = {
    tseq: tseq,
    grun: grun,
    gres: gres,
    gcfn: gcfn,
    rs: rs,
    gpass: gpass,
    gmess: gmess,
    
    tests: tests,
    test: test,
    
    runall: runall,
    run1: run1,
    
    ou: ou,
    out: out,
    esc: esc
  };
  
})();

