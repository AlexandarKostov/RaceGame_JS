$(function () {
  console.log($);

  let count = 3; // seconds
  let intervalId;
  let car1 = Math.floor(Math.random("#car1"));
  let car2 = Math.floor(Math.random("#car2"));

  // Show countdown
  $("#countdown").hide();
  $("#start-button").click(function () {
    $("#countdown").show();
    $("body").addClass("dimmed");
    $("#countdown").text(count);
    intervalId = setInterval(function () {
      count--;
      if (count === 0) {
        clearInterval(intervalId);
        $("#countdown").hide();
        $("body").removeClass("dimmed");
        startRace();
      } else {
        $("#countdown").text(count);
        $("#start-button, #reset-button").attr("disabled", true);
      }
    }, 1000);
  });

  var winner = Math.floor(Math.random() * 2);

  function startRace() {
    // Enable buttons again
    $("#start-button, #reset-button").attr("disabled", false);
    var animationDurationCar1 = Math.floor(
      Math.random() * (6000 - 1000) + 1000
    );
    var animationDurationCar2 = Math.floor(
      Math.random() * (6000 - 1000) + 1000
    );
    // Animate the cars moving along the racetrack
    $("#car1").animate({ "margin-left": "90%" }, animationDurationCar1);
    $("#car2").animate({ "margin-left": "90%" }, animationDurationCar2);

    // Check if one of the cars has reached the end of the racetrack
    setTimeout(function () {
      if (animationDurationCar1 < animationDurationCar2) {
        $("#car1").addClass("winner");
        $("#winner").html("<span class='text-danger'>Car1</span>");
        $("#loser").html("<span class='text-danger'>Car2</span>");
        $("#time-winner").html("<span class='text-danger'>"+animationDurationCar1+"</span> ms");
        $("#time-loser").html("<span class='text-danger'>"+animationDurationCar2+"</span> ms");
        localStorage.setItem("lastWinner", "Car1");
        $("#results-table").append("<div class='result text-white'><span class='text-white'>Car1</span> won the race</div>");
      } else {
        $("#car2").addClass("winner");
        $("#winner").html("<span class='text-danger'>Car2</span>");
        $("#loser").html("<span class='text-danger'>Car1</span>");
        $("#time-winner").html("<span class='text-danger'>"+animationDurationCar2+"</span> ms");
        $("#time-loser").html("<span class='text-danger'>"+animationDurationCar1+"</span> ms");
        localStorage.setItem("lastWinner", "Car2");
        $("#results-table").append("<div class='result text-white'><span class='text-danger'>Car2</span> won the race</div>");
      }
      $("#finish-flag").fadeIn();
    }, Math.max(animationDurationCar1, animationDurationCar2));
  }

  $("#reset-button").click(function () {
    location.reload();
  });
});
