/*
 * Des: bt天堂的网页解析方法
 * Author: njhxzhangjihong@126.com
 * Date: 9/12/2016
 * */

var common = require("./common.js");
var request = require('request');
var cheerio = require('cheerio');

var Parser3 = function(urlPre,name){
  this.urlPre = urlPre;
  this.url = urlPre + "/s.php?q=" + encodeURIComponent(name);
  this.matchResultSelector = "div.ml > div.item > div.title a";
  this.downloadLinkSelector = ".tinfo a";
};

common.extend(Parser3,common.CommonParser);

//覆写解析方法
Parser3.prototype.getMatchResultInfo = function(){
  var that = this;
  console.log(this.url);
  return new Promise(function(resolve,reject){
    request(that.url,function(e,r,b){
      if(!e && r.statusCode === 200){
        var $ = cheerio.load(b);
        var href = $(that.matchResultSelector).attr("href");
        var name = $(that.matchResultSelector).text();
        if(href){
          resolve({
            href: that.urlPre + href,
            name: name
          });
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

Parser3.prototype.getLink = function(link){
  var that = this;
  return new Promise(function(resolve,reject){
    request(link,function(e,r,b){
      if(!e && r.statusCode === 200){
        var $ = cheerio.load(b);
        var downloadLinks = [];
        $(that.downloadLinkSelector).each(function(index,ele){
          var href = $(ele).attr("href");
          var title = $(ele).text();
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

//bt天堂的下载为post方式，覆写
Parser3.prototype.download = function(link,dst,name){
  var that = this;
  request(this.urlPre + link,function(e,r,b){
    if(!e && r.statusCode === 200){
      var $$ = cheerio.load(b);
      var id = $$("input[name='id']").val();
      var uhash = $$("input[name='uhash']").val();
      var url = $$("form").attr("action");
      var cmd = "wget --post-data='action=download&id=" + id + "&uhash=" + uhash + "' -O " + dst + "/" + name + ".torrent " + that.urlPre + url;
      console.log(cmd);
      common.exec(cmd,function(e,b){
        if(e)console.error("Error: " + e);
			});
    }else {
      console.error(e);
    }
  });
};

module.exports = Parser3;
