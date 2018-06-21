$(function() {
    Efun.gameCode = '{{gameCode}}';
    Efun.game = Efun.gameCode;
    Efun.activityCode = '{{activityCode}}';
    Efun.language = 'zh-CN';
    Efun.verifyCode = 'efunplatform';
    Efun.proUrl = '{{proUrl}}';
    Efun.cookieFlag = Efun.activityCode;
    Efun.webActivityUrl = '';
    Efun.loginServerUrl = '{{loginServerUrl}}';
    Efun.gameServerUrl = '{{gameServerUrl}}';
    Efun.fbId = '{{fbId}}'
    Efun.loginUrl = encodeURIComponent(
        Efun.webActivityUrl + "success.html?loginId=" + urlLoginId
    );
    Efun.afterInitRoleCallback = function() {};
    //导航栏
    EFUN.Nav.init({
        login: {
            from: 'turntable',
            callback: function(response) {
                console.log(response);
                // response.isLogin && refreshLoginStatus(response.user);
            }
        },
        isShowAllGame: true
    });
    var Business = {
        // 初始化
        init: function() {
            Efun.init();
            this.bindEvents();
        },
        bindEvents: function() {

        },

    };

    Business.init();
});