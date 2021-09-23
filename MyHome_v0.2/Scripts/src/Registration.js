$(document).ready(function () {
    $('#btnLoginBack,#btnAdminLoginBack').click(() => {
        window.location.href = "Login";
    })
    $('#linkCLose').click(() => {
        $('#errMsgDiv').hide('fade');
    });



    $('#AdminLinkCLose').click(() => {
        $('#AdminErrMsgDiv').hide('fade');
    });
});

function handleAdminRegistration() {
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
}

function toLogin() {
    window.location.href = "Login";
}

function handleRegistration() {
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
            console.log(jqXHR);
            loginCustomeToast("Registration", jqXHR.responseJSON.Message, "bg-danger");
            $('#errTxt').text(jqXHR.responseText);
            $('#errMsgDiv').show('fade');
        }
    });
}