const TransactionTypes = {
  Rent: 1,
  'Water Bill': 2,
  'Electricity Bill': 3,
  'Motor Bill': 4,
  'Plumbing': 5,
  'Electric Households': 6,
  'Water Tanks': 7
};

const ModeOFPayment = {
    CASH: 1,
    ONLINE:2
};

const Status = {
    Paid: 1,
    Unpaid: 2
};

const NotificationTypes = {
    'Rent Paid': 1,
    'Rent Unpaid': 2,
    'Electricity Bill Paid': 3,
    'Electricity Bill Unpaid': 4,
    'Water Bill Paid':5,
    'Water Bill Unpaid':6,
    'Plumbing Households Paid':7,
    'Plumbing Households Unpaid': 8,
    'Electric Households Paid': 9,
    'Electric Households Unpaid': 10,
    'Festival Wishes': 11 ,
    'Miscellanious Unpaid': 12,
    'Miscellanious Paid': 13,
};

const NotificationLetter = {
    0:'R',
    1:"E",
    2:'W',
    3:"PH",
    4:"EH",
    5:"F",
    6:"M"
}

function convertObjectArray (object) {
    const result = [];
    var keys = Object.keys(object);
    var values = Object.values(object);
    for (let index = 0; index < keys.length; index++) {
        result.push({ name: keys[index], value: values[index] });
    }
    return result;
};