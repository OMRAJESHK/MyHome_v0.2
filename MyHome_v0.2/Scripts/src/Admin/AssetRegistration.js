// Implemented ASSET REGISTRATION POST
$('.main-content').on('click', '#btnAssetRegistration', () => {
    $.ajax({
        type: "POST",
        contentType: "application/json;charset=utf-8",
        url: "/api/AdminData/PostAssetDetails",
        data: JSON.stringify({
            AssetName: $('#txtAssetName').val(),
            RegisteredDate: $('#txtRegDate').val(),
            Address: $('#txtAssetAddress').val(),
            LandTaxAmount: Number($('#txtRegTaxAmt').val()),
            NumberofDoors: Number($('#txtNumDoors').val()),
            NumberofWindows: Number($('#txtNumWindows').val()),
            NumberofTaps: Number($('#txtNumTaps').val()),
            NumberofFans: Number($('#txtNumFans').val()),
            NumberofBulbs: Number($('#txtNumBulbs').val()),
            IsSump: 1,
            Remarks: $('#txtAssetRegRemarks').val()
        }),
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem('accessToken')
        },
        dataType: "JSON",
        success: function (data) {
            console.log(data);
        },
        error: (jqXHR) => {
            console.log('something went wrong with the POST...!!!');
        }
    });
});
id = ""   