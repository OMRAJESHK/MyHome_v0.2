const path = sessionStorage.getItem('path');
const Admin = 'Admin/';
const Client = 'tenent/';
class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static gotoAdminLogin = () => "UserAccount/Login";
    static GetUserRole = () => path+"/api/account/GetUserRole";
    static GetTransactions = () => sessionStorage.getItem('path') + '/api/Transactions/GetTransaction';
    static PostTransaction = () => sessionStorage.getItem('path') + '/api/Transactions/PostTransaction';
    static GetTenantAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/GetTenentAgreement';
    static GetTenentAgreementByID = () => path + '/api/TenentAgreement/GetTenentAgreementByID';
    static PutTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/PutTenentAgreement';
    static DeleteTenentAgreement = () => sessionStorage.getItem('path') + '/api/TenentAgreement/DeleteTenentAgreement';
    static AssetPost = () => sessionStorage.getItem('path') + "/api/Asset/PostAssetDetails";
    static AssetPut = () => sessionStorage.getItem('path') + "/api/Asset/PutAsset";
    static DeleteAsset = () => sessionStorage.getItem('path') + "/api/Asset/DeleteAsset";
    static GetAssetName = () => sessionStorage.getItem('path') + '/api/Asset/GetAssetName';
    static GetProximity = () => sessionStorage.getItem('path') + '/api/Proximities/GetProximity';
    static PostProximity = () => sessionStorage.getItem('path') + '/api/Proximities/PostProximity';
    static PutProximity = () => sessionStorage.getItem('path') + '/api/Proximities/PutProximity';
    static GetRequest = () => sessionStorage.getItem('path') + '/api/Request/GetRequestsByID';
    static PostRequest = () => sessionStorage.getItem('path') + "/api/Request/PostRequest";
    static PutRequest = () => path + "/api/Request/PutRequest";

    static GetNotification = () => path + "/api/Notifications/GetNotification";
    static PostNotification = () => path + "/api/Notifications/PostNotification";
    static PutNotification = () => path + "/api/Notifications/PutNotification";
    static DeleteNotification = () => path + "/api/Notifications/DeleteNotification";
    static DeleteImg = () => path + "/SendMail/DeleteImg";
    static Sendmail = () => path + "/SendMail/Sendmail";
    static GetMailLogs = () => path + "/api/MailLogs/GetMailLogs";
    static PostMailLogs = () => path + "/api/MailLogs/PostMailLogs";
    static PutMailLogs = () => path + "/api/MailLogs/PutMailLogs";
    static DeleteMailLogs = () => path + "/api/MailLogs/DeleteMailLogs";
    static GetPropertyTaxes = () => path + "/api/PropertyTax/GetPropertyTaxes";
    static PostPropertyTaxes = () => path + "/api/PropertyTax/PostPropertyTaxes";
    static PutPropertyTaxes = () => path + "/api/PropertyTax/PutPropertyTaxes";
    static DeletePropertyTaxes = () => path + "/api/PropertyTax/DeletePropertyTaxes";

}

const AdminURLs = {
    Dashboard:Admin + '_AdminDashboard',
    Asset: Admin + '_AssetRegistration',
    TenantDeed: Admin + '_TenantDeedRegistration',
    SaveTransaction: Admin + '_SaveTransactions',
    SaveProximity: Admin + '_SaveProximities',
    SaveNotification: Admin + '_SaveNotifications',
    selectAsset: Admin + '_SelectAsset',
    MailLogs: Admin + '_MailLogs',
    SendMail: Admin + '_Sendmail',
    propertyTaxLogs: Admin + '_propertyTaxLogs',
    SavePropertyTax: Admin + '_SavePropertyTax',
    AssetView: Admin + "_AssetView"
}

const TenantURLs = {
    Dashboard: Client + '_tenentDashboard',
    Transactions: Client + '_allTransactions',
    TenantDeedView: Client + '_TenantAgreementView',

}