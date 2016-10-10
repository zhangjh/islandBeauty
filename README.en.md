# islandBeauty | 岛国丽人

## Description
* islandBeauty is a project of torrent downloader writtern by Node.js.
  As ths name suggests, the project can download adult video torrent files.

* Of course, my original purpose is just using Node to write a crawler. Adult video is just a hot theme.

* I had search many projects about spiders or crawlers, most of them are hard to use. Either hard to extend because of hardcoded or have poor avaliability.

* IslandBeauty is also not a spider,it is a torrent downloader at best. But is support to config and the page parser is pluggable, that make islandBeauty has some scalability.

* As mentioned, adult video is just a hot theme, I usually use this to download general movies.


## Social links
- [Weibo](http://login.sina.com.cn/sso/login.php?url=http%3A%2F%2Fweibo.com%2Fjhspider&_rand=1472023636.7234&gateway=1&service=miniblog&entry=miniblog&useticket=1&returntype=META&_client_version=0.6.23)

- [My Blog -- Dante notes](http://5941740.cn)

- [favLinks](http://favlink.me)

Welcome to cantact me.

## Usage
1. INSTALL

	Visit [Node.js official website](https://nodejs.org/en) to install node enviroment.
	It's better to install [babun](https://github.com/babun/babun), a better terminal replacement of cmd on Windows system.


2. Download project

	Download this project.

	[zip](https://github.com/zhangjh/islandBeauty/archive/master.zip)、[src](https://github.com/zhangjh/islandBeauty.git)

3. Install dependence

  ```
  cd islandBeauty
  npm i -d
  ```

4. Get adult video torrent files

  ```
  cd bin 
  node main.js
  ```
  The av torrent files will save to `dst/av`.
  
  ![](http://ww1.sinaimg.cn/large/62d95157gw1f74vnp2x7kj20mj0akmzt.jpg)


5. Get normal movies

   We usually search the specific movie and download it, so if we download all of the torrent files founded by the tool will not acceptable.
   To get one movie torrent file, you will pass the movie name to the tool.
   Using this command:

  
  ```
  cd bin
  node main.js search 美人鱼
  ```
  The movie torrent file will save to `dst/movie`. 
  
  
  ![](http://ww4.sinaimg.cn/large/62d95157gw1f74vsp6qwqj20dp02ywek.jpg)

  If you want to customize the download directory, you can modify the `conf/config` file.
  

