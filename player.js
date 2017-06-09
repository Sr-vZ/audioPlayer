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
        $('#duration').html(formatDuration(sound.duration()));
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

function formatDuration(s){
    var min = parseInt(s/60),
    sec = parseInt(s-min*60);
    return min+":"+sec;
}
function seekBar() {
    //$("#progress_bar").css('width', (sound.seek() / sound.duration()) * 100);
    //console.log(sound.seek() / sound.duration());
    var percentage = ( sound.seek() / sound.duration() ) * 100;
    $("#custom-seekbar span").css("width", percentage+"%");
}

function popPlaylist(){
    var contents ='';
    getFiles("./media",function(){
        console.log(fileList);
        for(i=0;i<fileList.length;i++){
            contents ="<tr><td>"+fileList[i]+"</td></tr>";
            $('#playlist>tbody').append(contents);   
        }
        //$('#playlist').append(contents);
        console.log(contents);
    });   
    //console.log(fileList);
}
function updateAnimations() {
    seekBar();
}

var vid = sound;
function seekPlay(){
$("#custom-seekbar").on("click", function(e){
    var offset = $(this).offset();
    var left = (e.pageX - offset.left);
    var totalWidth = $("#custom-seekbar").width();
    var percentage = ( left / totalWidth );
    var vidTime = sound.duration() * percentage;
    console.log(vidTime);
    sound.seek(vidTime);// = vidTime;
});//click()
}
function togglePlayicon(){
        $('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
}
$(document).ready(function() {
    
    $('#play').bind('click', function() {
        playSound();
        //visualize();
    });
    seekPlay();
    setInterval(popPlaylist(),1000);
    visualize2();
});
