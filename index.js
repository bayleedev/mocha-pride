var MochaPride;

MochaPride = function(runner) {
  var failures, passes;
  var rainbow = [154, 148, 184, 214, 208, 203, 198, 199, 164, 129, 93, 63, 33, 39, 44, 49, 48, 83, 118];
  var ESC = "\033["
  var NND = ESC + '0m'
  var index = 0;
  var passes = 0;
  var failures = 0;
  var errors = [];
  function color(color, text) {
    var colors = {
      red: rainbow[5],
    };
    if (color == 'rainbow') {
      index++;
      color = rainbow[parseInt(index/2, 10) % rainbow.length];
      return ESC + "38;5;" + color + "m" + text + NND;
    }
    return ESC + "38;5;" + colors[color] + "m" + text + NND;
  };

  runner.on("pass", function(test) {
    process.stdout.write(color('rainbow', '.'));
    passes++;
  });
  runner.on("fail", function(test, err) {
    process.stdout.write(color('red', 'F'));
    errors.push({
      title: test.fullTitle(),
      message: err.message
    });
    failures++;
  });
  return runner.on("end", function() {
    console.log("\n", 'Fabulous tests!'.split('').map(function(el) { return color('rainbow', el); }).join(''));
    for (var i = 0, errorLength = errors.length; i < errorLength; i++) {
      console.log(
        color('red', 'Error: '),
        errors[i].title,
        errors[i].message
      );
    }
    console.log("end: %d/%d", passes, passes + failures);
    process.exit(failures);
  });
};

module.exports = MochaPride;
