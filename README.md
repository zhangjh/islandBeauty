# islandBeauty | 岛国丽人

[Readme in English](https://github.com/zhangjh/islandBeauty/blob/master/README.en.md)

岛国丽人的小伙伴们可以去看下我最新的[tumblr spider](https://github.com/zhangjh/node_tumblr_spider)项目，一个针对tumblr的爬虫项目。
如果说岛国丽人只是一个种子下载器的话，tumblr spider算是一个比较名副其实的爬虫了。

## 概述
* 岛国丽人是一个Node.js爬虫项目，顾名思义，可以用来获取**不可描述**电影的种子文件。
* 当然，我的本意只是用Node做一个爬虫，**Adult torrent**只是一个比较火爆的题材。
* 我曾在网上搜索过很多相关的爬虫项目，无一例外的**不好用**！要么是硬编码的厉害，要么是可用性很差。跟他们号称的爬虫基本相差很远。
* 岛国丽人项目也并不想号称爬虫，充其量算是一个种子下载器。但支持配置化以及页面解析的可插拔，杜绝硬编码问题，保留适当地可扩展性。
* AV种子下载只是一个题材，我的真实用途是下载电影种子，岛国丽人项目亦可支持下载**海盗湾中文网**及**bt天堂**的电影种子。

## 社交
- [微博](http://login.sina.com.cn/sso/login.php?url=http%3A%2F%2Fweibo.com%2Fjhspider&_rand=1472023636.7234&gateway=1&service=miniblog&entry=miniblog&useticket=1&returntype=META&_client_version=0.6.23)

- [我的博客](http://5941740.cn)

- [藏经阁](http://favlink.me)

欢迎通过上述方式与我联系

## 用法
1. 安装Node

  本项目为Node.js项目，需要[安装Node](https://nodejs.org/en/)运行环境，Windows建议安装[babun](https://github.com/babun/babun)作为终端代替cmd。

2. 下载

  下载本项目源码： [zip](https://github.com/zhangjh/islandBeauty/archive/master.zip)、[src](https://github.com/zhangjh/islandBeauty.git)

3. 安装依赖
  ```
  //进入项目目录
  cd islandBeauty
  npm i -d
  ```

4. 下载不可描述小电影
  ```
  cd bin 
  node main.js
  ```
  电影种子将保存在项目`dst/av`目录下
  
  ![](http://ww1.sinaimg.cn/large/62d95157gw1f74vnp2x7kj20mj0akmzt.jpg)


5. 下载电影

  下载电影通常都是带有目的性的去查找电影下载，一股脑的把爬取的种子下下来并不可取。下载电影功能需要传入搜索参数，即欲下载电影名。
  
  ```
  cd bin
  node main.js search 美人鱼
  ```
  
  电影种子将保存在项目`dst/movie`目录下
  
  ![](http://ww4.sinaimg.cn/large/62d95157gw1f74vsp6qwqj20dp02ywek.jpg)
  
  如果要自定义下载路径，可修改`conf/config.js`文件。
  

##  忠告
这个项目拢共就做了两件事：

1. 下载小电影

2. 下载正常电影

如果说有什么忠告的话，我要说的是**"小撸怡情 大撸伤身 强撸灰飞烟灭"**。

你要问卤煮有没有下小电影，这些都是次要的。

很惭愧就做了这么一点微小的工作，谢谢大家，蛤蛤。
