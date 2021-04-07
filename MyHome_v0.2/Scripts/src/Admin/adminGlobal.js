const RenderContent = $('#RenderContent');
const mainContent = $('.main-content');
var AssetList = [];
let welcomeToast = true;
sessionStorage.getItem('RoleID') == '0' ? $('#btnEmrcyContact').hide() : $('#btnEmrcyContact').show();

const callAssetModal = () => {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=utf-8",
        url: "/api/Asset/GetAsset",
        headers: { 'Authorization': "Bearer " + sessionStorage.getItem('accessToken') },
        dataType: "JSON",
        success: function (data) {
            AssetList = data;
            let url = window.rootpath + AdminURLs.selectAsset;
            $.get(url, function (response) {
                let AssetListHtml = '';
                RenderContent.append(response);
                customizeUI();
                $.each(AssetList, (key, value) => {
                    AssetListHtml += `
                    <div class="col" id=${key+1}>
                        <div class="card shadow">
                            <div class="card-body cursor-pointer global-bg-primary crdAssets" data-assetid=${value.AssetId} style="height:220px">
                                 <div class="h4 asset-title text-light font-weight-bold border-bottom"><i class="fa fa-home" aria-hidden="true"></i> ${value.AssetName}</div>
                                 <div class="h5 text-light font-weight-bold mt-4 mb-4">${value.RegusteredTo}</div>
                                 <div class="h6 text-light text-right font-weight-bold">${value.Address}</div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <button class="btn-outline-info"><i title="Modify" class="ml-1 fas fa-edit fontSize_20 p-2" onclick="AssetEdit(${value.AssetId})"></i></button>
                                    <button class="btn-outline-danger"><i title="Delete" class="fas fa-trash-alt fontSize_20 text-danger" onclick="deleteAsset(${value.AssetId})"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`
                });
                mainContent.find('#modSelectAsset #assetList').html(AssetListHtml);
                mainContent.find('#modSelectAsset').modal('show');
            });
        },
        error: (jqXHR) => {
            console.log('something went wrong with the POST...!!!');
        }
    });
    
    gotoAssetView();
}
const AssetEdit = (id) => {
    if (AssetList.length > 0) {

        var url = window.rootpath + AdminURLs.Asset;
        let TransactionsList = convertObjectArray(TransactionTypes);
        $.get(url, function (response) {
            RenderContent.html(response);
            let Asset = AssetList.filter(data => data.AssetId == id);
            $('#txtAssetName').text(Asset[0].AssetName);
            sessionStorage.setItem('AssetID', Asset[0].AssetId)
            $('#txtAssetName').val(Asset[0].AssetName);
            $('#txtRegDate').val(getDateOnly(Asset[0].RegisteredDate));
            $('#txtRegTo').val(Asset[0].RegusteredTo);
            $('#txtAssetAddress').val(Asset[0].Address);
            $('#txtRegTaxAmt').val(Asset[0].LandTaxAmount);
            $('#txtNumDoors').val(Asset[0].NumberofDoors);
            $('#txtNumWindows').val(Asset[0].NumberofWindows);
            $('#txtNumTaps').val(Asset[0].NumberofTaps);
            $('#txtNumFans').val(Asset[0].NumberofFans);
            $('#txtNumBulbs').val(Asset[0].NumberofBulbs);
            $("#ckbIsRent").attr('checked', Asset[0].IsRent == 1 ? true : false);
            $("#ckbIsSump").attr('checked', Asset[0].IsSump == 1 ? true : false);
            $('#txtAssetRegRemarks').val(Asset[0].Remarks);
        }); 
    }
    mainContent.find('#modSelectAsset').modal('hide');
}

function GotoSaveTransaction() {
    var url = window.rootpath + AdminURLs.SaveTransaction;
    let TransactionsList = convertObjectArray(TransactionTypes);
    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += TransactionsList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlTransactionType').html(options)
    });
}

function AssetDetails() {
    let id = sessionStorage.getItem('AssetID');
    let Asset = AssetList.filter(data => data.AssetId == id);
    console.log("AssetListAssetListAssetList", AssetList, Asset)

    sessionStorage.setItem('AssetID', Asset[0].AssetId)
    $('#lblAssetName, #lblAssetNamehdr').text(Asset[0].AssetName);
    $('#lblRegDate').text(getDateOnly(Asset[0].RegisteredDate));
    $('#lblRegTo').text(Asset[0].RegusteredTo);
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

$('div').on("click", '#RenderContent .crdAssets', function () {
    mainContent.find('#modSelectAsset').modal('hide');
    let id = $(this).attr("data-assetid");
    sessionStorage.setItem('AssetID', id);
    AssetDetails();
    getNotifications();
    getRequests();
    welcomeToast && CustomeToast("Welcome Back", sessionStorage.getItem('UserName'), "bg-danger");
    welcomeToast = false;
});

function getNotifications() {
    ManageAjaxCalls.GetData(ApiDictionary.GetNotification() + `?AssetName=${sessionStorage.getItem('AssetID')}`, (res) => {
        let NotificationList = '';
        NotificationRes = res;
        $('#btnAllNotifn').prop('disabled', false);
        let list = convertObjectArray(NotificationTypes);
        res.map(row => {
            if (row.Status == 0) {
                NotificationList += `
                    <div class="notifi__item">
                        <div class="bg-c3 img-cir img-40">
                            <label class="notifnLetter">${NotificationLetter[row.NotificationType]}</label>
                        </div>
                        <div class="content">
                             <p>${list[row.NotificationType].name}</p><span class="date">${row.NotificationDate}</span>
                        </div>
                    </div>`
            }
        });
        let notiNum = NotificationRes.filter(x => x.Status === 0).length;
        $('#listNotifications').html(NotificationList);
        $('#NotiCount').text(`You have ${notiNum} Notifications`);
        notiNum != 0 ? $('#Notiquantity').text(notiNum).removeClass('d-none') : $('#Notiquantity').addClass('d-none');

    });
}

function getRequests() {
    ManageAjaxCalls.GetData(ApiDictionary.GetRequest() + `?AssetName=${sessionStorage.getItem('AssetID')}`, (res) => {
        let RequestList = '';
        $('#btnAllRequest').prop('disabled', false);
        res.map(row => {
            if (sessionStorage.getItem('RoleID')==1 && row.Status == 0) {
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

const gotoAssetSave=() => {
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
    });
}

// goto Add Notifications
const GotoSaveNotifications = () => {
    let NotificationList = convertObjectArray(NotificationTypes);
    var url = window.rootpath + AdminURLs.SaveNotification;
    $.get(url, function (response) {
        RenderContent.html(response);
        let options = `<option value="0">--Select--</option>`;
        options += NotificationList.map(x => {
            return `<option value=${x.value}>${x.name}</option>`;
        });
        RenderContent.find('#ddlNotifications').html(options)
    });
}

const backToAssetView = () => {
    gotoAssetView();
    setTimeout(()=>AssetDetails(),500);
}