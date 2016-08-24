var request = require('request');
var cheerio = require('cheerio');

var query = encodeURIComponent("美人鱼");
request("http://search.hdwan.net/cse/search?s=11504240492176070054&q=" + query,function(e,r,b){
	var $ = cheerio.load(b);
	console.log(b);
});
