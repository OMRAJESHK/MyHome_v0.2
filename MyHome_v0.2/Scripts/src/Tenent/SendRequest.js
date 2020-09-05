$(document).ready(() => {
    $(document).find("div#RenderContent #divChatBody").scroll(function () {
        alert()
        var y = window.scrollY;
        console.log('dddddddddddd', window.scrollY)
    });
})
let request = [];
function RequestCall() {
    let assetID = sessionStorage.getItem('AssetID');
    ManageAjaxCalls.GetData(ApiDictionary.GetRequest() + '?assetID=' + assetID, (res) => {
        request = res;
        $('#RenderContent #tblRequest tbody').empty();
        let rowItem = `<div class="text-center mb-2 d-none" id="divLoadMore">
            <button class="btn btn-info">Load More</button></div >`;
        $.each(res, function (key, row) {
            rowItem += (sessionStorage.getItem('RoleID') == '0') ? row.Response != "" ? `
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${ row.Description}</label>
                </div>
                <div class="bg-primary chatBubble float-left">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>Admin </div>
                    </div>
                    <label>${ row.Response}</label>
                </div>`: `
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${ row.Description}</label>
                </div>`:
                row.Response != "" ?
                    `<div class="bg-primary chatBubble float-left">
                   <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${ row.Description}</label>
                </div>
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom"><div>Admin </div></div>
                    <label>${ row.Response}</label>
                </div>`: `
                 <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${ row.Description}</label>
                </div>`
        });
        $('#RenderContent #divChatBody').html(rowItem); 
    });
}
const RequestPostResponse = (res) => {
    RequestCall();
    $('#RenderContent #txtRequestBody').val('')
}
function saveRequest() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    let description = $('#RenderContent #txtRequestBody').val();
    let assetID = sessionStorage.getItem('AssetID');
    if (sessionStorage.getItem('RoleID') == 1) {
        let id = request[request.length - 1].TenentRequestId;
        let saveObj = {
            AssetName: assetID,
            Description:request[request.length - 1].Description ,
            RequestDate: today,
            Response: description
        }
        ManageAjaxCalls.Put(ApiDictionary.PutRequest()+'?id='+id, JSON.stringify(saveObj), RequestPostResponse);
    } else {
        let saveObj = {
            AssetName: assetID,
            Description: description,
            RequestDate: today,
            Response: ''
        } 
        ManageAjaxCalls.Post(ApiDictionary.PostRequest(), JSON.stringify(saveObj), RequestPostResponse);
    }
    
    
}


