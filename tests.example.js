title("Test Suite Testing 1.1");

//// Sanity ////

test('true', false); // should fail
test('123', 123);
test('false', false);
test('true', true);

function iso(a, b){
  if (a.length != b.length)return false;
  for (var i = 0; i < a.length; i++){
    if (a[i] !== b[i])return false;
  }
  return true;
}

test('[1, 2, 3]', [1, 2, 3], iso);

