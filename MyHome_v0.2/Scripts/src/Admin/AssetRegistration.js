function btngotoSaveAsset() {
    sessionStorage.removeItem("AssetID");
    mainContent.find('#modSelectAsset').modal('hide');
    gotoAssetSave()
}

// Save and Edit Asset
const saveAsset = () => {
    let IsRent = $("#ckbIsRent").is(':checked') ? 1 : 0;
    let IsSump = $("#ckbIsSump").is(':checked') ? 1 : 0;
    let assetToSave = JSON.stringify({
        AssetName: $('#txtAssetName').val(),
        RegisteredDate: $('#txtRegDate').val(),
        RegusteredTo: $('#txtRegTo').val(),
        Address: $('#txtAssetAddress').val(),
        LandTaxAmount: Number($('#txtRegTaxAmt').val()),
        NumberofDoors: Number($('#txtNumDoors').val()),
        NumberofWindows: Number($('#txtNumWindows').val()),
        NumberofTaps: Number($('#txtNumTaps').val()),
        NumberofFans: Number($('#txtNumFans').val()),
        NumberofBulbs: Number($('#txtNumBulbs').val()),
        IsSump: IsSump,
        IsRent: IsRent,
        Remarks: $('#txtAssetRegRemarks').val()
    });
    let addetID = sessionStorage.getItem('AssetID');
    addetID == null ? ManageAjaxCalls.Post(ApiDictionary.AssetPost(), assetToSave, assetPostResponse) :
        ManageAjaxCalls.Put(ApiDictionary.AssetPut() + `?id=${addetID}`, assetToSave, assetPutResponse);
    
}
// Delete Asset 
const deleteAsset = (id) => {
    ManageAjaxCalls.Delete(ApiDictionary.DeleteAsset() + `?id=${Number(id)}`, assetDeleteResponse);
}
// ASSET POST 
const assetPostResponse = (res) => {
    console.log(res);
    sessionStorage.setItem('AssetID', res.AssetId)
    CustomeToast("Asset Registration", "Asset Saved Successfully", "bg-success");
    clearTextBoxes();
}
// ASSET PUT 
const assetPutResponse = (res) => {
    console.log(res);
    CustomeToast("Asset Modify", "Asset Modified Successfully", "bg-info")
}
const assetDeleteResponse = (res) => {
    console.log('delete',res);
}
const clearTextBoxes = () => {
    $("#ckbIsRent, #ckbIsSump").prop('checked', false);
    $('.main-content').find('.form-control').val('');
}
const getTransactionList = () => {
    let TransactionsList = convertObjectArray(TransactionTypes);
    var optionList = '';
    TransactionsList.map((list, index) => {
        if (list.value != 0) {
            optionList += `<option id=${index+1} value=${list.value}>${list.name}</option>`
        }
    });
    return optionList;
}


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
                    <div class="col" id=${key + 1}>
                        <div class="card shadow max-width-26 min-width-15">
                            <div class="card-body cursor-pointer global-text-primary crdAssets" data-assetid=${value.AssetId} style="height:220px;position: relative;">
                                        
                                 <div class="h5 asset-title font-weight-bold border-bottom"><i class="fa fa-home" aria-hidden="true"></i> ${value.AssetName}</div>
                                 <div class="mb-1" style="text-align: right;">
                                   <i class="far fa-comment"></i><span class="quantity" id="">${key + 1}</span>
                                   <i class="far fa-bell"></i><span class="quantity" id="">${key +3}</span>
                                 </div>
                                 <div class="h5 font-weight-bold my-4">${value.RegusteredTo}<span class="primary-font" style="float:right;">${getDisplayDate(value.RegisteredDate)}</span></div>
                                 <div class="h6 text-right font-weight-bold bottom pr-1">${value.Address}</div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-info"><i title="Modify Asset" class="ml-1 fas fa-edit fontSize_20 p-2" onclick="AssetEdit(${value.AssetId})"></i></button>
                                    <button class="btn btn-danger">
                                       <i title="Delete Asset" class="fas fa-trash-alt fontSize_20 p-2" data-toggle="modal" data-target="#exampleModalLong"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>`
                });
                //onclick="deleteAsset(${value.AssetId})"
                mainContent.find('#modSelectAsset #assetList').html(AssetListHtml);
                mainContent.find('#modSelectAsset').modal('show');
            });
        },
        error: (jqXHR) => {
            console.error('Something went wrong with the POST...!!!');
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
            RenderContent.find("#txtRegDate").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
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