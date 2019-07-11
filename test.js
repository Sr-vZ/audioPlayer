//Noembed test
searchTerm="https://soundcloud.com/aboveandbeyond/abgt235";
url="https://noembed.com/embed?url="+ searchTerm;// +"callback=my_embed_function";

var request = require('request');
var cheerio = require('cheerio');

proxy='http://proxy.intra.bt.com:8080';

function getSCurl(search){
url="https://noembed.com/embed?url="+ search;
request({'url':url,'proxy':proxy,headers: {'User-Agent': 'MY IPHONE 7s'}},function(error,response,html){
  //console.log(JSON.parse(html)['html']);
  
});
}
function searchMusic(search){
  url="https://soundcloud.com/search/sounds?q="+search;
  request({'url':url,'proxy':proxy,headers: {'User-Agent': 'MY IPHONE 7s'}},function(error,response,html){
  //console.log(html);
  var $ = cheerio.load(html);
  $('.lazyLoadingList__list sc-list-nostyle sc-clearfix').filter(function(i,el){
    var data = $(this);
    console.log(data);
  });
  console.log($('ul').text());
});
}
searchMusic('above and beyond');