    pools = [
         "http://www.marmiton.org/recettes/recette_salade-de-betteraves-a-l-orientale_16831.aspx",
         "http://www.marmiton.org/recettes/recette_pain-d-epices-a-la-dijonnaise_16832.aspx",
         "http://www.marmiton.org/recettes/recette_tarte-au-chocolat-et-creme-moka_16834.aspx",
         "http://www.marmiton.org/recettes/recette_poulet-a-la-gaston-gerard_16836.aspx",
       "http://www.marmiton.org/recettes/recette_assiette-paula_16837.aspx"]
    
        var request = require("request");
        var cheerio = require("cheerio");
        proxy='http://proxy.intra.bt.com:8080';
        var poolsLength = pools.length;
        var interval = 10 * 1000; // 10 seconds;
        for (var i = 0 ; i < pools.length ; i++) {
           var url = pools[i];
           setTimeout( function (i) {
            request({'url':url,'proxy':proxy, function (error, response, body) {
             if (!error) {
            var $ = cheerio.load(body,{
              ignoreWhitespace: true
        });
           var name = [];
           var address = [];
           var website = [];
    
        $('body').each(function(i, elem){
              name = $(elem).find('.fn').text();
              address = $(elem).find('.preptime').text();
              website = $(elem).find('.m_content_recette_ingredients').text();
              console.log(name+"±"+address+"±"+website);}
         )
        }
        }, interval * i, i);
        })
        }