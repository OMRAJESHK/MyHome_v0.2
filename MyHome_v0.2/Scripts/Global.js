$(document).ready(() => {
    $('.UserName').text(sessionStorage.getItem('UserName'));
    $('.UserMail').text(sessionStorage.getItem('UserMail'));
    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = window.rootpath + ApiDictionary.gotoLogin();
    }
    if (sessionStorage.getItem('RoleID') == '0') {
        $('.AdminMenu').hide();
        $('.ClientMenu').show();
    } else {
        $('.ClientMenu').hide();
        $('.AdminMenu').show();
        $('.main-content').find('#btnAddNotifications').show();
    }
    //------TENANT BUTTONS-----------//
    $(".btnTenentDetails").click(() => {
        $('.dashboardAngle').hasClass('angleRotate180') ?
            $('.dashboardAngle').removeClass('angleRotate180')
            : $('.dashboardAngle').addClass('angleRotate180')
    });

    $(".btnAllTransactions").click(() => {
        var url = window.rootpath + "Tenent/_allTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            $('#RenderContent').find("#trnFrom , #trnTo").datepicker({ dateFormat: 'dd/mm/yy', changeMonth: true, changeYear: true });
            transactionCall();
        });
    });
    $(".btn_T_Dashboad").click(() => {
        var url = window.rootpath + "Tenent/_tenentDashboard";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            var ctx = document.getElementById("elecBill").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
                    datasets: [{
                        label: 'Electricity Bill', // Name the series
                        data: [334, 145, 567, 678,440], // Specify the data values array
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


            var ctx = document.getElementById("doughnutChart").getContext('2d');

            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ["Electricity", "Water", "Motor", "Othres"],
                    datasets: [{
                        data: [758, 450, 244, 400], // Specify the data values array

                        borderColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'], // Add custom color border 
                        backgroundColor: ['#2196f38c', '#f443368c', '#3f51b570', '#00968896'], // Add custom color background (Points and Fill)
                        borderWidth: 1 // Specify bar border width
                    }]
                },
                options: {
                    responsive: true, // Instruct chart js to respond nicely.
                    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
                }
            });

        });
    });
    $(".btnRentAgreement").click(() => {
        var url = window.rootpath + "Tenent/_tenentDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnDocuments").click(() => {
        var url = window.rootpath + "Tenent/_TenentDocuments";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnHouseDetails").click(() => {
        var url = window.rootpath + "Tenent/_houseDetails";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnEmcyContact").click(() => {
        var url = window.rootpath + "Tenent/_emrcyContact";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnProximity , .btn_A_Proximity").click(() => {
        var url = window.rootpath + "Tenent/_proximity";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            (sessionStorage.getItem('RoleID') == '0') ?
                $('.main-content').find('#btnAddProximities').hide() :
                $('.main-content').find('#btnAddProximities').show();
        });
    });
    $(".btnRaiseReq").click(() => {
        var url = window.rootpath + "Tenent/_raiseRequest";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });

    $(".btn_A_Notifications,#btn_AllNotifications").click(() => {
        var url = window.rootpath + "Tenent/_AllNotification";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
            $('#notificationsTab').removeClass('show-dropdown');
            (sessionStorage.getItem('RoleID') == '0') ?
                $('.main-content').find('#btnAddNotifications').hide() :
                $('.main-content').find('#btnAddNotifications').show();
        });
    });
        //------ADMIN BUTTONS-----------//
    $(".btn_A_Dashboad").click(() => {
        var url = window.rootpath + "Admin/_AdminDashboard";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnAssetRegistration").click(() => {
        var url = window.rootpath + "Admin/_AssetRegistration";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnTenantAgreement").click(() => {
        var url = window.rootpath + "Admin/_TenantDeedRegistration";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btn_A_AllTransactions").click(() => {
        var url = window.rootpath + "Admin/_SaveTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btnAddProximity").click(() => {
        var url = window.rootpath + "Admin/_SaveTransactions";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".main-content").on('click', '#btnAddNotifications', () => {
        var url = window.rootpath + "Admin/_SaveNotifications";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".main-content").on('click', '#btnAddNotifications', () => {
        var url = window.rootpath + "Admin/_SaveNotifications";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    $(".btn_A_SendMail").click(() => {
        var url = window.rootpath + "Admin/_Sendmail";
        $.get(url, function (response) {
            $('#RenderContent').html(response);
        });
    });
    
    
        //------COMMON BUTTONS----------//

    $('#btnLogOut').click(() => {
        sessionStorage.removeItem('accessToken')
        window.location.href = window.rootpath + ApiDictionary.gotoLogin();
    });
});