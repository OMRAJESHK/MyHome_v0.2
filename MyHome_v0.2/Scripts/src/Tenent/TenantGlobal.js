
//function GetAssetById(res) {
//    sessionStorage.setItem('AssetName', res.AssetName);
//    $("#lblAssetName").text(sessionStorage.getItem('AssetName'))
//    sessionStorage.setItem('AssetID', res.AssetId);
//}
var date = new Date();
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = date.getFullYear();

function getRaiseReqHTML(){
    var url = window.rootpath + "Tenent/_raiseRequest";
    $('#ReqQuantity').hide();
    $.get(url, function (response) {
        RenderContent.html(response);
        customizeUI();
        RequestCall();
    });
}

function createGraph (){
    var ctx = document.getElementById("elecBill").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: 'Electricity Bill', // Name the series
                data: [334, 145, 567, 678, 440], // Specify the data values array
                fill: false,
                borderColor: '#38ef7d', // Add custom color border (Line)
                backgroundColor: '#11998e', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            }]
        },
        options: {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        }
    });

    var ctx = document.getElementById("waterMotorBill").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May"],
            datasets: [{
                label: 'Motor Bill', // Name the series
                data: [234, 645, 667, 478, 940], // Specify the data values array
                fill: false,
                borderColor: '#007bff', // Add custom color border (Line)
                backgroundColor: '#11998e', // Add custom color background (Points and Fill)
                borderWidth: 1 // Specify bar border width
            }]
        },
        options: {
            responsive: true, // Instruct chart js to respond nicely.
            maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
        }
    });


    // DoughNut Chart

    //var colors = [
    //    'rgb(70, 191, 189)',
    //    'rgb(252, 180, 92)',
    //    'rgb(247, 70, 74)',
    //    'rgb(148, 159, 177)',
    //    'rgb(51, 143, 82)',
    //    'rgb(77, 83, 96)',
    //    'rgb(180, 142, 173)',
    //    'rgb(150, 181, 180)',
    //    'rgb(235, 203, 138)',
    //    /*'rgb(94, 65, 149)',
    //    'rgb(171, 121, 103)',
    //    'rgb(134, 175, 18)'*/
    //];
    //var labels = ["label 1", "label 2", "label 3", "label 4", "label 5", "label 6", "label 7", "label 8", "label 9"];
    //var data = [794, 458, 169, 103, 85, 75, 44, 33, 22];
    //var bgColor = colors;
    //var dataChart = {
    //    labels: labels,
    //    datasets: [{
    //        data: data,
    //        backgroundColor: bgColor
    //    }]
    //};
    //var config = {
    //    type: 'doughnut',
    //    data: dataChart,
    //    options: {
    //        maintainAspectRatio: false,
    //        cutoutPercentage: 45,
    //        legend: {
    //            display: false
    //        },
    //        legendCallback: function (chart) {
    //            var text = [];
    //            text.push('<ul class="doughnut-legend">');
    //            if (chart.data.datasets.length) {
    //                for (var i = 0; i < chart.data.datasets[0].data.length; ++i) {
    //                    text.push('<li><span class="doughnut-legend-icon" style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '"></span>');
    //                    if (chart.data.labels[i]) {
    //                        text.push('<span class="doughnut-legend-text">' + chart.data.labels[i] + '</span>');
    //                    }
    //                    text.push('</li>');
    //                }
    //            }
    //            text.push('</ul>');
    //            return text.join("");
    //        },
    //        tooltips: {
    //            yPadding: 10,
    //            callbacks: {
    //                label: function (tooltipItem, data) {
    //                    var total = 0;
    //                    data.datasets[tooltipItem.datasetIndex].data.forEach(function (element /*, index, array*/) {
    //                        total += element;
    //                    });
    //                    var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
    //                    var percentTxt = Math.round(value / total * 100);
    //                    return data.labels[tooltipItem.index] + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + ' (' + percentTxt + '%)';
    //                }
    //            }
    //        }
    //    }
    //};
    //var ctx = document.getElementById("doughnutChart").getContext("2d");
    //var doughnutChart = new Chart(ctx, config);

    //var legend = doughnutChart.generateLegend();
    //var legendHolder = document.getElementById("legend");
    //legendHolder.innerHTML = legend + '<div style="font-size: smaller">Total : <strong>' + 1703 + '</strong></div>';
}

