declare const Kakao:any;

class share_Util_thinker{
    // default use the test APP_ID
    static FB_APP_ID:number=115441799073400;
    static KAKAO_APP_KEY:string='dec27c6cbce43b7f8941ea873187c611';

    // 重定向
    static redirectUrl:string='';
    constructor(){

    }

    init(){

    }

    /**
     * 分享到Facebook的默认方法
     * @param FB_APP_ID 此处提供一个Efun 测试用的 appID: 115441799073400
     * @param redirectUrl 分享后跳转的地址
     */
    static shareToFacebook(FB_APP_ID:number=this.FB_APP_ID,redirectUrl:string=this.redirectUrl){
        location.href = "//www.facebook.com/dialog/share?app_id=" + FB_APP_ID + '&href=' + encodeURIComponent(redirectUrl) + '&redirect_uri=' + encodeURIComponent(redirectUrl)
            console.log('object');

    }


    /**
     * 分享到Twitter
     * twitter分享只能分享文字，注意分享文字shareTitle 和 redirectUrl中间的 ’ ’空格，这是必须的，
     * 否则后面的redirectUrl分享出去后并不能是链接点击即可跳转
     * @param {string} title 标题
     * @param {string} content 内容
     * @param {string} redirectUrl 重定向链接
     * @memberof Util
     */
    static shareToTwitter(title:string,content:string,redirectUrl:string=this.redirectUrl){
        window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '%0D%0A' + encodeURIComponent(content) + '%0D%0A' + encodeURIComponent(redirectUrl))
    }

    static initKaKao(){
        return function (e, t, i) {
            var a, o = e.getElementsByTagName(t)[0]
            e.getElementById(i) || ((a = e.createElement(t)).id = i, a.src = 'https://developers.kakao.com/sdk/js/kakao.min.js', o.parentNode.insertBefore(a, o), a.onload = a.onreadystatechange = function () {
              this.readyState && 'loaded' != this.readyState && 'complete' != this.readyState || Kakao && Kakao.init('dec27c6cbce43b7f8941ea873187c611'),
              a.onload = a.onreadystatechange = null
            })
          }(document, 'script', 'kakao_sdk')
    }

    static shareToKaKao(title:string,description:string,imageUrl:string,redirectUrl:string=this.redirectUrl){
        this.initKaKao();
        Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: title,
              description: description,
              imageUrl: imageUrl,
              link: {
                mobileWebUrl: redirectUrl,
                webUrl: redirectUrl
              }
            }
          });

          
    }
}
