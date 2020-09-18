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
    console.log('postData', data)
    if (data == '404') {
        console.log(data)
    } else {
        sessionStorage.setItem('RoleID', 0);
        let postData = {
            username: data.TenentEmailId,
            password: data.TenentPassword,
            grant_type: 'password'
        }
        sessionStorage.setItem('UserName', data.ResidentsNames);
        $.isNumeric(data.AssetName) ?
            ManageAjaxCalls.Get(ApiDictionary.GetAssetName(), { AssetName: Number(data.AssetName) }, (res) => {
                var name = '';
                var id = '';
                if (res != undefined) {
                    name = res.AssetName;
                    id = res.AssetId;
                } else { name = id = 'N/A' }
                sessionStorage.setItem('AssetName', name);
                sessionStorage.setItem('AssetID', id);
                ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);
            }) :
            null;
    }
}
function getToken(res) {

    sessionStorage.setItem('accessToken', res.access_token);
    window.location.href = window.rootpath + "Home/index";
}