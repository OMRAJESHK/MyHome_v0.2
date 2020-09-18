$(document).ready(() => {
    getClientRequests();
})
let request = [];
function RequestCall() {
    let assetID = sessionStorage.getItem('AssetID');
    ManageAjaxCalls.GetData(ApiDictionary.GetRequest() + '?assetID=' + assetID, (res) => {
        request = res;
        let rowItem = `<div class="text-center mb-2 d-none" id="divLoadMore">
            <button class="btn btn-info">Load More</button></div >`;
        $.each(res, function (key, row) {
            rowItem += (sessionStorage.getItem('RoleID') == 0) ? clietResponseHTML(row) : adminResponseHTML(row)
        });
        $('#RenderContent #divChatBody').html(rowItem); 
        let id = request[request.length - 1].TenentRequestId;
        let saveObj = {
            AssetName: assetID,
            Description: request[request.length - 1].Description,
            RequestDate: request[request.length - 1].RequestDate,
            Response: request[request.length - 1].Response,
            Status: 2
        }
        ManageAjaxCalls.Put(ApiDictionary.PutRequest() + '?id=' + id, JSON.stringify(saveObj), () => {
            console.log('status - 2')
        });
    });
}
const ReqResponse = (res) => {
    RequestCall();
    $('#RenderContent #txtRequestBody').val('')
}
const clietResponseHTML = (row) => {
    return row.Response != "" ? `
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>
                <div class="bg-primary chatBubble float-left">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>Admin </div>
                    </div>
                    <label>${row.Response}</label>
                </div>`: `
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>`;
}
const adminResponseHTML = (row) => {
    return row.Status != 0 && row.Response != "" ?
        `<div class="bg-primary chatBubble float-left">
                   <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>
                <div class="bg-secondary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom"><div>Admin </div></div>
                    <label>${row.Response}</label>
                </div>`: `
                 <div class="bg-primary chatBubble float-left" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>`;
}
function getClientRequests() {
    ManageAjaxCalls.GetData(ApiDictionary.GetRequest() + `?AssetName=${sessionStorage.getItem('AssetID')}`, (res) => {
        let RequestList = '';
        $('#btnAllRequest').prop('disabled', false);
        res.map(row => {
            if (sessionStorage.getItem('RoleID') == 0 && row.Status == 1) {
                RequestList += `
                    <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                            <label class="notifnLetter">T</label>
                        </div>
                        <div class="content">
                             <p>${row.Description}</p><span class="date">${row.RequestDate}</span>
                        </div>
                    </div>`
            }
        });
        let ReqNum = res.filter(x => x.Status === 0).length;
        $('#listRequest').html(RequestList);
        $('#RequestCount').text(`You have ${ReqNum} Requests`);
        ReqNum != 0 ? $('#ReqQuantity').text(ReqNum).removeClass('d-none') : $('#ReqQuantity').addClass('d-none');
    });
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
            Response: description,
            Status:1
        }
        ManageAjaxCalls.Put(ApiDictionary.PutRequest()+'?id='+id, JSON.stringify(saveObj), ReqResponse);
    } else {
        let saveObj = {
            AssetName: assetID,
            Description: description,
            RequestDate: today,
            Response: '',
            Status:0
        } 
        ManageAjaxCalls.Post(ApiDictionary.PostRequest(), JSON.stringify(saveObj), ReqResponse);
    }
}


