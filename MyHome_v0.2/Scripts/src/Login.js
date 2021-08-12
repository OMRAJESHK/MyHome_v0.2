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