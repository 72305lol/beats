let player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player('yt-player', {
          height: '392',
          width: '662',
          videoId: 'aVBH1qIqe7Y',
          events: {
            // 'onReady': onPlayerReady,
            // 'onStateChange': onPlayerStateChange
          },
          playerVars:{
            controls:0,
            disablekb:0,
            showInfo:0,
            rel:0,
            autoplay:0,
            modestbranding:0
          }
        });
    }