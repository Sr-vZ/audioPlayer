
var sound = new Howl({
  src: ['https://dl.pagal.link/upload_file/5570/6757/Latest Bollywood Hindi Mp3 Songs - 2017/Sachin A Billion Dreams %282017%29 Hindi Mp3 Songs/01 Hind Mere Jind - Sachin %28AR Rahman%29 320Kbps.mp3']
});
var isPlaying=false;

function playSound(){
    var playEle = document.getElementById('play');
    if(isPlaying==false){
        sound.play();
        isPlaying=true;
    }else{
        sound.pause();
        isPlaying=false;
    }
};
    
    $('#play').bind('click',function(){
        playSound();
    });


$('document').ready(function(){
    $('#play').bind('click',function(){
        playSound();
    });
});
