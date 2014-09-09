document.addEventListener("DOMContentLoaded", function () {
  var levelFlow = new LevelFlow({
    container: document.querySelector('.boards')
  });

  levelFlow.playLevel(0);

  document.getElementById('reset').addEventListener('click', function() {
    levelFlow.resetCurrentLevel();
  });
}, false);