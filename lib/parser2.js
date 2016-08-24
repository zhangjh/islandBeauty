//torrentbit的解析方法

var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;

var config = require('../conf/config.js');
var src = config["downloadSrc"][1];
var dst = config["downloadDir"][1];


var Parser2 = function(url){
	this.url = url;
	this.urlEles = ".post-grid.clearfix h2.entry-title > a";

};


//访问传入的搜索结果页
/*
 * In: this.url - 搜索结果页
 * Out: links - 包含了种子页面的链接数组
 * */
Parser2.prototype.getTorrentPageLinks = function(){
	var that = this;
	return new Promise(function(resolve,reject){
		console.log(that.url);
		request(that.url,function(e,r,b){
			if(!e && r.statusCode === 200){
				var $ = cheerio.load(b);
				var href = $("#results > div:nth-child(2) > h3 > a").attr('href');
				if(href){
					resolve(href);
				}else {
					reject("没有搜索结果！");
				}
			}else {
				console.error("Error: " + e);
				reject(e);
			}
		});
	});
};

//访问传入的种子页面获取种子下载链接
/*
 * In: link - 单个种子页面链接
 * Out: downloadLink - 单个种子的下载链接
 * */
Parser2.prototype.getTorrentDownloadLinks = function(link){
	return new Promise(function(resolve,reject){
		request(link,function(e,r,b){
			if(!e && r.statusCode === 200){
				var $ = cheerio.load(b);
				var downloadLinks = [];
				var downloadLinksEle = $(".dw-box > a");
				downloadLinksEle.each(function(index,ele){
					var href = $(ele).attr("href");
					var title = $(ele).text();
					console.log("href:" + href);
					downloadLinks.push({
						href: href,
						title: title
					});
				});
				resolve(downloadLinks);
			}else {
				console.error("Error: " + e);
				reject(e);
			}
		});
	});
};

/*
 * 下载种子文件
 * In: link - 种子下载链接，saveDir - 保存目录,name - 保存文件名
 * Out: null
 * */
Parser2.prototype.download = function(link,saveDir,name){
	return new Promise(function(resolve,reject){
		var cmd = "curl " + link + " -o " + saveDir + "/" + name + ".torrent";	
		console.log(cmd);
		exec(cmd,function(e,b){
			console.log(b);
		});
	});
};

module.exports = Parser2;
