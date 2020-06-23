$(document).ready(function () {
    $('#btnSaveRegister').click(() => {
        $.ajax({
            url: '/api/account/Register',
            method: 'post',
            data: {
                email: $('#txtEmail').val(),
                password: $('#txtPassword').val(),
                confirmPassword: $('#txtConfirmPassword').val(),
                PhoneNumber: $('#txtPhoneNumber').val()
            },
            success: (data) => {
                console.log(data);
                $('#errMsgDiv').hide('fade');
            },
            error: (jqXHR) => {
                $('#errTxt').text(jqXHR.responseText);
                $('#errMsgDiv').show('fade');
            }
        });
    });
    $('#btnLoginBack,#btnAdminLoginBack').click(() => {
        window.location.href = "Login";
    })
    $('#linkCLose').click(() => {
        $('#errMsgDiv').hide('fade');
    });

    $('#btnAdminSaveRegister').click(() => {
        $.ajax({
            url: '/api/account/AdminRegister',
            method: 'post',
            data: {
                email: $('#txtAdminEmail').val(),
                password: $('#txtAdminPassword').val(),
                confirmPassword: $('#txtAdminConfirmPassword').val(),
            },
            success: () => {
                console.log('Registration Completed Successfully...!!!');
                $('#AdminErrMsgDiv').hide('fade');
            },
            error: (jqXHR) => {
                $('#AdminErrTxt').text(jqXHR.responseText);
                $('#AdminErrMsgDiv').show('fade');
            }
        });
    });


    $('#AdminLinkCLose').click(() => {
        $('#AdminErrMsgDiv').hide('fade');
    });
})