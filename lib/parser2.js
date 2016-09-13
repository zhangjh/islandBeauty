/*
 * Des: 海盗湾中文网的解析方法
 * Author: njhxzhangjihong@126.com
 * Date: 9/12/2016
 * */

var common = require("./common.js");
var request = require('request');
var cheerio = require('cheerio');

var Parser2 = function(urlPre,name){
  this.url = urlPre + "/cse/search?s=11504240492176070054&q=" + encodeURIComponent(name);
  this.matchResultSelector = "#results > div:nth-child(2) > h3 > a";
  this.downloadLinkSelector = ".dw-box > a";
};

common.extend(Parser2,common.CommonParser);

//覆写解析方法
Parser2.prototype.getMatchResultInfo = function(){
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
            href: href,
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

Parser2.prototype.getLink = function(link){
  var that = this;
  return new Promise(function(resolve,reject){
    request(link,function(e,r,b){
      if(!e && r.statusCode === 200){
        var $ = cheerio.load(b);
        var downloadLinks = [];
        $(that.downloadLinkSelector).each(function(index,ele){
          var href = $(ele).attr("href");
          var title = $(ele).text();
          console.log("href: " + href);
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

module.exports = Parser2;
