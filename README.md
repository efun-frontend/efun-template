# 活动页前端工程化

(本文编写大概时间约 5 小时, 约 3000 字,阅读可能需要 12 分钟).

- [活动页前端工程化](#%E6%B4%BB%E5%8A%A8%E9%A1%B5%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96)
  - [为什么要工程化](#%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E5%B7%A5%E7%A8%8B%E5%8C%96)
  - [特性](#%E7%89%B9%E6%80%A7)
  - [快速开始](#%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B)
    - [安装](#%E5%AE%89%E8%A3%85)
      - [gulp 插件依赖](#gulp-%E6%8F%92%E4%BB%B6%E4%BE%9D%E8%B5%96)
      - [VSCODE 插件依赖](#vscode-%E6%8F%92%E4%BB%B6%E4%BE%9D%E8%B5%96)
    - [使用](#%E4%BD%BF%E7%94%A8)
      - [使用 VSCODE 启动](#%E4%BD%BF%E7%94%A8-vscode-%E5%90%AF%E5%8A%A8)
      - [使用 CMD/PowerShell](#%E4%BD%BF%E7%94%A8-cmdpowershell)
  - [自定义配置](#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%85%8D%E7%BD%AE)
    - [关于 devServer 配置](#%E5%85%B3%E4%BA%8E-devserver-%E9%85%8D%E7%BD%AE)
      - [修改跨域](#%E4%BF%AE%E6%94%B9%E8%B7%A8%E5%9F%9F)
      - [端口](#%E7%AB%AF%E5%8F%A3)
  - [将会加入的](#%E5%B0%86%E4%BC%9A%E5%8A%A0%E5%85%A5%E7%9A%84)
  - [可能存在的问题](#%E5%8F%AF%E8%83%BD%E5%AD%98%E5%9C%A8%E7%9A%84%E9%97%AE%E9%A2%98)
  - [使用脚手架我需要注意什么?](#%E4%BD%BF%E7%94%A8%E8%84%9A%E6%89%8B%E6%9E%B6%E6%88%91%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E4%BB%80%E4%B9%88)
    - [Typescript](#typescript)
      - [如何编写或使用声明文件](#%E5%A6%82%E4%BD%95%E7%BC%96%E5%86%99%E6%88%96%E4%BD%BF%E7%94%A8%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6)
    - [Scss](#scss)
      - [添加任务](#%E6%B7%BB%E5%8A%A0%E4%BB%BB%E5%8A%A1)
      - [修改`dev`任务](#%E4%BF%AE%E6%94%B9dev%E4%BB%BB%E5%8A%A1)
  - [相关工作流说明:](#%E7%9B%B8%E5%85%B3%E5%B7%A5%E4%BD%9C%E6%B5%81%E8%AF%B4%E6%98%8E)
    - [Typescript](#typescript-1)
    - [解决缓存问题](#%E8%A7%A3%E5%86%B3%E7%BC%93%E5%AD%98%E9%97%AE%E9%A2%98)
    - [Debug Sourcemaps](#debug-sourcemaps)
    - [JS 的压缩](#js-%E7%9A%84%E5%8E%8B%E7%BC%A9)
    - [CSS 的压缩](#css-%E7%9A%84%E5%8E%8B%E7%BC%A9)
    - [CSS 的 AutoPrefixer](#css-%E7%9A%84-autoprefixer)
    - [JS / CSS 的合并](#js--css-%E7%9A%84%E5%90%88%E5%B9%B6)
    - [小图标转码为内联 base64](#%E5%B0%8F%E5%9B%BE%E6%A0%87%E8%BD%AC%E7%A0%81%E4%B8%BA%E5%86%85%E8%81%94-base64)
    - [gulp-plumber](#gulp-plumber)
    - [gulp-util](#gulp-util)
    - [自动合并雪碧图](#%E8%87%AA%E5%8A%A8%E5%90%88%E5%B9%B6%E9%9B%AA%E7%A2%A7%E5%9B%BE)
    - [使用 watch 插件提高构建效率](#%E4%BD%BF%E7%94%A8-watch-%E6%8F%92%E4%BB%B6%E6%8F%90%E9%AB%98%E6%9E%84%E5%BB%BA%E6%95%88%E7%8E%87)
    - [其他提高构建体验的插件](#%E5%85%B6%E4%BB%96%E6%8F%90%E9%AB%98%E6%9E%84%E5%BB%BA%E4%BD%93%E9%AA%8C%E7%9A%84%E6%8F%92%E4%BB%B6)
- [gulp-cli](#gulp-cli)

## 为什么要工程化

诚然 , 直接上手三板斧,建立文件夹`js`,`images`,`css`,然后建好`index.html`文件,一把梭就开始写,看上去还是很方便的对吧?那为什么要搞这么麻烦要工程化?

我们先来看看这样子会有什么问题,

- 没有自动刷新,每次修改一下 CSS 文件又得跑回到浏览器按 F5 刷新看效果.
- 没有跨域, 暴力点就直接改 hosts 文件,优雅点还要本地搭个 nginx 来代理一波,但非常麻烦.
- 没有自动部署到预发布环境,手动打开 Filezilla /WinTCP 等工具,然后把文件拖上去?
- 如果想使用较新的技术栈，我想用上如 Less/Scss/Stylus 等 CSS 预处理器,Typescript JS 预处理器,还得自己手动跑各种转换器,`tsc-watch server.ts --outDir ./dist`,`stylus -w style.styl -o style.css`
- 代码风格要符合团队规范: 空格还是 Tab?单引号还是双引号?属性值前面是否要空格?忙过头的时候,急着要交测试代码的时候,还记得住要遵循什么规范吗?

做完一个活动页项目之后,就能发现其中存在着非常多的`重复操作`,想想每次开个项目都得面对这些问题,忽而感觉人生苦短.

为了解决这些问题,现在打算抽象出通用的且能支持新框架特性的模板脚手架.

对于活动页这种适合敏捷灵活开发的项目而言,工程化不能做得非常大而全,而是应该比较轻便,可插拔式,能够适应每个人不同技术栈的需求,所以采用了 gulp 这种执行任务式的工作流方式,更能适应此类轻便的活动页,甚至能与 webpack 一同协作使用(gulp-webpack).

## 特性

此脚手架最大的重点应该就是`自由,轻量,简单`,比如我不喜欢某些特性/预处理器,我完全可以不用,或者不用去学习如何使用.各种特性能`自由插拔使用`,`零配置`,所有插件的引入都符合无负担性\无污染的特点.

经过实践和考虑,初步决定脚手架应该有如下特性:

- 自动刷新重载

- 支持跨域配置

- `支持CSS/JS 预处理器`,默认使用 Scss CSS 预处理器,以及带静态类型检查,支持编辑器原生级智能提醒的 Typescript JS 预处理器. 而且最重要的是: 这些特性是无负担性\无污染的,随时支持各种特性的任意插拔而无影响。这意味着哪怕你无需了解此类框架,仍能享受到部分新技术的红利,比如能通过智能提醒减少查找 API 的频次,静态强类型的纠错检查.

- 举个例子：倘若不喜欢使用 CSS 预处理器,你完全可以在`*.scss`文件中直接编写原生 CSS ,使用起来完全不会有任何影响,而且当你碰到一些重复的代码,想使用一些嵌套/循环等语法糖,可随时使用. Typescript 同理,哪怕你不了解也不使用到 Ts 的任何特性 ,在`*.ts`中写原生 js, 也能获得最基本类型的智能提醒和类型推断等增加代码书写体验 .另外对 jQuery 的支持非常良好,能直接在编辑器中获取良好的 API 提醒(部分甚至带 DEMO,能很好减少到网站查找 API 的次数).

- 支持`松散的代码风格`,想想当自己的写法跟团队规范有冲突(如我个人比较喜欢字符串用单引号,但团队要求双引号),为了达到自由和统一,本脚手架默认不会对`*.ts`文件进行规范检查,你可以随便按照自己的风格进行书写,而不必担心违反团队规范 ,脚手架会自动为你处理好一切(自动转译成符合团队规范的 js 文件).

- 支持`一键部署`到预发布/生产环境,而不是手动打开 Filezilla /WinTCP 等工具 ,然后把文件拖上去...等操作.

## 快速开始

### 安装

安装分为两部分: 第一部分是项目 gulp 的插件依赖,第二部分是 VSCODE 插件依赖(非必须,但强烈推荐,能极大增强编码体验)

#### gulp 插件依赖

1. 全局安装 gulp 和 gulp-cli

```
npm install -g gulp gulp-cli
```

2. 全局安装 typescript

```
npm install -g typescript
```

3. 拉取项目文件, 并在项目的根目录中执行:

```
npm install
```

#### VSCODE 插件依赖

1. ESLint
2. TSLint

在插件市场中搜索安装即可.

因为使用了 Typescript,所以强烈推荐在 VSCODE 的设置中添加: `"editor.formatOnSave": true`,每次`Ctrl + S` 自动拯救强迫症. (当然了,无论你是否格式化,最后工作流都会按照预定的结果输出)

另外单独推荐一些增强视觉/开发体验的工具,用过的都说好:

增强阅读:

1. Bracket Pair Colorizer

注释类:

1. Document This
2. Comment anchor
3. Better Comments

Git:

1. Git History
2. GitLens

格式化:

1. prettier
2. Beautify

### 使用

#### 使用 VSCODE 启动

如果你使用的是 VSCODE,使用`终端-运行编译任务`(默认快捷键 Ctrl+Shift+B ),即可启动脚手架

#### 使用 CMD/PowerShell

为了使用方便,已在 package.json 中添加`scripts`:

```json
"scripts": {
    "start": "npm run dev",
    "dev": "gulp build:dev",
    "prod": "gulp build:prod"
  },
```

然后你可以在命令行中输入`npm run dev` 启动.

## 自定义配置

默认无需配置,但根据项目需求,需要对某些内容进行配置的话:

1. 工作流相关配置项在根目录的在`gulpfile.js`文件下
2. Ts 代码提醒配置在`tsconfig.json`文件下,注意,此文件的配置仅用于 VSCODE 对 Ts 代码编辑器的提醒,`不作用于编译`的设置,如果需要修改,请到工作流配置文件中修改.
3. ESLint 默认对 src 文件夹中的`*.js`进行纠错提醒,相关配置可在 eslintrc.json 中修改.此项纠错对`*.ts`文件不生效.

### 关于 devServer 配置

在`gulpfile.js`中

#### 修改跨域

```js
const apiProxy = proxy("/api/", {
  target: "localhost:8080/api/",
  changeOrigin: true,
  ws: true
});
```

#### 端口

如果遇到端口冲突,修改本地开发服务器的端口:

```js
gulp.task('serve', () => {
    //...
    browserSync.init({
    port: 3001,
    server: {
        baseDir: "./dev",
        index: 'index.html',
        middleware: [apiProxy]
    }
    //...
});
```

## 将会加入的

- [待定]其中也有思考过是否加入 HTML 预处理器,能够方便地控制各个不同地区的`<head>`标签和引用库.
- [待定]自动部署到 FTP/SSH 服务器 , 为了防止出现高危操作 , 此处自动部署只能先上传到预发布环境中,经过 REVIEW 后再自行发布到生产环境

## 可能存在的问题

## 使用脚手架我需要注意什么?

### Typescript

#### 如何编写或使用声明文件

1. 推荐用几分钟为后端传输过来的数据对象(Ajax DTO)编写声明,会极大增强纠错能力,提升良好的开发体验(以后可以考虑使用 node 对后端 API 文档进行自动化提取,但需要与后端统一协商规范 API 文档的编写,待定);
2. TypeScript 2.0 推荐使用 @types 来管理, 它的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：

(脚手架已经自带`@types/jquery` , 此处仅用于示范.)

```shell
npm install @types/jquery --save-dev
```

当安装完成之后,当你在 VSCODE 中输入 `$` / `jQuery` 等关键词时会获得相关属性/方法的补全提示,带参数说明.

可以在这个页面搜索你需要的声明文件。

https://microsoft.github.io/TypeSearch/

> 另附上推荐阅读:
> [Typescript-声明文件](https://ts.xcatliu.com/basics/declaration-files.html)

### Scss

Less/Scss/Stylus 三大主流 CSS 预处理器框架是比较得最多的框架,参考了许多横向评价之后,最后决定使用 Scss.
当然,你可以根据自己的需要,在`gulpfile.js`中添加或修改为自己喜欢的 CSS 预处理器.
但别忘记安装相关依赖 ,以下以 less 预处理器举例:

#### 添加任务

1. less-to-css

```js
gulp.task("less-to-css", () => {
  gulp
    .src("./src/less/*.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(
      autoprefixer({
        browsers: [">5%", "last 2 versions", "IE 9-11"]
      })
    )
    .pipe(dest(`${devPath}/css/`))
    .pipe(
      reload({
        stream: true
      })
    );
});
```

2. 监听:

```js
gulp.task("less:watch", () => {
  gulp.watch("./src/**/*.less", ["less-to-css"]);
});
```

#### 修改`dev`任务

你只需要修改一下`build:dev`任务中的`scss-to-css` 为 `less-to-css`:
以及监听任务 `scss:watch` 为 `less:watch`.

1. 修改启动任务:

```js
// 生成开发环境
gulp.task("build:dev", ["html", "less-to-css", "compile-ts:dev"], () => {
  gulp.start("html:watch");
  gulp.start("ts:watch");
  gulp.start("less:watch");
  gulp.start("images:watch");

  gulp.start("serve");
});
```

相关文档 SCSS: http://sass.bootcss.com/docs/sass-reference/

## 相关工作流说明:

如果你需要个性化配置所需的插件属性,可参考以下索引.

### Typescript

`gulp-typescript` 将 typescript 转为 js

> https://www.npmjs.com/package/gulp-typescript

Example:

```js
var gulp = require("gulp");
var ts = require("gulp-typescript");

gulp.task("default", function() {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: "output.js"
      })
    )
    .pipe(gulp.dest("built/local"));
});
```

### 解决缓存问题

`gulp-rev-append` : 写至文件引用 URI 的 query 中

```
- 效果：<script src='BearD01001.min.js?rev=366dc531e1'></script>

- 优点：每次更新不会产生新文件，有效避免文件冗余

- 缺点：更新时短时间内，客户端请求到的静态文件可能不一致，造成非预期结果

- 建议：推荐流量小、或可规避高峰期更新的 Web 系统使用

- 插件：gulp-rev-append

```

Example:

```js
var gulp = require("gulp");
var revAppend = require("gulp-rev-append");
gulp.task("html", () => {
  gulp
    .src("*.html")
    .pipe(revAppend())
    .pipe(gulp.dest("./"));
});
```

### Debug Sourcemaps

`gulp-sourcemaps`:

开启 sourcemaps ，调试过程中就可以在开发者工具中直接看到编译前的源文件，而不是编译后的文件。

```js
gulp.task("javascript", () => {
  gulp
    .src("src/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(plugin1())
    .pipe(plugin2())
    .pipe(sourcemaps.write("_srcmap"))
    .pipe(gulp.dest("dist"));
});
```

### JS 的压缩

插件

- gulp-uglify

使用 UglifyJS 压缩 JS 文件

### CSS 的压缩

使用 clean-css 压缩 CSS 文件
插件

- gulp-clean-css

> ！注意！ 搜索 CSS 压缩工具的时候极有可能搜到 gulp-minify-css，该插件已被弃用

### CSS 的 AutoPrefixer

> https://www.npmjs.com/package/gulp-autoprefixer

Usage

```js
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");

gulp.task("default", () =>
  gulp
    .src("src/app.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist"))
);
```

### JS / CSS 的合并

JS 或 CSS 文件的合并都是使用同一款插件 gulp-concat。

插件

- gulp-concat

### 小图标转码为内联 base64

插件

- gulp-base64

简介

将 CSS 中引用的小图标转码为 base64 编码的 data URI 字符串，减少额外的 http 请求数。

使用

```js
// 基础示例
gulp.task("build", () => {
  gulp
    .src("./css/*.css")
    .pipe(base64())
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./public/css"));
});
```

当然也有简单但是十分好用的几个可选参数：

```js
gulp.task("build", () => {
  gulp
    .src("./css/*.css")
    .pipe(
      base64({
        baseDir: "public",
        extensions: ["svg", "png"],
        exclude: [/\.server\.(com|net)\/dynamic\//, "--live.jpg"],
        maxImageSize: 8 * 1024, // bytes
        debug: true
      })
    )
    .pipe(concat("main.css"))
    .pipe(gulp.dest("./public/css"));
});
```

Tips：在 extensions 参数中可以使用正则（例如：/\.jpg#datauri\$/i）匹配带有指定 hash 的引用文件，

这样在开发过程中就可以通过在文件末尾加上对应的 hash （例如： background-image: url(./images/icon.jpg#datauri); ）手动指定哪些文件转码成 data URI

### gulp-plumber

> https://www.npmjs.com/package/gulp-plumber

构建异常捕获，防止构建进程崩掉

### gulp-util

> https://www.npmjs.com/package/gulp-rev-append

这个插件其实很强大，集合了许多 Gulp 中常用的小工具，例如 log() 、 colors 等等，这里只用到了 beep() & log ，就是让电脑 哔 ~ 的响一声然后抛出异常

使用

```js
var gulp = require("gulp"),
  gutil = require("gulp-util"),
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  plumber = require("gulp-plumber");

gulp.task("build", () => {
  gulp
    .src("./_src/js/*.js")
    // 最先 pipe 到 plumber 中，以便出现异常前准备捕获
    .pipe(
      plumber({
        errHandler: e => {
          gutil.beep(); // 哔~ 的响一声
          gutil.log(e); // 抛出异常
        }
      })
    )
    .pipe(babel())
    .pipe(concat("all.js"))
    .pipe(gulp.dest("./public/js"));
});
```

### 自动合并雪碧图

插件

- gulp-spriter
  > https://www.npmjs.com/package/gulp-spriter

帮助前端工程师将 css 代码中的切片图片合并成雪碧图，支持 retina 图片。

### 使用 watch 插件提高构建效率

gulp.src 这个方法相信大伙儿都特别熟悉了，传入 Glob 来匹配并读取文档流，但是这个方法的缺点也很明显，就是会读取全部匹配的文件（即使文件未作修改），这样导致的一个明显问题就是：

随着项目的开发，文件越来越多，构建速度越来越慢。

当然，我们可以使用 Gulp 内置的 watch 方法来规避这个问题，不过这个方法有一个小问题不知道大家有没有发现，就是它检测不到新建文件的事件，感觉蛮不合理的。所以现在一般使用 gulp-watch 这个插件，这个插件可以自定义触发事件，而且通过插件提供回调机制配合大家熟悉的 console 可以很方便的观察到构建流程。

插件

- gulp-watch

简介

实时监测文件变化（可自定义触发事件与回调方法）

使用

```js
    var gulp    = require('gulp'),
        watch   = require('gulp-watch'),
        gutil   = require('gulp-util'),
        moment  = require('moment'),
        colors  = require('colors');

    gulp.task('js', () => {
        watch('./_src/js/*.js', (vinyl) => {
                console.log( [${ moment().format('HH:mm:ss').gray }] ${ vinyl.basename.yellow } rebuilding. );
            })
            .pipe(plugin1())
            .pipe(plugin2())
            .pipe(gulp.dest('./public/js'));
    });
```

通常的使用方法就是这样了，默认监测 ['add', 'change', 'unlink'] 通常是够用的，可以使用 options.events 来手动设置监测的事件类型。

回调函数会在每次监测到事件时触发，可以通过参数 vinyl 对象取得文件的详细信息。

前面的 watch 回调中实现了一个简单的构建流程监控，更完善的解决方案推荐使用 gulp-notify

### 其他提高构建体验的插件

使用了 gulp-moment 与 gulp-colors ，这两个插件无关项目，纯属为了更好的监控构建状态引入的两个插件，下面简单介绍一下

插件

1. gulp-moment

2. gulp-colors

简介

1. gulp-moment ：相信不少小伙伴儿在 browser-side 用过 moment.js 这个工具，主要是进行时间方面的计算与格式化， Moment.js | Home 有详细的介绍，使用起来很方便！

2. gulp-colors ：这个是用来设置 CLI 输出文字的颜色的，只要在任意字符串后面使用，就可以改变输出到终端的文字颜色、样式。

使用

1. gulp-moment ： moment().format('HH:mm:ss') 格式化当前时间格式，其他参考 Moment.js

2. # gulp-colors ： '\*.html'.yellow ，任意字符串后面加上 . + COLOR ，即可改变颜色，Colors.js 有多种配色与样式可供选择。

# gulp-cli

gulp 活动工作流脚手架
