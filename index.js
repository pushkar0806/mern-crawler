const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cheerio = require('cheerio');
const request = require('request')
const fs = require('fs');
const { v1: uuidv4 } = require('uuid');
 
const app = express();
 
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
 
app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});
 

app.get('/crawl', async function (req, res) {
    const URL = 'https://www.imdb.com/search/title/?count=70&groups=top_1000&sort=user_rating';
    request.get(URL, (error, response) => {
        if(error) {
            console.log('ERROR in URL---->', error);
            res.status(500).send(error.message || error)
        } else {
            let json = {'movies':[]}
            const $ = cheerio.load(response.body);
           $('div.lister-item-content').each(function() {
                let data = $(this);
                let title = data.children('h3').children('a').text();
                let img_url = data.prev('.lister-item-image').children('a').children('img').attr('loadlate')
                let year = data.children('h3').children('.lister-item-year').text().split(')')[0].split('(')[1].trim();
                let genre = data.children('p').find('.genre').text().replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                let ratings = data.children('.ratings-bar').children('.ratings-imdb-rating').text().replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                let description = data.children('.text-muted').last().text().replace(/(\r\n|\n|\r|\t)/gm, '').trim();         
                let crew = data.children('p').last().prev().text().replace(/(\r\n|\n|\r|\t)/gm, '').trim();
                let array = crew.split('|');
                
                let obj ={};
                for (const key of array) {
                    let keys = key.split(':')[0].trim(),
                        value = key.split(':')[1].trim()
                    obj[keys] = value;
               }
            
                json['movies'].push({
                    _id: uuidv4(),
                    title,
                    year,
                    description,
                    year,
                    ratings,
                    img_url,
                    genre,
                    actors: obj.Stars,
                    director: obj.Director
                });
            });
            
            fs.writeFile('imdb-output.json', JSON.stringify(json, null, 4), function(err){
                console.log('created imdb-output.json');
                res.status(200).send(json)
            });
        }
    });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
});