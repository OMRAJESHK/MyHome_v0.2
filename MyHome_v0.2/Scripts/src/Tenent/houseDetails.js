function getHouseDetails() {
    const getHouseDetailsRes = (res) => {
        ["NumberofDoors", "NumberofWindows", "NumberofTaps",
        "NumberofFans", "NumberofBulbs", "IsSump", "IsRent"].map(item => {
            $('#lbl' + item).text(inWords(res[item]));
        });
        $('#lblAddress').text(res['Address']);
        $('#ckbIsSump').prop('checked', res.IsSump == 1 ? true : false);
        $('#ckbIsRent').prop('checked', res.IsRent == 1 ? true : false);

    }
    $.isNumeric(sessionStorage.getItem('AssetID')) ?
        ManageAjaxCalls.Get(ApiDictionary.GetAssetName(), { AssetName: Number(sessionStorage.getItem('AssetID')) }, getHouseDetailsRes) :
        null;
}