/*
 * Des: islandBeauty - Node.js种子爬虫项目
 * Author: njhxzhangjihong@126.com
 * Date: 8/24 2016
 * */

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var config = require('../conf/config');


//加载网页解析库
var Parser1 = require("../lib/parser1");
var Parser2 = require("../lib/parser2"); 

var args = process.argv.slice(2);

var pattern = new RegExp("[\|\&\\s#\-\.\*\(\)\!\/]","g");

if(!args.length){
	//下载AV种子
	var url = config["downloadSrc"][0];
	var dst = config["downloadDir"][0];
	var parser1 = new Parser1(url);
	
	parser1.getTorrentPageLinks().then(function(links){
		for(var i=0,len=links.length;i<len;i++){
			(function(i){
				//console.log(links[i].href);
				parser1.getTorrentDownloadLinks(links[i].href).then(function(downloadLink){
					var name = links[i].title.replace(pattern,'');
					parser1.download(downloadLink,dst,name);
				});
			})(i);
		}
	}).catch(function(e){
		if(e)console.log(e);
	});
}else {
	//下载电影种子
	if(args[0] !== "search"){
		console.log("Usage: node main.js search 'movie name'");
		return false;
	}

	var movieUrlPre = config["downloadSrc"][1];
	var searchMovieName = args[1];
	var url = movieUrlPre + "/cse/search?s=11504240492176070054&q=" + encodeURIComponent(searchMovieName);
	var dst = config["downloadDir"][1];
	var parser2 = new Parser2(url);

	parser2.getTorrentPageLinks().then(function(linkObj){
		var link = linkObj.href;
		var resultName = linkObj.name;
		console.info(link);
		console.info(resultName);
		if(!new RegExp(searchMovieName).test(linkObj.name)){
			console.error("结果不匹配，停止下载！");
			return false;
		}
		if(link){
			parser2.getTorrentDownloadLinks(link).then(function(downloadLinks){
				if(downloadLinks.length){
					for(var i=0,len=downloadLinks.length;i<len;i++){
						(function(i){
							var downloadLink = downloadLinks[i].href;
							var name = downloadLinks[i].title.replace(pattern,'');
							parser2.download(downloadLink,dst,name);
						})(i);
						
					}
				}else {
					console.error("没有下载链接！");
				}
				
			});
		}else {
			console.error("没有搜索结果！");
		}
		
	}).catch(function(e){
		console.log(e);
	});
}
