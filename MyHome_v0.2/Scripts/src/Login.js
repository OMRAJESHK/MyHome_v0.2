$(document).ready(() => {
    $('#btnRegister').click(() => {
        window.location.href = "Register";
    });
    
    $('#loginLinkClose').click(() => {
        $('#loginErrMsgDiv').hide('fade');
    });
});

function handleUserLogin() {
    if (!PhoneNumberValidate(Number($("#txtLoginPhoneNumber").val()))) {
        $("#txtLoginPhoneNumber").addClass("errorinput");
        $("#txtLoginPhoneNumber").focus();
        $(".errorExclamation").css("display","block")
    } else {
        $(".errorExclamation").css("display", "none")
        $("#txtLoginPhoneNumber").removeClass("errorinput");
        let phoneNumber = $('#txtLoginPhoneNumber').val();
        ManageAjaxCalls.Get(ApiDictionary.GetClientMailId(), { phoneNumber: phoneNumber }, getCredentials, (err) => {
            console.log("dsfdfdgfdg",err)
            loginCustomeToast("Login Failed", err, "bg-danger text-light")
        });
    }
}

function loginCustomeToast(txthead, txtbody, cls) {
    let toastHTML = txthead.length > 0 ?
        `<div class="fade border ${cls} customToast" data-delay="2000" id="tstNotifyUser">
                        <div class="toast-header"><strong class="mr-3" id="toastHeader">${txthead}</strong></div>
                        <div class="toast-body" id="toastBody"><div class="font-weight-bold">${txtbody}</div></div>
                    </div>`:
        `<div class="fade border ${cls} customToast" data-delay="2000" id="tstNotifyUser">
                        <div class="toast-body" id="toastBody"><div class="font-weight-bold">${txtbody}</div></div>
                    </div>`;

    $("#loginToast").html(toastHTML);
    $(document).find('#loginToast #tstNotifyUser').toast('show');
    //setTimeout(function () { $("#loginToast").html(""); }, 5000)
}

function handleLogin() {
    let Mail = $('#txtLoginEmail').val();
    let Password = $('#txtLoginPassword').val();
    sessionStorage.setItem('RoleID', 1);
    sessionStorage.setItem('UserMail', Mail);
    let adminName = Mail.split('@');
    sessionStorage.setItem('UserName', adminName[0]);
    let postData = { username: Mail, password: Password, grant_type: 'password' };
    ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);
}


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


/* validation for Phone Number */
function PhoneNumberValidate(number) {
    if (number) {
        var phoneno = /^[6-9]\d{9}$/;
        return phoneno.test(number) ? true : false;
    }
}
function resetPassword() {
    let params = (new URL(window.location.href)).searchParams;
    let userID = params.get('userId');
    let code = params.get('code').replace(/ /g, '+');
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