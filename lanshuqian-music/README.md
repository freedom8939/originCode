# 纯原生js,css,html项目
## 项目介绍：


> 本项目是一款在线的音乐播放器项目，项目由
> HTML5, CSS3, JavaScript实现。
> 项目中使用了两个前端第三方库(均以cdn方式引进,少量使用):
> + Cookies (用于简化操作cookie)
> + jquery  (用于简化元素获取)
> <br/> 
> 
> 后端基于JAVA实现，实现了用户登录,注册,退出登录，JDK版本: JDK11。使用SpringBoot进行快速开发，主要技术栈：
> <br/>
> + Spring + SpringMVC + SpringBoot 框架
> + MyBatis Plus 数据访问框架
> + MySQL8.0 数据库
> 
 
### 项目存在问题：
> 1. 由于使用类似vue中router的机制，本项目使用了iframe进行内部的跳转，但是由于浏览器的同源策略，我不能够使用外部index.js引入，导致文件冗余
> <br/>`解决办法`：两端都使用同二级域名，domain='xxx'
> 2. 歌词部分简单实现，只是使用了keyframes进行元素的上移而已，
> <br/> `解决办法`：
> <br/>
>    1. 创建一个定时器，比如说几百ms执行一次
>    2. 算出当前播放的时间和预定时间的差
>    3. 根据差异来更新歌词显示
>
## 项目地址:
> [GitHub](https://github.com/freedom8939/originCode/tree/master)
## 作者信息：
+ 姓名：王金园
+ 学号：202321020167

