var request = require("request");
var express = require('express');
var router = express.Router();
const SteamAPI = require('steamapi');
const steam = new SteamAPI("6344EEA2AF71261F4A9BFAEB276600D7");
const steamUserName = "pizzzaaaa"


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {title: "GameHub"});
});

router.post('/',(req,res) => {
    if(typeof req.body.bar === 'undefined'){
    // The parameter is missing, example response...
    res.status(400).json({ error: 'missing parameter bar', data: null }); // Only an  example
    return;
}

    let bar = req.body.bar;
    steam.getFeaturedGames().then(function(result) {
    var x = result["featured_win"];
    //console.log(x);
    for (i = 0; i < x.length; i++) {
            if (x[i]["name"].toUpperCase() == bar.toUpperCase()) {
                var game_name = x[i]["name"];
                var o_price = x[i]["original_price"].toString();
                var f_price = x[i]["final_price"].toString();
                var sale = x[i]["discount_percent"].toString();

                res.render('index',
                    {users: {name:game_name ,oriprice: parseprice(o_price),
                    fprice: parseprice(f_price), discount:sale},
                        searchresult:"found 1 result"});

            }
        }
        res.render('index',{searchresult: "oops, found nothing"});
})

});



module.exports = router;
function parseprice(oristr) {
    const count = oristr.length;
    return  oristr.slice(0,count-2) + "." + oristr.slice(count-2, count);
}

