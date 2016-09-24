/*
 * Des: islandBeauty - Node.js种子爬虫项目
 * Author: njhxzhangjihong@126.com
 * Date: 8/24 2016
 * */

var fs = require('fs');
var request = require('request');
var exec = require('child_process').exec;
var cheerio = require('cheerio');
var config = require('../conf/config');


//加载网页解析库
var Parser1 = require("../lib/parser1");
var Parser2 = require("../lib/parser2");
var Parser3 = require("../lib/parser3"); 

var args = process.argv.slice(2);

var pattern = new RegExp("[\|\&\\s#\-\.\*\(\)\!\/]","g");

//自动创建目的下载目录
function mkdir(dst){
  if(dst){
    var cmd = "sh -x mkdir.sh " + dst;
    var out = exec(cmd);
    out.on("exit",function(code){
      if(code == 0){
        console.log("mkdir " + dst + " sucess.");
      }
    });
    return 0;
  }else {
    console.error("dst目录为空！");
    return 1;
 }
}

function search2down(entity,searchMovieName,pattern){
	return new Promise(function(resolve,reject){
    entity.getMatchResultInfo().then(function(linkObj){
      var link = linkObj.href;
      var resultName = linkObj.name;
      console.log(link);
      console.log(resultName);
      if(new RegExp(searchMovieName).test(resultName)){
        if(link){
          entity.getLink(link).then(function(downloadLinks){
            if(downloadLinks.length){
              for(var i=0,len=downloadLinks.length;i<len;i++){
                (function(i){
                  var downloadLink = downloadLinks[i].href;
                  var name = downloadLinks[i].title.replace(pattern,'');
                  entity.download(downloadLink,dst,name);
                })(i);
              }
              resolve("下载完成，请查看下载目录。");
            }else {
              reject("没有下载链接！");
            }
          });
        }else {
          reject("没有搜索结果！");
        }
      }else {
          reject("搜索结果不匹配！");
      }
    }).catch(function(){
	  reject("没有搜索结果！");
	});
  });
}

if(!args.length){
  //下载AV种子
  var url = config["downloadSrc"][0];
  var dst = config["downloadDir"][0];
  var parser1 = new Parser1(url);
	
  //创建目的目录
  if(mkdir(dst)){
    return;
  }

  console.log("下载中，请稍等...");
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

  var urlPreOfParser2 = config["downloadSrc"][1];
  var urlPreOfParser3 = config["downloadSrc"][2];
  //此处增加网页解析类...
  var searchMovieName = args[1];
  var dst = config["downloadDir"][1];
  var parser2 = new Parser2(urlPreOfParser2,searchMovieName);
  var parser3 = new Parser3(urlPreOfParser3,searchMovieName);

  if(mkdir(dst)){
    return;
  }

  console.log("下载中，请稍等...");
  search2down(parser2,searchMovieName,pattern).then(function(ret){
    console.log(ret);
  }).catch(function(e){
    console.log("Error: 海盗湾中文网搜索:" + e + " 尝试搜索BT天堂");
    search2down(parser3,searchMovieName,pattern).then(function(ret){
	  console.log(ret);
	}).catch(function(e){
	  console.log("Error: " + e);
	});
  });
}
