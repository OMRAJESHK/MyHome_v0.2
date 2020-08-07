function RequestCall() {
    let assetID = sessionStorage.getItem('AssetID');
    const getRequestRes = (res) => {    
        $('#RenderContent #tblRequest tbody').empty();
        let rowItem = '';
        $.each(res, function (key, row) {
            rowItem += '<tr><td>' +
                row.RequestDate + '</td><td>' +
                row.Description + '</td><td>' +
                row.Response + '</td></tr>';
        });
        $('#RenderContent #tblRequest tbody').append(rowItem);
    }
    ManageAjaxCalls.GetData(ApiDictionary.GetRequest() +'?assetID='+assetID, getRequestRes);
}
const RequestPostResponse = (res) => {
    console.log(res)
}
function saveRequest() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    let description = $('#RenderContent #txtRequestBody').val();
    let assetID = sessionStorage.getItem('AssetID');
    let saveObj = {
        AssetName: assetID ,
        Description: description,
        RequestDate: today,
        Response: ''
    }
    ManageAjaxCalls.Post(ApiDictionary.PostRequest(), JSON.stringify(saveObj), RequestPostResponse);
}
function saveRequestPage (){
    let url = window.rootpath + TenantURLs.saveRequest;
    $.get(url, function (response) {
        RenderContent.html(response);
    });
} 