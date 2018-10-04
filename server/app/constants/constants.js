let proposerRelationships = ["DAUGHTER", "FATHER", "HUSBAND", "MOTHER", "SELF", "SON", "SPOUSE", "WIFE"];

let nomineeRelationShips = ["AUNT", "BROTHER", "BROTHER IN LAW", "COUSIN", "DAUGHTER", "DAUGHTER IN LAW", "EMPLOYEE", "EMPLOYER", "FATHER", "FATHER IN LAW", "GRAND DAUGHTER", "GRAND FATHER", "GRAND MOTHER", "GRAND SON", "HUSBAND", "LEGAL GUARDIAN", "MOTHER", "MOTHER IN LAW", "NEPHEW", "NIECE", "OTHERS", "SELF", "SISTER", "SISTER IN LAW", "SISTER IN LAW", "SON", "SON IN LAW", "SPOUSE", "UNCLE", "WIFE"];

let occupations = ["UTILITIES", "PUBLIC UTILITIES AND SERVICES", "S-FISHERMEN", "BUILDERS AND REAL ESTATE,INFRASTRUCTURE DEVELOPERS", "NON-CONTINUOUS PROCESS", "SEASONAL INDUSTRIES", "S-PHY.CHALLENGED NON EMPLOYED", "SERVICE", "TELECOM", "S-AGRICULTURAL LABOURERS", "S-WORKING WOMAN IN HILLS", "S-SALT GROWERS", "S-GUARDIAN OF PHY.CHALLENGED", "TEA INDUSTRY", "OTHER INDUSTRIES", "DOCTOR", "S-HANDLOOM AND KHADI WORKERS", "S-CONSTRUCTION WORKERS", "OTHERS", "ENTERTAINMENT", "S-PRIMARY MILK PRODUCERS", "S-PHY.CHALLENGED SELF EMPLOYED", "GOVERNMENT", "S-HANDICRAFT ARTISANS", "REAL ESTATE", "HOTEL/RESTAURANT", "S-SERICULTURE WORKERS", "S-TENDU LEAVES COLLECTORS", "SELF EMPLOYED - NON-PROFESSIONAL / TRADERS", "REFINERIES", "S-WASHERMEN/WASHERWOMAN", "S-VEGETABLE VENDORS", "SALARIES", "BUSINESS", "AGRICULTURE / ALLIED ACTIVITIES", "AGRICULTURIST", "SALARIED", "S-COBBLERS", "S-LADY TAILORS", "RETIRED", "S-RICKSHAW PULLERS", "AGRICULTURE", "S-SAFAI KARMCHARIS", "SHIPPING AND TRANSPORTATION", "IMPORTERS / EXPORTERS", "S-LEATHER AND TANNERY WORKERS", "GOVERNMENT / SEMI-GOVERNMENT / LOCAL BODIES", "MANUFACTURING", "FERTILIZER PLANTS", "S-CARPENTERS", "SELF EMPLOYED", "SELF EMPLOYED - PROFESSIONAL", "STUDENT", "RETAIL/WHOLESALER", "S-SUGARCANE CUTTERS", "POWER PLANTS", "S-PAPAD MAKERS", "INFORMATION TECHNOLOGY", "CONTINUOUS PROCESS", "S-POWERLOOM WORKERS", "PROFESSIONAL", "INDV - SELF EMPLOYED - NON-PROFESSIONAL", "S-BIDI WORKERS", "INSURANCE", "HOUSEWIFE", "RETIRED / PENSIONER", "S-HAMALS", "EXPLOSIVES", "S-TODDY TAPPERS", "INDV - SELF EMPLOYED - PROFESSIONAL", "BANKING AND FINANCE", "ARMS/WEAPONS/ANTIQUES - DEALERS OR MANUFACTURERS", "JEWELLER / BULLION TRADER", "PETROCHEMICAL PLANT", "FIN SERVICES -STOCK BROKERS/INVESMENT/MUTUAL FUND", "POLITICIAN", "SERVICE SECTOR", "S-BRICK KILN WORKERS"];

