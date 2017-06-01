var sound = new Howl({
    src: ['https://www.sample-videos.com/audio/mp3/wave.mp3']
});
var isPlaying = false;

var refreshSeek;

function playSound() {
    var playEle = document.getElementById('play');
    if (isPlaying === false) {
        sound.play();
        isPlaying = true;
        refreshSeek = setInterval(seekBar, 1000);
        //$('#duration').innerHtml=sound.duration();
    } else {
        sound.pause();
        isPlaying = false;
        //$('#play-icon').toggleClass('glyphicon glyphicon-pause');
        clearInterval(refreshSeek);
    }
};

function seekBar() {

    $("#progress_bar").css('width', (sound.seek() / sound.duration()) * 1000);
    //console.log(sound.seek() / sound.duration());
}

function updateAnimations() {
    seekBar();
}

$(document).ready(function() {
    $('#play').bind('click', function() {
        $('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        playSound();

    });
});