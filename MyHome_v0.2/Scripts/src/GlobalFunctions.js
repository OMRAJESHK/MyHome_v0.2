﻿const dateFormat = (date) => {
    if (date != undefined) {
        let newDate = date.split("/");
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`
    }
    return 'N/A'
}
function getCurrentDate(){
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    return dateFormat(dd + '/' + mm + '/' + yyyy);
}
// Function to Trauncate Time From Date
const getDateOnly = (date) => date.split("T")[0];

var a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
var b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
}

function customizeUI() {
    if ($('#chktoggleSwitch').is(":checked")) {
        $('body').find('.global-bg-primary').addClass('darkmode').removeClass('global-bg-primary');
        $('body').find('.ckeckBoxStyle').addClass('ckeckBoxStyleDark').removeClass('ckeckBoxStyle');  //change checkbox color
        $('body').find('.global-text-primary').addClass('global-text-dark').removeClass('global-text-primary');

    } else {
        $('body').find('.darkmode').addClass('global-bg-primary').removeClass('darkmode');
        $('body').find('.ckeckBoxStyleDark').addClass('ckeckBoxStyle').removeClass('ckeckBoxStyleDark');   //change checkbox color
        $('body').find('.global-text-dark').addClass('global-text-primary').removeClass('global-text-dark');
    }
}