let states = ["Uttar Pradesh", "Gujarat", "Madhya Pradesh", "Tamilnadu", "Orissa", "Haryana", "Meghalaya", "Karnataka", "Manipur", "Tripura", "Jammu Kashmir", "Pondicherry", "Daman   Diu", "Kerala", "Telangana", "Uttaranchal", "Assam", "Goa", "Maharashtra", "Punjab", "Rajasthan", "Delhi", "Mizoram", "Chandigarh", "Arunachal Pradesh", "Bihar", "Andhra Pradesh", "Jharkhand", "Dadra Nagar Haveli", "Sikkim", "Uttarakhand", "Nagaland", "West Bengal", "Andaman Nicobar", "Chattisgarh", "Himachal Pradesh"];

let genders = ["Male", "Female"];

let dummyData = [
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 69,
    transactionHash:
     '0x21583c92a745b4b5f89e9e91be875e3feb97ca0bac24432cd26f4aad1625eb28',
    transactionIndex: 0,
    blockHash:
     '0xdcf6a1ce201286de2a3ed8068fce8ab5e72fd8499da57a7f3ae814233fb13032',
    logIndex: 0,
    removed: false,
    event: 'AddPolicyInfo',
    args:
     { policyNo: '1236',
       agentCode: '1234',
       extRefNo: '1234',
       inceptionDate: '1989',
       expiryDate: '1989',
       sumInsured: 10000,
       netPremium: 500 }
  },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 72,
    transactionHash:
     '0xffec8b931ea803e7230598a5ee478a7238be34c0e9e57359846af5266810976d',
    transactionIndex: 0,
    blockHash:
     '0xae0f614abba10c598804493502f21197ec8fad175be9d714436b91807d540812',
    logIndex: 0,
    removed: false,
    event: 'AddPolicyInfo',
    args:
     { policyNo: '1237',
       agentCode: 'atul deepak Rupnar atul deepak a',
       extRefNo: '1234',
       inceptionDate: '1989',
       expiryDate: '1989',
       sumInsured: 10000,
       netPremium: 500 } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 73,
    transactionHash:
     '0xa70c5f2a0e271e83646b21f9d5242fee34a179855716f9f1b0e9a0d7bb5b44da',
    transactionIndex: 0,
    blockHash:
     '0xab0cc145e95b8ffaad5cc1b571fac33b5dc5922a3881f0b8bf9fe7294ef19fc1',
    logIndex: 0,
    removed: false,
    event: 'AddPolicyInfo',
    args:
     { policyNo: 'p1236',
       agentCode: 'AG020227',
       extRefNo: 'NEW35',
       inceptionDate: '25/08/2018',
       expiryDate: '24/08/2019',
       sumInsured: 500000,
       netPremium: 525 } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 74,
    transactionHash:
     '0x914b107c49c3927d9ae5ec5c721078c6ca9ce5f107055f7b7f9f547ff1d2fcf1',
    transactionIndex: 0,
    blockHash:
     '0xe6c35589f3fbccf40244634397662f1a94e3d89f7e03ab01af8a01596750e286',
    logIndex: 0,
    removed: false,
    event: 'AddPolicyInfo',
    args:
     { policyNo: 'p1237',
       agentCode: 'AG020227',
       extRefNo: 'NEW35',
       inceptionDate: '25/08/2018',
       expiryDate: '24/08/2019',
       sumInsured: 500000,
       netPremium: 525 } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 75,
    transactionHash:
     '0xc6bbd97c5b619f1a6952f4ddc3950c2e2adc5a638eb1d4b77c5265dd8c5cd409',
    transactionIndex: 0,
    blockHash:
     '0x3fb904f90e5dbd5afd45b7c20fa547a1f761be1b3825c4be814e9616dc1eb657',
    logIndex: 0,
    removed: false,
    event: 'AddPolicyInfo',
    args:
     { policyNo: 'p1238',
       agentCode: 'AG020227',
       extRefNo: 'NEW35',
       inceptionDate: '25/08/2018',
       expiryDate: '24/08/2019',
       sumInsured: 500000,
       netPremium: 525 } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 78,
    transactionHash:
     '0xb6b8937bd69512ba01b77235510850690760ce4df1404c244d8e631ce225e1c4',
    transactionIndex: 0,
    blockHash:
     '0xb948b758eb945a026b9a353625ec52f837dcabe8d228afaf7f88a81618d8f84a',
    logIndex: 0,
    removed: false,
    event: 'SetStatus',
    args:
     { policyNo: 'p1238',
       status: 'DEBIT_SUCCESS',
       created: 1537976858966 } },
 { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 125,
    transactionHash: '0xb4fa50a2d992784fbee5321fed57748862729d4df1875f1f9aede949c5bf0e09',
    transactionIndex: 0,
    blockHash: '0xa02d59d0c044737b92c28cc05c808d70cc5ff204e5acf869e4e8672040a53e9c',
    logIndex: 0,
    removed: false,
    event: 'AddUserDetails',
    args: 
     { policyNo: 'p1242',
       firstName: 'Atul',
       lastName: 'Rupnar',
       panNumber: 'BCPPR7865H',
       dateOfBirth: '10/10/1989',
       email: 'atul@123.com',
       gender: 'Male',
       city: 'Pune',
       state: 'Maharashtra',
       pinCode: 416308,
       occupation: 'Farmer',
       relationShipWithProposer: 'Self' } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 127,
    transactionHash: '0x459f0cdf7fd2c76df73abd0825cc908965c305928d9e2b1093b12071f1550d89',
    transactionIndex: 0,
    blockHash: '0x248059c852416b607ca8c0edb0ea19d1cb88f5b7f4fdf49fd2542a2215e86c34',
    logIndex: 0,
    removed: false,
    event: 'AddUserDetails',
    args: 
     { policyNo: 'p12345',
       firstName: 'shan',
       lastName: 'k',
       panNumber: 'string',
       dateOfBirth: '12/02/2000',
       email: 'test@xerago.com',
       gender: 'Male',
       city: 'CHENNAI',
       state: 'Tamilnadu',
       pinCode: 600012,
       occupation: 'Business',
       relationShipWithProposer: 'Self' } },
    {},
   { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 124,
    transactionHash: '0xc601f58bffee8070054d9250dbe8e32c3d78fba4f2d9c89d929f1d2d6d26e8e6',
    transactionIndex: 0,
    blockHash: '0x9d1a6f9bb40837d1cf607a1f0a282d0f5151e32ab53fb3d2a1879cf778027ebb',
    logIndex: 0,
    removed: false,
    event: 'AddNomineeDetails',
    args: 
     { policyNo: 'p1242',
       nomineeName: 'Ajay',
       nomineeLastName: 'Rupnar',
       nomineeGender: 'Male',
       nomineeDob: '10/10/1989',
       nomineeRelationShip: 'Brother' } },
  { address: '0xadf291fba7d6156fc96821c062eed078634d5568',
    blockNumber: 128,
    transactionHash: '0xfa47c7ef184d0005cee67c9297ea6127c67e680802de78698f91c9de14417df3',
    transactionIndex: 0,
    blockHash: '0x09654ed13d02b35ab1185fde58f8c4a829f3258e3a0d22f83c5f781039927cf8',
    logIndex: 0,
    removed: false,
    event: 'AddNomineeDetails',
    args: 
     { policyNo: 'p12345',
       nomineeName: 'nomineeName',
       nomineeLastName: 'nomineeLastName',
       nomineeGender: 'Female',
       nomineeDob: '26/03/1992',
       nomineeRelationShip: 'AUNT' } }
];

module.exports = {
	proposerRelationships : proposerRelationships,
	nomineeRelationShips : nomineeRelationShips,
	occupations : occupations,
	states : states,
	genders : genders,
	dummyData : dummyData
};