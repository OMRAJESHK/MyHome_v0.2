$(document).ready(() => {
    $('#btnRegister').click(() => {
        window.location.href = "Register";
    });
    $('#btnLogin').click(() => {
        let postData = {
            username: $('#txtLoginEmail').val(),
            password: $('#txtLoginPassword').val(),
            grant_type: 'password'
        }
        ManageAjaxCalls.Post(ApiDictionary.token(), postData, getToken);

        //$.ajax({
        //    url: ApiDictionary.token(),
        //    method: 'post',
        //    contentType:'application/json',
        //    data: {
        //        username: $('#txtLoginEmail').val(),
        //        password: $('#txtLoginPassword').val(),
        //        grant_type:'password'
        //    },
        //    success: (response) => {
        //        sessionStorage.setItem('accessToken', response.access_token);
        //        ManageAjaxCalls.Get(ApiDictionary.GetUserRole(), getRoleID);
        //        //$.ajax({
        //        //    url: ApiDictionary.GetUserRole(),
        //        //    method: 'get',
        //        //    data: { Email: $('#txtLoginEmail').val() },
        //        //    success: (response) => {
        //        //         sessionStorage.setItem('RoleID', response);
        //        //        //window.location.href = window.rootpath + "Home/index";
        //        //    },
        //        //    error: (jqXHR) => {
        //        //        console.log('something went wrong...I donno what')
        //        //    }
        //        //});
               
        //    },
        //    error: (jqXHR) => {
        //        if (jqXHR.status == 500) {
        //            $('#loginErrTxt').text('Incorrect Username or Password...!!!');
        //            $('#loginErrMsgDiv').show('fade');
        //        }
                
        //    }
        //})

    })
    $('#loginLinkClose').click(() => {
        $('#loginErrMsgDiv').hide('fade');
    });

});

function getRoleID(res) {
    atob(res)
    sessionStorage.setItem('RoleID', res);
    window.location.href = window.rootpath + "Home/index";
}
function getToken(res) {
    sessionStorage.setItem('accessToken', res.access_token);
    ManageAjaxCalls.Get(ApiDictionary.GetUserRole(), getRoleID);
}