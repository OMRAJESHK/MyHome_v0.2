$(document).ready(() => {
    !isAdmin() && getClientRequests();
})
let request = [];
async function RequestCall() {
    let assetID = sessionStorage.getItem('AssetID');
    let requestCallData = await GetAjax(`${ApiDictionary.GetRequests()}?assetID=${assetID}`);
    request = requestCallData;
    if (requestCallData?.length > 0) {
        let rowItem = `<div class="text-center mb-2 d-none" id="divLoadMore">
            <button class="btn btn-info">Load More</button></div >`;
        $.each(requestCallData, function (key, row) {
            rowItem += isAdmin() ? clietResponseHTML(row) : adminResponseHTML(row)
        });
        $('#RenderContent #divChatBody').html(rowItem);
        //let id = request[request.length - 1].TenentRequestId;
        //let saveObj = {
        //    AssetName: assetID,
        //    Description: request[request.length - 1].Description,
        //    RequestDate: request[request.length - 1].RequestDate,
        //    Response: request[request.length - 1].Response,
        //    Status: 2
        //}
        //ManageAjaxCalls.Put(ApiDictionary.PutRequest() + '?id=' + id, JSON.stringify(saveObj), () => {
        //    console.log('status - 2')
        //});
    } else {
        $('#RenderContent #divChatBody').html("");
    }
}
const ReqResponse = (res) => {
    RequestCall();
    $('#RenderContent #txtRequestBody').val('')
}
const clietResponseHTML = (row) => {
    let userName = sessionStorage.getItem("UserName");
    return row.Response != "" ? `
                <div class="global-bg-primary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>${userName}</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>
                <div class="bg-secondary chatBubble float-left">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>Admin </div>
                    </div>
                    <label>${row.Response}</label>
                </div>`: `
                <div class="global-bg-primary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>${userName}</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>`;
}
const adminResponseHTML = (row) => {
    return row.Status != 0 && row.Response != "" ?
        `<div class="bg-secondary chatBubble float-left">
                   <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>
                <div class="global-bg-primary chatBubble float-right" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom"><div>Admin </div></div>
                    <label>${row.Response}</label>
                </div>`: `
                 <div class="bg-secondary chatBubble float-left" style="font-size: 14px;">
                    <div class="d-flex justify-content-between border-bottom">
                        <div>User</div>
                        <div>${getDateOnly(row.RequestDate)}</div>
                    </div>
                    <label>${row.Description}</label>
                </div>`;
}
async function getClientRequests() {
    let getRequestsData = await GetAjax(ApiDictionary.GetRequests() + `?AssetName=${sessionStorage.getItem('AssetID')}`);
    let RequestList = '';
    $('#btnAllRequest').prop('disabled', false);
    getRequestsData?.map(row => {
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
    let ReqNum = getRequestsData.filter(x => x.Status === 0).length;
    $('#listRequest').html(RequestList);
    $('#RequestCount').text(`You have ${ReqNum} Requests`);
    ReqNum != 0 ? $('#ReqQuantity').text(ReqNum).removeClass('d-none') : $('#ReqQuantity').addClass('d-none');
}
async function saveRequest() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    let description = $('#RenderContent #txtRequestBody').val();
    let assetID = sessionStorage.getItem('AssetID');
    let saveObj = {
        AssetName: assetID,
        Description: description,
        RequestDate: today,
        Response: '',
        Status: 0
    }
    let postRequestData = await PostAjax(ApiDictionary.PostRequest(), JSON.stringify(saveObj));
    ReqResponse(postRequestData);
    CustomeToast("Request", "Request Sent Successfully", "bg-success");
}


// DELETE Request TAX
async function RequestDelete(id) {
    let deleteProximityData = await DeleteAjax(ApiDictionary.DeleteRequest() + `?AssetName=${Number(id)}`);
    console.log('Deleted Successfully', deleteProximityData);
    CustomeToast("Request", "Request Deleted Successfully", "bg-danger");
    request = [];
    RequestCall();
}

// DELETE Confirmation Modal
function SetRequestDeleteModal() {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="RequestDelete()">Delete</button>`;
    $('#deleteModal .modal-title').text("Request");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}