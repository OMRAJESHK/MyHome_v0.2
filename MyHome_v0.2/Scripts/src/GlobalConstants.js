const TransactionTypes = {
  Advance: 1,
  Rent: 2,
  'Water Bill': 3,
  'Electricity Bill': 4,
  'Motor Bill': 5,
  'Plumbing': 6,
  'Electric Households': 7,
  'Water Tanks': 8
};

const ModeOFPayment = {
    CASH: 1,
    ONLINE:2
};

const Status = {
    Paid: 1,
    Unpaid: 2,
    Omit:3
};

const NotificationTypes = {
    "Advance Paid": 1,
    "Advance UnPaid": 2,
    'Rent Paid': 3,
    'Rent Unpaid': 4,
    'Electricity Bill Paid': 5,
    'Electricity Bill Unpaid': 6,
    'Water Bill Paid':7,
    'Water Bill Unpaid':8,
    'Plumbing Households Paid':9,
    'Plumbing Households Unpaid': 10,
    'Electric Households Paid': 11,
    'Electric Households Unpaid': 12,
    'Festival Wishes': 13 ,
    'Miscellanious Unpaid': 14,
    'Miscellanious Paid': 15,
};

const NotificationLetter = {
    0:"A",
    1:"R",
    2:"E",
    3:'W',
    4:"PH",
    5:"EH",
    6:"F",
    7: "M",
}

const Professions = {
    1: "Electricean",
    2: "Plumbing",
    3: "Water Supply",
    4: "Water Tank",
    5: "House Builder",
    6: "House Labour",
    7: "Painter",
    8: "Snake Catcher"
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