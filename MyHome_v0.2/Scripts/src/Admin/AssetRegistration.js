
let assetIsEdit = false;
let assetSelectedID = '';


// Wait for the DOM to be ready
$(function () {
    // Initialize form validation on the registration form.
    // It has the name attribute "registration"
    //$("form[name='frmAssetSave']").validate({
                
    //    // Specify validation rules
    //    rules: {
    //        // The key name on the left side is the name attribute
    //        // of an input field. Validation rules are defined
    //        // on the right side   
    //        astName: "required",
    //        astRegTo: "required",
    //        astRegDate: "required",
    //        astRegTaxAmt: "required",
    //        astNumDoors: "required",
    //        astNumWindows: "required",
    //        astNumTaps: "required",
    //        astNumBulbs: "required",
    //        astNumFans: "required",
    //    },
    //    // Specify validation error messages
    //    messages: {
    //        astName: "Please enter your Asset Name",
    //        astRegTo: "Please enter Registered to Name",
    //        astRegDate: "Please enter Date of Registration",
    //        astRegTaxAmt: "Please enter Tax Amount of Registration",
    //        astNumDoors: "Please enter number of Doors",
    //        astNumWindows: "Please enter number of Windows",
    //        astNumTaps: "Please enter number of Taps",
    //        astNumBulbs: "Please enter number of Bulbs",
    //        astNumFans: "Please enter number of Fans",
    //        //firstname: "Please enter your firstname",
    //        //lastname: "Please enter your lastname",
    //        //password: {
    //        //    required: "Please provide a password",
    //        //    minlength: "Your password must be at least 5 characters long"
    //        //},
    //        //email: "Please enter a valid email address"
    //    },
    //    // Make sure the form is submitted to the destination defined
    //    // in the "action" attribute of the form when valid
    //    submitHandler: function (form) {
    //        console.log("formdsf",form)
    //        form.submit();
    //        //alert("success")
    //    }
    //});
});

function btngotoSaveAsset() {
    sessionStorage.removeItem("AssetID");
    mainContent.find('#modSelectAsset').modal('hide');
    gotoAssetSave();
}

// Save and Edit Asset
const saveAsset = () => {
    let IsRent = $("#ckbIsRent").is(':checked') ? 1 : 0;
    let IsSump = $("#ckbIsSump").is(':checked') ? 1 : 0;
    let asset = {
        name: $('#txtAssetName').val(), regDate: $('#txtRegDate').val()
    }
    let assetToSave = JSON.stringify({
        AssetName: asset.name,
        RegisteredDate: asset.regDate,
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
    assetIsEdit ? (async function () {
        let AssetPutData = await PutAjax(ApiDictionary.AssetPut() + `?id=${addetID}`, assetToSave);
        assetPostResponse(AssetPutData);
    }()) :
        (async function () {
            let AssetPostData = await PostAjax(ApiDictionary.AssetPost(), assetToSave);
            assetPostResponse(AssetPostData);
        }());
    $('#lblAssetName, #lblAssetNamehdr').text(asset.name);
    assetIsEdit = false;
}
// Delete Asset 
async function deleteAsset (id){
    let deletePropertyTaxesData = await DeleteAjax(ApiDictionary.DeleteAsset() + `?id=${Number(id)}`);
    assetDeleteResponse(deletePropertyTaxesData)
}
// ASSET POST 
const assetPostResponse = (res) => {
    console.log(res);
    sessionStorage.setItem('AssetID', res.AssetId);
    CustomeToast("Asset Registration", "Asset Saved Successfully", "bg-success");
    clearTextBoxes();
}
// ASSET PUT 
const assetPutResponse = (res) => {
    console.log(res);
    CustomeToast("Asset Modify", "Asset Modified Successfully", "bg-warning")
}
const assetDeleteResponse = (res) => {
    console.log('delete', res);
    CustomeToast("Asset Modify", "Asset Deleted Successfully", "bg-danger");
    getAssetsList();
}
const clearTextBoxes = () => {
    $("#ckbIsRent, #ckbIsSump").prop('checked', false);
    $('.main-content').find('.form-control').val('');
    $('.main-content').find('input[type="file"]').val('')
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

const AssetEdit = (id) => {
    assetIsEdit = true;
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