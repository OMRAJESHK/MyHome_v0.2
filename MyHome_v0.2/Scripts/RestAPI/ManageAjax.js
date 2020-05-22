class ManageAjaxCalls {
    static Get = (url,callBack) => {
        $.ajax({
            url: url,
            method: 'get',
            data: { Email: $('#txtLoginEmail').val() },
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...I donno what')
            }
        });
    }
    static Post = (url, data, callBack) => {
        $.ajax({
            url: url,
            method: 'post',
            contentType: 'application/json',
            data: data,
            success: (response) => { callBack(response) },
            error: (jqXHR) => {
                console.log('something went wrong...I donno what')
            }
        });
    }
}
