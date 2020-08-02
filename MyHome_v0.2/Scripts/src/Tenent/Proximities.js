const getProximities = (assetId) => {
    const getProximitiesRes = (res) => {
        ["RailwayStation", "BusStation", "Airport", "MetroStation",
            "SchoolorCollege", "Hospital", "Market", "Temple", "Hotel"].map(item => {
                $('#lbl' + item).text(res[item]);
            });
    }
    ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetId}`, getProximitiesRes);  
}
