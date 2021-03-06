﻿class ManageAjaxCalls {
    static Get = (url,param,callBack) => {
        $.ajax({
            url: url,
            method: 'get',
            data: param,
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...I donno what')
            }
        });
    }
    static GetData = (url, callBack) => {
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
            },
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                if (jqXHR.status == '401') {
                    alert('Session Expired...!!!');
                    window.location.href = window.rootpath + "UserAccount/Login";
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
                console.log('something went wrong...I donno what')
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
