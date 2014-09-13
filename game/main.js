document.addEventListener("DOMContentLoaded", function () {
  var levelFlow = new LevelFlow({
    container: document.querySelector('.boards')
  });

  levelFlow.playLevel(parseInt(localStorage.level, 10) || 1);

  document.getElementById('reset').addEventListener('click', function() {
    levelFlow.resetCurrentLevel();
  });

  document.getElementById('reset-game').addEventListener('click', function() {
    localStorage.clear();
    location.reload(true);
  });
}, false);