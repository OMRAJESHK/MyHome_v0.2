let ProxisEdit = false;

async function getProximities() {
    try {
        let assetID = sessionStorage.getItem('AssetID');
        let getProximityData = await GetAjax(ApiDictionary.GetProximity() + `?AssetName=${assetID}`);
        if (isAdmin()) {
            if (getProximityData.length == 0) {
                mainContent.find('#btnEditProximities').hide();
                mainContent.find('#btnAddProximities').show();
            } else if (getProximityData.length != 0) {
                mainContent.find('#btnEditProximities').show();
                mainContent.find('#btnAddProximities').hide()
            }
        } else {
            mainContent.find('#btnEditProximities,#btnAddProximities,#btnDeleteProximities').hide();
        }
        const checkFields = (val) => {
            if (val) return val && val[0] == "" ? "N/A" : `${val[0]} (${val[1] == 0 ? "Less than 1" : val[1]}KM)`;
        }
        if (getProximityData.length > 0) {
            globalProximity = getProximityData;
            console.log("globalProximity", globalProximity)
            $('#lblRailwayStation').text(checkFields(getProximityData[0]["RailwayStation"].split("-")));
            $('#lblBusStation').text(checkFields(getProximityData[0]["BusStation"].split("-")));
            $('#lblAirport').text(checkFields(getProximityData[0]["Airport"].split("-")));
            $('#lblMetroStation').text(checkFields(getProximityData[0]["MetroStation"].split("-")));
            $('#lblSchoolorCollege').text(checkFields(getProximityData[0]["SchoolorCollege"].split("-")));
            $('#lblHospital').text(checkFields(getProximityData[0]["Hospital"].split("-")));
            $('#lblMarket').text(checkFields(getProximityData[0]["Market"].split("-")));
            $('#lblTemple').text(checkFields(getProximityData[0]["Temple"].split("-")));
            $('#lblHotel').text(checkFields(getProximityData[0]["Hotel"].split("-")));
        } else {
            $('#lblRailwayStation,#lblBusStation,#lblAirport,#lblMetroStation,#lblSchoolorCollege,#lblHospital,#lblMarket,#lblTemple,#lblHotel').text("N/A");
            $("#airportDistance,#RailwayStationDistance,#BusStationDistance,#MetroDistance,#SchoolCollegeDistance,#HospitalDistance,#MarketDistance,#HotelDistance,#TempleDistance").text("");
        }

        setTimeout(() => { setScreenLoader(false); }, 500);
    } catch (err) {
        setScreenLoader(false);
        mainContent.find('#btnEditProximities').hide();
        mainContent.find('#btnAddProximities').hide();
        mainContent.find('#btnDeleteProximities').hide();
    }
}
const getValue = (field) => {
    return RenderContent.find(field).val();
}
 function GotosaveProximities(isEdit) {
    var url = window.rootpath + AdminURLs.SaveProximity;
    ProxisEdit = isEdit;
     $.get(url, async function (response) {
        RenderContent.html(response);
        let assetId = Number(sessionStorage.getItem('AssetID'));
        ["ddlAirportDistance", "ddlRailwayStationDistance", "ddlBusStationDistance",
            "ddlMetroStationDistance", "ddlSchoolCollegeDistance", "ddlHospitalDistance",
            "ddlMarketDistance", "ddlHotelDistance", "ddlTempleDistance"].map(itm => {
                console.log("convertObjectArray", convertObjectArray(Distance))
                generateOptions(convertObjectArray(Distance), itm);
            });
        generateOptions(convertObjectArray(Directions), "ddlMetroStationDirection");
        let getProximityData = await GetAjax(ApiDictionary.GetProximity() + `?AssetName=${assetId}`);

        console.log("resres", getProximityData)
        RenderContent.find('#txtRailwayStation').val(getProximityData[0]["RailwayStation"].split("-")[0]);
        RenderContent.find('#txtBusStation').val(getProximityData[0]["BusStation"].split("-")[0]);
        RenderContent.find('#txtAirport').val(getProximityData[0]["Airport"].split("-")[0]);
        RenderContent.find('#txtMetroStation').val(getProximityData[0]["MetroStation"].split("-")[0]);
        RenderContent.find('#txtSchoolorCollege').val(getProximityData[0]["SchoolorCollege"].split("-")[0]);
        RenderContent.find('#txtHospital').val(getProximityData[0]["Hospital"].split("-")[0]);
        RenderContent.find('#txtMarket').val(getProximityData[0]["Market"].split("-")[0]);
        RenderContent.find('#txtTemple').val(getProximityData[0]["Temple"].split("-")[0]);
        RenderContent.find('#txtHotel').val(getProximityData[0]["Hotel"].split("-")[0]);

        RenderContent.find("#ddlAirportDistance").val(getProximityData[0]["Airport"].split("-")[1]).change();
        RenderContent.find("#ddlRailwayStationDistance").val(getProximityData[0]["RailwayStation"].split("-")[1]).change();
        RenderContent.find("#ddlBusStationDistance").val(getProximityData[0]["BusStation"].split("-")[1]).change();
        RenderContent.find("#ddlMetroStationDistance").val(getProximityData[0]["MetroStation"].split("-")[1]).change();
        RenderContent.find("#ddlSchoolCollegeDistance").val(getProximityData[0]["SchoolorCollege"].split("-")[1]).change();
        RenderContent.find("#ddlHospitalDistance").val(getProximityData[0]["Hospital"].split("-")[1]).change();
        RenderContent.find("#ddlMarketDistance").val(getProximityData[0]["Market"].split("-")[1]).change();
        RenderContent.find("#ddlHotelDistance").val(getProximityData[0]["Hotel"].split("-")[1]).change();
        RenderContent.find("#ddlTempleDistance").val(getProximityData[0]["Temple"].split("-")[1]).change();
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
    ProxisEdit ?
        (async function () {
            let putProximityData = await PutAjax(ApiDictionary.PutProximity() + `?id=${addetID}`, ProximityToSave);
            CustomeToast("Proximity", "Proximity Saved Successfully", "bg-success");
            console.log("Proximity Saved", putProximityData)
        }())
        : (async function () {
            let postProximityData = await PostAjax(ApiDictionary.PostProximity(), ProximityToSave);
            CustomeToast("Proximity", 'Proximity Saved Successfully', "bg-success");
            console.log("Proximity Saved", postProximityData)
        }());
}

// DELETE Confirmation Modal
function SetProximityDeleteModal() {
    let deleteButtons = `<button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="ProximityDelete()">Delete</button>`;
    $('#deleteModal .modal-title').text("Asset");
    $('#deleteModal .modal-footer').html(deleteButtons);
    $('#deleteModal').modal('show');
}

// DELETE Proximity TAX
async function ProximityDelete() {
    let id = sessionStorage.getItem("AssetID")
    let deleteProximityData = await DeleteAjax(ApiDictionary.DeleteProximity() + `?AssetName=${Number(id)}`);
    console.log('Deleted Successfully', deleteProximityData);
    CustomeToast("Proximity", "Proximity Deleted Successfully", "bg-danger");
    $('#lblRailwayStation,#lblBusStation,#lblAirport,#lblMetroStation,#lblSchoolorCollege,#lblHospital,#lblMarket,#lblTemple,#lblHotel').text("N/A");
    $("#airportDistance,#RailwayStationDistance,#BusStationDistance,#MetroDistance,#SchoolCollegeDistance,#HospitalDistance,#MarketDistance,#HotelDistance,#TempleDistance").text("");
}