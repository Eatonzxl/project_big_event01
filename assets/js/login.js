$(function () {
    // 点击去注册账号的链接
    $("#link-reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击去登录的链接
    $("#link-login").on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });
});