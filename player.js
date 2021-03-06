//const {dialog} = require('electron').remote;
/*
var sound = new Howl({
    //src: fileLoc,
    src: ['./media/Hind Mere Jind.mp3'],
    html5: false,
    //onplay: function(){togglePlayicon();},
    onend: function(){togglePlayicon();},
    //onstop: function(){togglePlayicon();},
    });
*/
var sound;
var isPlaying = false;

var refreshSeek;

function playSound() {
    if (fileLoc.length>0 && sound.playing()===false){
        sound = new Howl({
            src: fileLoc[0]
        })
    }
    var playEle = document.getElementById('play');
    getTags(sound._src);
    if (sound.playing() === false) {
        sound.play();
        //isPlaying = true;
        //$('#play-icon').toggleClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        //$('#play-icon').addClass('glyphicon glyphicon-pause');
        togglePlayicon();
        $('#duration').html(formatDuration(sound.duration()));
        refreshSeek = setInterval(seekBar, 500);
        //$('#duration').innerHtml=sound.duration();    
    } else {
        sound.pause();
        //isPlaying = false;
        //$('#play-icon').toggleClass('glyphicon glyphicon-pause');
        //$('#play-icon').addClass('glyphicon glyphicon-pause').toggleClass('glyphicon glyphicon-play');
        //$('#play-icon').addClass('glyphicon glyphicon-play');
        togglePlayicon();
        clearInterval(refreshSeek);
    }
    visualize2();
}
function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function formatDuration(s){
    var min = parseInt(s/60),
    sec = n(parseInt(s-min*60));
    if(sec===NaN||sec<1){
        return '00:00';
    }
    return min+":"+sec;
}
function seekBar() {
    //$("#progress_bar").css('width', (sound.seek() / sound.duration()) * 100);
    //console.log(sound.seek() / sound.duration());
    var percentage = ( sound.seek() / sound.duration() ) * 100;
    $("#custom-seekbar span").css("width", percentage+"%");
    $('#pos').html(formatDuration(sound.seek()));
    
}
function playlistClick(event){
      var target = $(event.target);
      $td = target.closest('td');
      
      $td.html(parseInt($td.html())+1);
      var col   = $td.index();
      var row   = $td.closest('tr').index();
      console.log($td);
    

}
//populates the playlist 
function popPlaylist(dir){
    var contents ='';
    getFiles(dir,function(){
        console.log(fileList);
        $("#playlist tbody tr").remove();
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
//fileselector in electron
function ejectButton(){
    const {dialog} = require('electron').remote;
    console.log(dialog);
    dialog.showOpenDialog({properties:['openFile','openDirectory','multiSelection'], filters:[
        {name: 'mp3',extensions:['mp3']}
        ]},function(files){
            if(files===undefined)
                return;
            var file = files[0];
            console.log(file.replace(/\\/g,'/'));
            popPlaylist(file.replace(/\\/g,'/'));

        });

}
function showValue(ele){
	document.getElementById("range").innerHTML=ele.value;
    sound.volume(ele.value/100);
    var val = ($(ele).val() - $(ele).attr('min')) / ($(ele).attr('max') - $(ele).attr('min'));
    
    $(ele).css('background-image',
                '-webkit-gradient(linear, left top, right top, '
                + 'color-stop(' + val + ', #94A14E), '
                + 'color-stop(' + val + ', #C5C5C5)'
                + ')'
                );

}

//var vid = sound;
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
    //popPlaylist();
    $('#play').bind('click', function() {
        playSound();
        //visualize();
    });
    $('#playlist').click( function(event) {
      var target = $(event.target);
      $td = target.closest('td');
      //console.log($td.text());
      sound.stop();
      sound=new Howl({
          src:fileLoc[fileList.indexOf($td.text())],
          autoplay:true,
          html5:false,
          preload:true,
      });
      playSound();
      
    });
    $('#eject').bind('click',function(){
        ejectButton();
    });
    $('#volume').bind('click',function(){
        $('#vol-slider').toggle();
    })
    $('#stream').bind('click',function(){
        $('#stream-options').toggle();
    })
    $('#vol-slider').hide();
    $('#stream-options').hide();
    seekPlay();
    //popPlaylist("./media");
    //visualize2();
});
