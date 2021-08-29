const path = "https://localhost:44395";
const Admin = 'Admin/';
const Client = 'tenent/';
class ApiDictionary  {
    static token = () => '/token'; 
    static gotoLogin = () => "UserAccount/UserLogin";
    static gotoAdminLogin = () => "UserAccount/Login";
    static gotoLogout = () => "Account/Logout";
    
    static gotoLandingPage = () => "UserAccount/index";
    static GetUserRole = () => path+"/api/account/GetUserRole";
    static GetTransactions = () => path + '/api/Transactions/GetTransaction';
    static PostTransaction = () => path + '/api/Transactions/PostTransaction';
    static PutTransaction = () => path + '/api/Transactions/PutTransaction';
    static DeleteTransaction = () => path + '/api/Transactions/DeleteTransaction';

    static GetClientMailId = () => path + '/api/TenentAgreement/GetClientMailId';
    static GetTenentAgreementByID = () => path + '/api/TenentAgreement/GetTenentAgreementByID';
    static PostTenentAgreement = () => path + '/api/TenentAgreement/PostTenentAgreement';
    static PutTenentAgreement = () => path + '/api/TenentAgreement/PutTenentAgreement';
    static DeleteTenentAgreement = () => path + '/api/TenentAgreement/DeleteTenentAgreement';
    static AssetPost = () => path + "/api/Asset/PostAssetDetails";
    static AssetPut = () => path + "/api/Asset/PutAsset";
    static DeleteAsset = () => path + "/api/Asset/DeleteAsset";
    static GetAssetName = () => path + '/api/Asset/GetAssetName';
    static GetProximity = () => path + '/api/Proximities/GetProximity';
    static PostProximity = () => path + '/api/Proximities/PostProximity';
    static PutProximity = () => path + '/api/Proximities/PutProximity';
    static GetRequest = () => path + '/api/Request/GetRequestsByID';
    static PostRequest = () => path + "/api/Request/PostRequest";
    static PutRequest = () => path + "/api/Request/PutRequest";
    static DeleteRequest = () => path + "/api/Request/DeleteRequest";
    
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
    static GetEmergencyContacts = () => path + "/api/Emergency/GetEmergencyContacts";
    static GetEmergencyContactsByAsset = () => path + "/api/Emergency/GetEmergencyContactsByAsset";
    static PostEmergency = () => path + "/api/Emergency/PostEmergency";
    static PutEmergency = () => path + "/api/Emergency/PutEmergency";
    static DeleteEmergency = () => path + "/api/Emergency/DeleteEmergency";
    static GetReminders = () => path + "/api/SetReminder/GetReminders";
    static GetRemindersByRole = () => path + "/api/SetReminder/GetRemindersByRole";
    static PostReminders = () => path + "/api/SetReminder/PostReminders";
    static PutReminders = () => path + "/api/SetReminder/PutReminders";
    static DeleteReminders = () => path + "/api/SetReminder/DeleteReminders";

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
    AssetView: Admin + "_AssetView",
    AssetslistView: Admin + '_AssetListView',
    SaveEmergancyContact: Admin +"_SaveEmergancyContact"
}

const TenantURLs = {
    Dashboard: Client + '_tenentDashboard',
    Transactions: Client + '_allTransactions',
    TenantDeedView: Client + '_TenantAgreementView',
    SetReminder: Client + "_SetReminder",
    AllNotification: Client +"_AllNotification"
}