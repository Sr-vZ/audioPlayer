//Noembed test
searchTerm="https://soundcloud.com/aboveandbeyond/abgt235";
url="https://noembed.com/embed?url="+ searchTerm;// +"callback=my_embed_function";

var request = require('request');
proxy='http://proxy.intra.bt.com:8080';

function getSCurl(search){
url="https://noembed.com/embed?url="+ search;
request({'url':url,'proxy':proxy,headers: {'User-Agent': 'MY IPHONE 7s'}},function(error,response,html){
  //console.log(JSON.parse(html)['html']);
  
});
}