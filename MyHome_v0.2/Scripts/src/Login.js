$(document).ready(() => {
    $('#btnRegister').click(() => {
        window.location.href = "Register";
    });
    $('#btnLogin').click(() => {
        let Mail = $('#txtLoginEmail').val();
        let Password = $('#txtLoginPassword').val();
        sessionStorage.setItem('RoleID', 1);
        sessionStorage.setItem('UserMail', Mail);
        let adminName = Mail.split('@');
        sessionStorage.setItem('UserName', adminName[0]);

        let postData = { username: Mail, password: Password, grant_type: 'password' }
        ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);
    });
    $('#loginLinkClose').click(() => {
        $('#loginErrMsgDiv').hide('fade');
    });

    $('#btnUserLogin').click(() => {
        let postData = {
            phoneNumber: $('#txtLoginPhoneNumber').val(),
            password: $('#txtLoginPassword').val()
        }
        ManageAjaxCalls.Get(ApiDictionary.GetTenantAgreement(), postData, getCredentials);
    })
});

function getCredentials(data) {
    if (data == '404') {
        console.log(data)
    } else {
        sessionStorage.setItem('RoleID', 0);
        let postData = {
            username: data.TenentEmailId,
            password: data.TenentPassword,
            grant_type: 'password'
        }
        sessionStorage.setItem('UserName', data.ResidentsNames)
        ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);
    }
}
function getRoleID(res) {
    atob(res)
    sessionStorage.setItem('RoleID', res);
    window.location.href = window.rootpath + "Home/index";
}
function getToken(res) {
    sessionStorage.setItem('accessToken', res.access_token);
    window.location.href = window.rootpath + "Home/index";
    if (sessionStorage.getItem('RoleID') == 1) {
        $(".btn_A_Dashboad").click()
    }
}