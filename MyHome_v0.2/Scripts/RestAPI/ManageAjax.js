class ManageAjaxCalls {
    static Get = (url, param = {},callBack,errCallback) => {
        $.ajax({
            url: url,
            method: 'get',
            data: param,
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...', jqXHR);
                errCallback(jqXHR?.responseJSON?.Message)
            }
        });
    }
    static GetData = (url, callBack, errCallback) => {
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
            },
            success: (response) => { callBack && callBack(response) },
            error: (err) => {
                if (err.status == '401') {
                    alert('Session Expired...!!!');
                    window.location.href = window.rootpath + "UserAccount/Login";
                } else if (err.status == '400') {
                    console.error("Bad Request");
                } else if (err.status == '404') {
                    errCallback && errCallback()
                }
                console.log('something went wrong...I donno what');
            }
        });
    }
    static Post = (url, data, callBack) => {
        $.ajax({
            url: url,
            method: 'post',
            headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
            contentType: 'application/json',
            data: data,
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                callBack(jqXHR)
            }
        });
    }
    static Put = (url, data, callBack) => {
        $.ajax({
            url: url,
            method: 'put',
            headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
            contentType: 'application/json',
            data: data,
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...I donno what')
            }
        });
    }
    static Delete = (url, callBack) => {
        $.ajax({
            url: url,
            method: 'delete',
            headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
            contentType: 'application/json',
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...I donno what')
            }
        });
    }
    
}
const GetAjax = (url, param = {}) => {
    return $.ajax({
        url: url,
        method: 'get',
        data: param,
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
        }
    });
}

const PostAjax = (url, data = {}) => {
    console.log("uersbfsfs",url)
    return $.ajax({
        url: url,
        method: 'post',
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        contentType: 'application/json',
        data: data,
    });
}

const PutAjax = (url, data = {}) => {
    return $.ajax({
        url: url,
        method: 'put',
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        contentType: 'application/json',
        data: data,
    });
}

const DeleteAjax = (url, data = {}) => {
    return $.ajax({
        url: url,
        method: 'delete',
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        data: data,
    });
}