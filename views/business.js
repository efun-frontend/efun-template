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