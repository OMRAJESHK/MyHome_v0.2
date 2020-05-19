$(document).ready(function () {
    $('#btnSaveRegister').click(() => {
        $.ajax({
            url: '/api/account/Register',
            method: 'post',
            data: {
                email: $('#txtEmail').val(),
                password: $('#txtPassword').val(),
                confirmPassword: $('#txtConfirmPassword').val(),
            },
            success: () => {
                console.log('Registration Completed Successfully...!!!');
                $('#errMsgDiv').hide('fade');
            },
            error: (jqXHR) => {
                $('#errTxt').text(jqXHR.responseText);
                $('#errMsgDiv').show('fade');
            }
        });
    });
    $('#btnLoginBack').click(() => {
        window.location.href = "Login";
    })
    $('#linkCLose').click(() => {
        $('#errMsgDiv').hide('fade');
    });
})