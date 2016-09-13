//torrentbit的解析方法

var request = require('request');
var cheerio = require('cheerio');
var exec = require('child_process').exec;


var Parser1 = function(url){
  this.url = url;
  this.trEles = ".tor_list tbody .torrent-info";
};


//访问传入的页面获取种子链接
/*
 * In: this.url - 种子来源网站
 * Out: links - 包含了种子页面的链接数组
 * */
Parser1.prototype.getTorrentPageLinks = function(){
  var that = this;
  return new Promise(function(resolve,reject){
    request(that.url,function(e,r,b){
      if(!e && r.statusCode === 200){
        var $ = cheerio.load(b);
        var trs = $(that.trEles);
        var links = [];
        trs.each(function(index,ele){
          var href = $("a",ele).attr("href");
          var title = $("a",ele).text();
          links.push({
            "href": href,
            "title": title
          });
        });
        resolve(links);
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
Parser1.prototype.getTorrentDownloadLinks = function(link){
  return new Promise(function(resolve,reject){
    var domain = "http://www.torrentbit.net";
    request(domain + link,function(e,r,b){
      if(!e && r.statusCode === 200){
        var $ = cheerio.load(b);
        var downloadLink = $("a.btn-primary").attr("href");
        resolve(downloadLink);
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
Parser1.prototype.download = function(link,saveDir,name){
  var cmd = "curl '" + link + "' -o " + saveDir + "/" + name + ".torrent";
  console.log(cmd);
  exec(cmd,function(e,b){
    console.log("download err: " + e);
    console.log(b);
  });
};

module.exports = Parser1;
