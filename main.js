function changed() {
  var score = 0;
  console.log("Triggered");
  var input = document.getElementById("input").value;
  if (input.match("4\\d[01]{25}")) {
    console.log("value: " + input);
    var globalCounter = 2;
    var previousMove = 0;
    // The copy-cat
    /* first move */
    var yourCurrentMove = input[globalCounter];
    var hisMove = "1";
    score = makeMove(yourCurrentMove, hisMove, score);
    previousMove = yourCurrentMove;
    globalCounter += 1;
    /* other moves */
    for (var i = 0; i < 4; i += 1) {
      var hisMove = previousMove;
      var yourCurrentMove = input[globalCounter];
      score = makeMove(yourCurrentMove, hisMove, score);
      globalCounter += 1;
    }

    // The cheater
    for (var i = 0; i < 4; i += 1) {
      var yourCurrentMove = input[globalCounter];
      var hisMove = "0";
      score = makeMove(yourCurrentMove, hisMove, score);
      globalCounter += 1;
    }

    // The friendly
    for (var i = 0; i < 4; i += 1) {
      var yourCurrentMove = input[globalCounter];
      var herMove = "1";
      score = makeMove(yourCurrentMove, herMove, score);
      globalCounter += 1;
    }

    // Don't break his trust
    var hasCheated = false;
    for (var i = 0; i < 5; i += 1) {
      var yourCurrentMove = input[globalCounter];
      var hisMove;
      if (hasCheated) {
        hisMove = "0";
      } else {
        hisMove = "1";
      }
      score = makeMove(yourCurrentMove, hisMove, score);
      if (!hasCheated && yourCurrentMove == 0) {
        hasCheated = true;
      }
      globalCounter += 1;
    }

    /* The guy with the brown hat */
    /* He has a set of predefined moves */
    var brownHatMoves = ["1", "0", "1", "1"];
    for (var i = 0; i < 4; i++) {
      var hisMove = brownHatMoves[i];
      var yourCurrentMove = input[globalCounter];
      previousMove = yourCurrentMove;
      score = makeMove(yourCurrentMove, hisMove, score);
      globalCounter += 1;
    }
    /* And then he starts acting like a copy-cat */
    for (var i = 0; i < 3; i += 1) {
      var hisMove = previousMove;
      var yourCurrentMove = input[globalCounter];
      previousMove = yourCurrentMove;
      score = makeMove(yourCurrentMove, hisMove, score);
      globalCounter += 1;
    }
    document.getElementById("output").innerText = "Sinu skoor on " + score;
  } else {
    document.getElementById("output").innerText = "Vale sisend, said 0 punkti.";
  }
}
function makeMove(you, other, score) {
  var newScore = score;
  if (you === "1" && other === "1") {
    newScore += 2;
  } else if (other === "0" && you === "1") {
    // you cooperate, he/she doesn't
    newScore -= 3;
  } else if (you === "0" && other === "1") {
    newScore += 3;
  }
  return newScore;
}
