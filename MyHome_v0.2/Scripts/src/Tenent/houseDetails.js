function getHouseDetails() {
    const getHouseDetailsRes = (res) => {
        console.log("resresres", res)
        ["NumberofDoors", "NumberofWindows", "NumberofTaps", "NumberofFans", "NumberofBulbs"].map(item => {
            $('#lbl' + item).text(inWords(res[item]));
        });
        $('#lblAssetAddress').text(res['AssetAddress']);
        $('#ckbIsSump').prop('checked', res.IsSump == 1 ? true : false);
        $('#ckbIsRent').prop('checked', res.IsRent == 1 ? true : false);

    }
    $.isNumeric(sessionStorage.getItem('AssetID')) ?
        ManageAjaxCalls.Get(ApiDictionary.GetAssetById(), { AssetName: Number(sessionStorage.getItem('AssetID')) }, getHouseDetailsRes) :
        null;
}