const getDashboardData = () => {
    let assetID = sessionStorage.getItem('AssetID');

    let first = new Date(date.getFullYear(), date.getMonth(), 1);
    let last = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let firstDay = String(first.getDate()).padStart(2, '0');
    let lastDay = String(last.getDate()).padStart(2, '0');

    trnFrom = dateFormat(firstDay + '/' + mm + '/' + yyyy);
    trnTo = dateFormat(lastDay + '/' + mm + '/' + yyyy);

    let assetId = sessionStorage.getItem("AssetID");
    $.when(
        GetAjax(ApiDictionary.GetTransactions(), { AssetName: assetID, trnFrom: trnFrom, trnTo: trnTo }),
        GetAjax(ApiDictionary.GetTenentAgreementByID() + `?AssetName=${assetId}`),
    ).done(function (trnData, tenentData) {
        if (trnData[0] && trnData[0].length > 0) {
            console.log("trnData", trnData[0])
            // Rent Description
            let rentData = trnData[0].filter(row => row.TransactionType == 2);
            let desc = `${Months[Number(mm)]} Month - Rent of Rs. ${formatNumber(rentData?.[0]?.["Amount"]) ?? "0.00"}/-`
            $("#rentDescription").text(desc);
            let rentHeader = `<span class="px-2 font-weight-bold ${rentData?.[0]?.["Status"] == 1 ? "text-success" : "text-danger"} fontSize_16" id="ckbTenantIsRent"
                                     style="border-radius: 15px; border: 1px solid; background: #fff;">
                                     ${rentData?.[0]?.["Status"] == 1 ? `Paid &#10003;` : `Not Paid &#128473;`}
                                </span>`;
            $("#rentHeader").append(rentHeader);

            // Water Description
            let waterData = trnData[0].filter(row => row.TransactionType == 3);
            desc = `${Months[Number(mm)]} Month - Water Bill of Rs. ${formatNumber(waterData?.[0]?.["Amount"]) ?? "0.00"}/-`;
            $("#waterDescription").text(desc);
            let WaterHeader = `<span class="px-2 font-weight-bold ${waterData?.[0]?.["Status"] == 1 ? "text-success" : "text-danger"} fontSize_16" id="ckbTenantIsRent"
                                     style="border-radius: 15px; border: 1px solid; background: #fff;">
                                     ${waterData?.[0]?.["Status"] == 1 ? `Paid &#10003;` : `Not Paid &#128473;`}
                                </span>`;
            $("#WaterHeader").append(WaterHeader);

            // Electricity Description
            let elecData = trnData[0].filter(row => row.TransactionType == 4);
            desc = `${Months[Number(mm)]} Month - Electricity Bill of Rs. ${formatNumber(elecData)?.[0]?.["Amount"] ?? "0.00"}/-`;
            $("#electricityDescription").text(desc);
            let ElecHeader = `<span class="px-2 font-weight-bold ${elecData?.[0]?.["Status"] == 1 ? "text-success" : "text-danger"} fontSize_16" id="ckbTenantIsRent"
                                     style="border-radius: 15px; border: 1px solid; background: #fff;">
                                     ${elecData?.[0]?.["Status"] == 1 ? `Paid &#10003;` : `Not Paid &#128473;`}
                                </span>`;
            $("#ElecHeader").append(ElecHeader);

            // Motor Description
            let motorData = trnData[0].filter(row => row.TransactionType == 5);
            desc = `${Months[Number(mm)]} Month - Motor Bill of Rs. ${formatNumber(motorData)?.[0]?.["Amount"] ?? "0.00"}/-`;
            $("#MotorDescription").text(desc);
            let MotorHeader = `<span class="px-2 font-weight-bold ${motorData?.[0]?.["Status"] == 1 ? "text-success" : "text-danger"} fontSize_16" id="ckbTenantIsRent"
                                     style="border-radius: 15px; border: 1px solid; background: #fff;">
                                     ${motorData?.[0]?.["Status"] == 1 ? `Paid &#10003;` : `Not Paid &#128473;`}
                                </span>`;
            $("#MotorHeader").append(MotorHeader);
        }
        if (tenentData[0] && ["success"].includes(tenentData[1])) {
            globalTenantAgreement = tenentData[0];
            $(".duedateMonthly").text(tenentData[0]["RentDueDate"]);

            $(".monthlyRent").text(`Rs.  ${tenentData[0]["RentAmount"]} /-`);
            $("#TenantName").text(`${tenentData[0]["ResidentsNames"]}`);
            let joinDate = dateFormat(getDateOnly(tenentData[0]["JoiningDate"]));
            $("#joinDate").text(joinDate);

            let yrsSpent = joinDate.split("-")[2] - dateFormat(getCurrentDate()).split("-")[2];
            let monthsSpent = Math.abs(joinDate.split("-")[1] - dateFormat(getCurrentDate()).split("-")[1]);
            console.log("dfgbdhgfsjfkhgkfksjkdfhgdg", dateFormat(getCurrentDate()), joinDate, yrsSpent, monthsSpent)
            $("#spentYr").text(yrsSpent);
            $("#spentMonth").text(monthsSpent);
            $("#AdvAmt").text(`Rs. ${tenentData[0]["AdvanceAmount"]} /-`);
            

        }
        console.log("tenentData", tenentData)
        setTimeout(() => { setScreenLoader(false); }, 500);
    });


}