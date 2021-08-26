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
        let phoneNumber = $('#txtLoginPhoneNumber').val();
        ManageAjaxCalls.Get(ApiDictionary.GetClientMailId(), { phoneNumber: phoneNumber}, getCredentials);
    })
});

function getCredentials(response) {
    console.log('postData', response)
    if (response == '404') {
        console.log(response)
    } else {
        sessionStorage.setItem('RoleID', 0);
        let password = $('#txtLoginPassword').val();
        let postData = {
            username: response.mailId,
            password: password,
            grant_type: 'password'
        }
        sessionStorage.setItem('UserName', response.names);
        ManageAjaxCalls.Get(ApiDictionary.GetAssetName(), { AssetName: Number(response.assetname) }, (res) => {
            var name = '';
            var id = '';
            if (res) {
                name = res.AssetName;
                id = res.AssetId;
            } else { name = id = 'N/A' }
            sessionStorage.setItem('AssetName', name);
            sessionStorage.setItem('AssetID', id);
            ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);
        });
    }
}
function getToken(res) {
    sessionStorage.setItem('accessToken', res.access_token);
    window.location.href = window.rootpath + "Home/index";
}

function resetPassword() {
    console.log("sdfsdhgfgfsffsf", window.location.href)
    let params = (new URL(window.location.href)).searchParams;
    let userID = params.get('userId');
    let code = params.get('code').replace(/ /g, '+');


    //const queryString = window.location.search;

    //const urlParams = new URLSearchParams(queryString);

    //const page_type = urlParams.get('code').replace(/ /g, '+');

    //console.log("page_type",page_type);

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        return results[1] || 0;
    }

    console.log("params", $.urlParam('code'))
    console.log("paramsuserId", $.urlParam('userId'))

    let pass = $('#reset_txtPassword').val();
    let email = $("#reset_txtEmail").val();
    $.ajax({
        url: '/api/Account/ResetPassword',
        method: 'post',
        data: {
            //Email: email,
            Id: userID,
            Password: pass,
            Code: String(code)
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
}

function forgotpasswordSendLink() {
    let email = $("#forgot_txtEmail").val();
    $.ajax({
        url: '/api/Account/ForgotPassword',
        method: 'post',
        data: {
            Email: email,
            //NewPassword: pass,
            //ConfirmPassword: pass
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
}