
var sound = new Howl({
  src: ['https://dl.pagal.link/upload_file/5570/6757/Latest Bollywood Hindi Mp3 Songs - 2017/Sachin A Billion Dreams %282017%29 Hindi Mp3 Songs/01 Hind Mere Jind - Sachin %28AR Rahman%29 320Kbps.mp3']
});
var isPlaying=false;

function playSound(){
    var playEle = document.getElementById('play');
    if(isPlaying==false){
        sound.play();
        isPlaying=true;
        setInterval(seekBar,1000) ;
        //$('#duration').innerHtml=sound.duration();
    }else{
        sound.pause();
        isPlaying=false;
        //$('#play-icon').toggleClass('glyphicon glyphicon-pause');
    }
};
function seekBar(){
    if(sound.isPlaying){
        //$("#progress_bar").val(sound.seek()/sound.duration());
        $("#progress_bar").css('width',(sound.seek()/sound.duration())*1000);
    }
    $("#progress_bar").css('width',(sound.seek()/sound.duration())*1000);
    //console.log(sound.seek()/sound.duration());    
}
function updateAnimations(){
    seekBar();
  } 
  
$('document').ready(function(){
    $('#play').bind('click',function(){
        $('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        playSound();
        
    });
});
