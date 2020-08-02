const RenderContent = $('#RenderContent');
const mainContent = $('.main-content');
var AssetList = [];
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
                $.each(AssetList, (key, value) => {
                    AssetListHtml += `
                    <div class="col" id=${key}>
                        <div class="card">
                            <div class="card-body cursor-pointer bg-secondary" style="height:220px">
                                 <div class="h4 asset-title text-light font-weight-bold">${value.AssetName}</div>
                                 <div class="h5 text-light font-weight-bold">${value.RegusteredTo}</div>
                                 <div class="h6 text-light text-right font-weight-bold">${value.Address}</div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex justify-content-between">
                                      <button class="btn btn-primary" onclick="AssetSelected('${value.AssetName}');">Select</button>
                                      <button class="btn btn-info" onclick="AssetEdit(${value.AssetId})">Edit</button>
                                      <button class="btn btn-danger pull-right"onclick="deleteAsset(${value.AssetId})">Delete</button>
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
}
const AssetSelected = (AssetName) => {
    mainContent.find('#modSelectAsset').modal('hide');
    $('#lblAssetName').text(AssetName);
}
const AssetEdit = (id) => {
    if (AssetList.length > 0) {
        let Asset = AssetList.filter(data => data.AssetId == id);
        console.log('testtest', Asset[0].AssetId);
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
    }
    mainContent.find('#modSelectAsset').modal('hide');
}
// Function to Trauncate Time From Date
const getDateOnly = (date) => date.split("T")[0];