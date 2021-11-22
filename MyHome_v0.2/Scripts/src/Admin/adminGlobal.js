const RenderContent = $('#RenderContent');
const mainContent = $('.main-content');
var AssetList = [];
isAdmin() ? $('#btnEmrcyContact').show() : $('#btnEmrcyContact').hide();

const getAssetsList = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/api/Asset/GetAsset",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        dataType: "JSON",
        success: function (data) {
            AssetList = data;
            let url = window.rootpath + AdminURLs.AssetslistView;
            $.get(url, function (response) {
                let AssetListHtml = '';
                RenderContent.html(response);
                customizeUI();
                $.each(AssetList, (key, value) => {
                    AssetListHtml += `
                    <div style="flex:1;width:20rem" id=${key + 1} onclick="handleCardClick(${value.AssetId})">
                        <div class="card assetCards">
                            <div class="card-body cursor-pointer crdAssets" data-assetid=${value.AssetId} >
                                 <div class="h6 global-text-primary  asset-title font-weight-bold border-bottom"><i class="fa fa-home fontSize_50" aria-hidden="true"></i> ${value.AssetName}</div>
                                 <div style="height:10rem;position: relative;">
                                    <div class="h5 font-weight-bold my-5">${value.RegusteredTo}<span class="primary-font" style="float:right;">${getDisplayDate(value.RegisteredDate)}</span></div>
                                    <div class="fontSize_15 text-right pr-1">${value.Address}</div>
                                 </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-info" onclick="AssetEdit(${value.AssetId})"><i title="Modify Asset" class="ml-1 fas fa-edit fontSize_20 p-2"></i></button>
                                    <button class="btn btn-danger" onclick="SetAssetDeleteModal(${value.AssetId})">
                                       <i title="Delete Asset" class="fas fa-trash-alt fontSize_20 p-2" data-toggle="modal" data-target="#exampleModalLong"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
                });
                mainContent.find('#AssetsList').html(AssetListHtml);
                setTimeout(() => {
                    setScreenLoader(false);
                }, 900);
            })
        },
        error: (jqXHR) => {
            console.error('Something went wrong with the POST...!!!');
        }
    });
}

// DELETE Confirmation Modal
function SetAssetDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="deleteAsset(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

function AssetDetails() {
    let id = sessionStorage.getItem('AssetID');
    let Asset = AssetList.filter(data => data.AssetId == id);
    console.log("AssetListAssetListAssetList", AssetList, Asset)
    $('#lblAssetName, #lblAssetNamehdr').text(Asset[0].AssetName);
    CustomeToast("Welcome To", Asset[0].AssetName, "bg-primary");
    $('#lblRegDate').text(getDateOnly(Asset[0].RegisteredDate));
    $('#lblRegTo').text(Asset[0].RegusteredTo);
    glodalSelectedAssetName = Asset[0].AssetName;
    $('#lblAssetAddress').text(Asset[0].Address);
    $('#lblRegTaxAmt').text(Asset[0].LandTaxAmount);
    $('#lblNumDoors').text(inWords(Asset[0].NumberofDoors));
    $('#lblNumWindows').text(inWords(Asset[0].NumberofWindows));
    $('#lblNumTaps').text(inWords(Asset[0].NumberofTaps));
    $('#lblNumFans').text(inWords(Asset[0].NumberofFans));
    $('#lblNumBulbs').text(inWords(Asset[0].NumberofBulbs));
    $("#ckbIsRent").attr('checked', Asset[0].IsRent == 1 ? true : false);
    $("#ckbIsSump").attr('checked', Asset[0].IsSump == 1 ? true : false);
    $('#lblAssetRegRemarks').text(Asset[0].Remarks);
}

function handleCardClick(id) {
    $(".menuCover").remove();
    mainContent.find('#modSelectAsset').modal('hide');
    sessionStorage.setItem('AssetID', id);
    AssetDetails();
    getNotifications();
    getRequests();
    let name = AssetList.filter(data => data.AssetId == id)[0].AssetName;
    AdminDashboardFunction(id);
}

async function getNotifications() {
    let notificationData = await GetAjax(ApiDictionary.GetNotification() + `?AssetName=${sessionStorage.getItem('AssetID')}`);
    let NotificationList = '';
    NotificationRes = notificationData;
    $('#btnAllNotifn').prop('disabled', false);
    let list = convertObjectArray(NotificationTypes);
    notificationData.map(row => {
        if (row.Status == 0) {
            let date = dateFormat(getDateOnly(row.NotificationDate));
            NotificationList += `
                    <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                            <label class="notifnLetter">${NotificationLetter[row.NotificationType]}</label>
                        </div>
                        <div class="content">
                             <p>${list[row.NotificationType].name}</p><span class="date">${date}</span>
                        </div>
                    </div>`
        }
    });
    let notiNum = NotificationRes.filter(x => x.Status === 0).length;
    $('#listNotifications').html(NotificationList);
    $('#NotiCount').text(`You have ${notiNum} Notifications`);
    notiNum != 0 ? $('#Notiquantity').text(notiNum).removeClass('d-none') : $('#Notiquantity').addClass('d-none');
}

async function getRequests() {
    let getRequestsData = await GetAjax(ApiDictionary.GetRequestsByID() + `?AssetID=${sessionStorage.getItem('AssetID')}`);
    let RequestList = '';
    $('#btnAllRequest').prop('disabled', false);
    getRequestsData.map(row => {
        if (isAdmin() && row.Status == 0) {
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

const gotoAssetSave = () => {
    var url = window.rootpath + AdminURLs.Asset;
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#txtRegDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
    });
}

const gotoAssetView = () => {
    var url = window.rootpath + AdminURLs.AssetView;
    $.get(url, function (response) {
        RenderContent.html(response);
        RenderContent.find("#txtRegDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
        AssetDetails();
    });
}

// goto Add Notifications
const GotoSaveNotifications = () => {
    let NotificationList = convertObjectArray(NotificationTypes);
    var url = window.rootpath + AdminURLs.SaveNotification;
    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="">None</option>`;
        options += NotificationList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlNotifications').html(options)
    });
}

const backToAssetView = () => {
    gotoAssetView();
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/api/Asset/GetAsset",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        dataType: "JSON",
        success: function (data) {
            AssetList = data;
           // AssetDetails()
        }
    });
}

