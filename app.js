
var sound = new Howl({
    src: ['./media/Hind Mere Jind.mp3'],
    html5: false,
});
var isPlaying = false;

var refreshSeek;

function playSound() {
    var playEle = document.getElementById('play');
    if (sound.playing() === false) {
        sound.play();
        //isPlaying = true;
        $('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        refreshSeek = setInterval(seekBar, 1000);
        //$('#duration').innerHtml=sound.duration();
    } else {
        sound.pause();
        //isPlaying = false;
        //$('#play-icon').toggleClass('glyphicon glyphicon-pause');
        $('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        clearInterval(refreshSeek);
    }
    
}


function seekBar() {

    $("#progress_bar").css('width', (sound.seek() / sound.duration()) * 100);
    //console.log(sound.seek() / sound.duration());

}

function updateAnimations() {
    seekBar();
}

$(document).ready(function() {
    $('#play').bind('click', function() {
        playSound();
        //visualize();
    });
    //visualize();
});

