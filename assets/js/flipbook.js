/* lunatespace.com — frame-sequence player
 *
 * flipbook({
 *   playerId, toggleId, labelId,
 *   prefix,            // e.g. "../assets/img/lunar-lander/frame-"
 *   count,             // number of frames (default 100)
 *   fps,               // playback rate (default 10)
 *   alt               // alt-text stem for the <img> elements
 * })
 *
 * Frames are named <prefix><index padded to 3>.jpg, index 0..count-1.
 */
(function (global) {
  function flipbook(opts) {
    var count = opts.count || 100;
    var fps = opts.fps || 10;

    var player = document.getElementById(opts.playerId);
    var loading = player.querySelector(".loading");
    var toggleBtn = document.getElementById(opts.toggleId);
    var label = document.getElementById(opts.labelId);

    var images = [];
    var loaded = 0;
    var current = 0;
    var playing = false;
    var timer = null;

    function show(i) {
      for (var k = 0; k < images.length; k++) {
        images[k].style.display = k === i ? "block" : "none";
      }
      if (label) label.textContent = "frame " + (i + 1) + " / " + count;
    }

    function tick() {
      current = (current + 1) % count;
      show(current);
    }

    function play() {
      playing = true;
      if (toggleBtn) toggleBtn.textContent = "Pause";
      clearInterval(timer);
      timer = setInterval(tick, 1000 / fps);
    }

    function pause() {
      playing = false;
      if (toggleBtn) toggleBtn.textContent = "Play";
      clearInterval(timer);
    }

    for (var i = 0; i < count; i++) {
      var img = new Image();
      img.src = opts.prefix + String(i).padStart(3, "0") + ".jpg";
      img.alt = (opts.alt || "animation") + " frame " + (i + 1);
      img.onload = function () {
        loaded++;
        if (loaded === count) {
          if (loading) loading.remove();
          show(current);
          play();
        }
      };
      player.appendChild(img);
      images.push(img);
    }

    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        if (playing) pause();
        else play();
      });
    }
  }

  global.flipbook = flipbook;
})(window);
