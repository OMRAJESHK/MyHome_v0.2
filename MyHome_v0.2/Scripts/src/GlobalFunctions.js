const dateFormat = (date) => {
    if (date) {
        let newDate =[]
        if (date.includes("/")) {
            newDate = date.split("/");
        } else if (date.includes("-")){
            newDate = date.split("-");
        }
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

function getDisplayDate(date) {
    if (date != undefined && date != null && date != "N/A") {
        date = String(date.slice(0, date.indexOf("T") ?? 9)).split("-");
        return `${date[2]}-${date[1]}-${date[0]}`;
    }
    return date;
}

// 
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


function convertObjectArray(object) {
    const result = [];
    var keys = Object.keys(object);
    var values = Object.values(object);
    for (let index = 0; index < keys.length; index++) {
        result.push({ name: keys[index], value: values[index] });
    }
    return result;
};


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

function CustomeToast(txthead, txtbody, cls) {
    let toastHTML = txthead.length > 0 ?
        `<div class="fade border w-25 ${cls}" data-delay="2000" id="tstNotifyUser" style="position: absolute; top:8rem; right:20px;">
                        <div class="toast-header"><strong class="mr-3" id="toastHeader">${txthead}</strong></div>
                        <div class="toast-body" id="toastBody"><div class="font-weight-bold">${txtbody}</div></div>
                    </div>`:
        `<div class="fade border w-25 ${cls}" data-delay="2000" id="tstNotifyUser" style="position: absolute; top:8rem; right:20px;">
                        <div class="toast-body" id="toastBody"><div class="font-weight-bold">${txtbody}</div></div>
                    </div>`;

    $("#forToast").html(toastHTML);
    $(document).find('#forToast #tstNotifyUser').toast('show');
    setTimeout(function () { $("#forToast").html(""); }, 5000)
}

const isAdmin = () => {
    return sessionStorage.getItem('RoleID') == 1;
}

// Toggle Fulscreen Logic

function toggleFullScreen() {
    let elem = document.body;
    // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

const generateOptions = (List,ddl) => {
    let options = `<option value="">None</option>`;
    options += List.map(x => {
        return `<option value=${x.value}>${x.name}</option>`;
    });
    RenderContent.find(ddl).html(options)
}

// REQUIRED TO RETURN FLOATING NUMBER WITH COMMA
function formatNumber(number) {
    if (number) {
        return number.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    return "";
}
