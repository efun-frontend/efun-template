var share_Util_thinker = (function () {
    function share_Util_thinker() {
    }
    share_Util_thinker.prototype.init = function () {
    };
    share_Util_thinker.shareToFacebook = function (FB_APP_ID, redirectUrl) {
        if (FB_APP_ID === void 0) { FB_APP_ID = this.FB_APP_ID; }
        if (redirectUrl === void 0) { redirectUrl = this.redirectUrl; }
        location.href = "//www.facebook.com/dialog/share?app_id=" + FB_APP_ID + '&href=' + encodeURIComponent(redirectUrl) + '&redirect_uri=' + encodeURIComponent(redirectUrl);
        console.log('object');
    };
    share_Util_thinker.shareToTwitter = function (title, content, redirectUrl) {
        if (redirectUrl === void 0) { redirectUrl = this.redirectUrl; }
        window.open('http://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + '%0D%0A' + encodeURIComponent(content) + '%0D%0A' + encodeURIComponent(redirectUrl));
    };
    share_Util_thinker.initKaKao = function () {
        return function (e, t, i) {
            var a, o = e.getElementsByTagName(t)[0];
            e.getElementById(i) || ((a = e.createElement(t)).id = i, a.src = 'https://developers.kakao.com/sdk/js/kakao.min.js', o.parentNode.insertBefore(a, o), a.onload = a.onreadystatechange = function () {
                this.readyState && 'loaded' != this.readyState && 'complete' != this.readyState || Kakao && Kakao.init('dec27c6cbce43b7f8941ea873187c611'),
                    a.onload = a.onreadystatechange = null;
            });
        }(document, 'script', 'kakao_sdk');
    };
    share_Util_thinker.shareToKaKao = function (title, description, imageUrl, redirectUrl) {
        if (redirectUrl === void 0) { redirectUrl = this.redirectUrl; }
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
    };
    share_Util_thinker.FB_APP_ID = 115441799073400;
    share_Util_thinker.KAKAO_APP_KEY = 'dec27c6cbce43b7f8941ea873187c611';
    share_Util_thinker.redirectUrl = '';
    return share_Util_thinker;
}());

//# sourceMappingURL=tools.js.map
