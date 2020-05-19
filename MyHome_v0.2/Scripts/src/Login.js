$(document).ready(() => {
    $('#btnRegister').click(() => {
        window.location.href = "Register";
    });

    $('#btnLogin').click(() => {
        $.ajax({
            url: '/token',
            method: 'post',
            contentType:'application/json',
            data: {
                username: $('#txtLoginEmail').val(),
                password: $('#txtLoginPassword').val(),
                grant_type:'password'
            },
            success: (response) => {
                console.log('dsfdfs', window.location.href)
                sessionStorage.setItem('accessToken', response.access_token);
                window.location.href = window.rootpath + "Home/index";
            },
            error: (jqXHR) => {
                $('#loginErrTxt').text(jqXHR.responseJSON.error_description);
                $('#loginErrMsgDiv').show('fade');
            }
        });
    });
    $('#loginLinkClose').click(() => {
        $('#loginErrMsgDiv').hide('fade');
    });

});