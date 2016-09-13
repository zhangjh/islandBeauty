/*
 * Des: 网页解析模板供具体的解析类继承
 * Author: njhxzhangjihong@126.com
 * Date: 9/12/2016
 * */

var exec = require('child_process').exec;

//继承封装函数
function extend(Child,Parent){
  var F = function(){};
  F.prototype = Parent.prototype;
  Child.prototype = new F();
  Child.constructor = Child;
  Child.uber = Parent.prototype;
}

//CommonParser: 搜索电影解析的公共模板类定义
var CommonParser = function(url){
  this.url = url;            //由前缀+搜索词构成
};

//获取匹配的搜索结果信息
CommonParser.prototype.getMatchResultInfo = function(){
  //具体实例实现逻辑
};


//详情页面获取下载链接
CommonParser.prototype.getLink = function(){
  //实例实现
};

//下载种子文件
CommonParser.prototype.download = function(link,dst,name){
  var cmd = "wget " + link + " -O " + dst + "/" + name + ".torrent";
  console.log(cmd);
  exec(cmd,function(e){
    if(e)console.error("Error: " + e);
  });
};

exports.extend = extend;
exports.CommonParser = CommonParser;
exports.exec = exec;
