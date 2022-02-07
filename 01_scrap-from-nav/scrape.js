const request = require('request');
const cheerio = require('cheerio');



//GETTING HTML CODE FO WHOLE PAGE
request('https://www.simple.com/blog', (error, response, html) => {
    if (!error && response.statusCode == 200) {
        // console.log(html);
        const $ = cheerio.load(html);

        /*
        //GETTING ALL ARRAY, OBJECT, 
        const siteHead = $('.popular__main__title');
        const siteHeading = $('.popular__main__inner');
        // console.log(siteHead);
        // console.log(siteHead.html());
        // console.log(siteHead.text());

        // const output = siteHeading.find('h1').text();
        // const output = siteHeading.children('h1').text();
        // const output = siteHeading.children('h1').next().text();

        // const output = siteHeading.children('h1').next().text();
        // const output = siteHeading.children('h1').parent().text();

        // console.log(output);*/


        //GETTING DETAILS ABOUT NAVIGATION BY LOOP
        $('.secondary-nav-list li a').each((i, el)=>{
            const item = $(el).text(); // GETTING NAV ITEM
            // console.log(item);
            const link = $(el).attr('href'); //GETTING LINKS
            console.log(link);
        });




        


    }
})