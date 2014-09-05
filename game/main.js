document.addEventListener("DOMContentLoaded", function () {
  var levelFlow = new LevelFlow({
    container: document.querySelector('.boards')
  });

  levelFlow.playLevel(0);
}, false);