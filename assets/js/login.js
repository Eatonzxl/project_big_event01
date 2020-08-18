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

    // 自定义验证规则
    var form = layui.form;
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,16}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // console.log(value);
            var pwd = $('.reg-box input[name=password]').val();
            if (pwd !== value) {
                return "两次密码输入不一致";
            }
        }
    });

    // 注册功能
    var layer = layui.layer;
    $('#form-reg').on('submit', function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: function (res) {
                // 返回状态判断
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 提交成功后处理代码
                layer.msg('注册成功，请登录！');
                // 手动切换到登录表单
                $("#link-login").click();
                // 重置form表单
                $('#form-reg')[0].reset();
            }
        });
    });

    // 登录功能（给form标签绑定事件，button按钮触发提交事件）
    $("#form-login").submit(function (e) {
        // 阻止表单提交
        e.preventDefault();
        // 发送ajax
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 此时的this指向$("#form-login")  serialize()获取表单所有的值 需要有name属性
            data: $(this).serialize(),
            success: function (res) {
                // 校验返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 提示信息 保存token 跳转页面
                layer.msg('恭喜您，登录成功！');
                // 保存token 未来的接口要用到token
                console.log(res.token);
                localStorage.setItem('token', res.token);
                // 跳转
                location.href = '/index.htmls';
            }
        });
    });
});