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
## 作者信息：
+ 姓名：王金园
+ 学号：202321020167

