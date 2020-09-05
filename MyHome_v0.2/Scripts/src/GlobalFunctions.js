const dateFormat = (date) => {
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