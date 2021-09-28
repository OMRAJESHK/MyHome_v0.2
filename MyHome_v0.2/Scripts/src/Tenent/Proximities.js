let ProxisEdit = false;

const getProximities = () => {
    let assetID = sessionStorage.getItem('AssetID')
    ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetID}`, (res) => {
        if (isAdmin()) {
            if (res.constructor === Object) {
                mainContent.find('#btnEditProximities').show();
                mainContent.find('#btnAddAgreement').hide()
            } else {
                mainContent.find('#btnEditProximities').hide();
                mainContent.find('#btnAddAgreement').show()
            }
        } else {
            mainContent.find('#btnEditProximities').hide()
        }
        $('#lblRailwayStation').text(res["RailwayStation"].split("-")[0]);
        $('#lblBusStation').text(res["BusStation"].split("-")[0]);
        $('#lblAirport').text(res["Airport"].split("-")[0]);
        $('#lblMetroStation').text(res["MetroStation"].split("-")[0]);
        $('#lblSchoolorCollege').text(res["SchoolorCollege"].split("-")[0]);
        $('#lblHospital').text(res["Hospital"].split("-")[0]);
        $('#lblMarket').text(res["Market"].split("-")[0]);
        $('#lblTemple').text(res["Temple"].split("-")[0]);
        $('#lblHotel').text(res["Hotel"].split("-")[0]);

        $("#airportDistance").text(`  (${res["Airport"].split("-")[1]}KM)`);
        $("#RailwayStationDistance").text(`  (${res["RailwayStation"].split("-")[1]}KM)`);
        $("#BusStationDistance").text(`  (${res["BusStation"].split("-")[1]}KM)`);
        $("#MetroDistance").text(`  (${res["MetroStation"].split("-")[1]}KM)`);
        $("#SchoolCollegeDistance").text(`  (${res["SchoolorCollege"].split("-")[1]}KM)`);
        $("#HospitalDistance").text(`  (${res["Hospital"].split("-")[1]}KM)`);
        $("#MarketDistance").text(`  (${res["Market"].split("-")[1]}KM)`);
        $("#HotelDistance").text(`  (${res["Hotel"].split("-")[1]}KM)`);
        $("#TempleDistance").text(`  (${res["Temple"].split("-")[1]}KM)`);
     });  
}
const getValue = (field) => {
    return RenderContent.find(field).val();
}
function GotosaveProximities(isEdit) {
    var url = window.rootpath + AdminURLs.SaveProximity;
    ProxisEdit = isEdit;
    $.get(url, function (response) {
        RenderContent.html(response);
        let assetId = Number(sessionStorage.getItem('AssetID'));
        ["ddlAirportDistance", "ddlRailwayStationDistance", "ddlBusStationDistance",
            "ddlMetroStationDistance", "ddlSchoolCollegeDistance", "ddlHospitalDistance",
            "ddlMarketDistance", "ddlHotelDistance", "ddlTempleDistance"].map(itm => {
                generateOptions(convertObjectArray(Distance), itm);
            });
        ManageAjaxCalls.GetData(ApiDictionary.GetProximity() + `?AssetName=${assetId}`, (res) => {
            RenderContent.find('#txtRailwayStation').val(res["RailwayStation"].split("-")[0]);
            RenderContent.find('#txtBusStation').val(res["BusStation"].split("-")[0]);
            RenderContent.find('#txtAirport').val(res["Airport"].split("-")[0]);
            RenderContent.find('#txtMetroStation').val(res["MetroStation"].split("-")[0]);
            RenderContent.find('#txtSchoolorCollege').val(res["SchoolorCollege"].split("-")[0]);
            RenderContent.find('#txtHospital').val(res["Hospital"].split("-")[0]);
            RenderContent.find('#txtMarket').val(res["Market"].split("-")[0]);
            RenderContent.find('#txtTemple').val(res["Temple"].split("-")[0]);
            RenderContent.find('#txtHotel').val(res["Hotel"].split("-")[0]);
        });
    });
}

function saveProximity() {
    let airport = `${getValue('#txtAirport')}-${RenderContent.find("#ddlAirportDistance :selected").val()}`;
    let RailwayStation = `${getValue('#txtRailwayStation')}-${RenderContent.find("#ddlRailwayStationDistance :selected").val()}`;
    let BusStation = `${getValue('#txtBusStation')}-${RenderContent.find("#ddlBusStationDistance :selected").val()}`;
    let MetroStation = `${getValue('#txtMetroStation')}-${RenderContent.find("#ddlMetroStationDistance :selected").val()}`;
    let SchoolorCollege = `${getValue('#txtSchoolorCollege')}-${RenderContent.find("#ddlSchoolCollegeDistance :selected").val()}`;
    let Hospital = `${getValue('#txtHospital')}-${RenderContent.find("#ddlHospitalDistance :selected").val()}`;
    let Market = `${getValue('#txtMarket')}-${RenderContent.find("#ddlMarketDistance :selected").val()}`;
    let Temple = `${getValue('#txtTemple')}-${RenderContent.find("#ddlHotelDistance :selected").val()}`;
    let Hotel = `${getValue('#txtHotel')}-${RenderContent.find("#ddlTempleDistance :selected").val()}`;

    let ProximityToSave = JSON.stringify({
        AssetName: sessionStorage.getItem('AssetID'), RailwayStation: RailwayStation, BusStation: BusStation,
        Airport: airport, MetroStation: MetroStation, SchoolorCollege: SchoolorCollege, Hospital: Hospital,
        Market: Market, Temple: Temple, Hotel: Hotel,
    });
    let addetID = sessionStorage.getItem('AssetID');
    console.log(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave);
    ProxisEdit?
        ManageAjaxCalls.Put(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave, (res) => {
            CustomeToast("Proximity", 'Modified Successfully', "bg-info");
            console.log('Proximity Modified', res)
    }) : ManageAjaxCalls.Post(ApiDictionary.PostProximity(), ProximityToSave, (res) => {
        CustomeToast("Proximity", 'Saved Successfully', "bg-success");
        console.log("Proximity Saved", res)
    });
}

// DELETE Confirmation Modal
function SetProximityDeleteModal(id) {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="ProximityDelete(${id})">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE Proximity TAX
function ProximityDelete() {
    let id = sessionStorage.getItem("AssetID")
    ManageAjaxCalls.Delete(ApiDictionary.ProximityDelete() + '?id=' + id, (res) => {
        console.log('Deleted Successfully', res);
        CustomeToast("Tenant Agreement", "Proximity Deleted Successfully", "bg-danger");
    });
}