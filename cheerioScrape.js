var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var search = 'above';
url = 'https://soundcloud.com/search?q='+search;
proxy='http://proxy.intra.bt.com:8080';
    request({'url':url,'proxy':proxy,headers: {'User-Agent': 'MY IPHONE 7s'}}, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);
            /*
            var title, release, rating;
            var json = { title : "", release : "", rating : ""};

            $('.header').filter(function(){
                var data = $(this);
                title = data.children().first().text();
            
                release = data.children().last().children().text();

                json.title = title;
                json.release = release;
            })

            // Since the rating is in a different section of the DOM, we'll have to write a new jQuery filter to extract this information.

            $('.star-box-giga-star').filter(function(){
                var data = $(this);

                // The .star-box-giga-star class was exactly where we wanted it to be.
                // To get the rating, we can simply just get the .text(), no need to traverse the DOM any further

                rating = data.text();

                json.rating = rating;
                fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
});

            })*/
            console.log($.text());
            //console.log(html);
        }
    });
    

