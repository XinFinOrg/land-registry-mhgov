export const API_URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://217.23.12.125:8001'

export const statusColor = {
  property_new: 'yellow',
  property_verifiedL: 'green',
  property_rejected: 'red',
  registry_new: 'yellow',
  registry_owner: 'yellow',
  registry_owner_financer: 'yellow',
  registry_skip_owner_financer: 'yellow',
  registry_owner_financer_verified: 'green',
  registry_owner_financer_rejected: 'red',
  registry_buyer: 'yellow',
  registry_buyer_confirmed: 'green',
  registry_buyer_rejected: 'red',
  registry_buyer_financer: 'yellow',
  registry_skip_buyer_financer: 'yellow',
  registry_buyer_financer_confirmed: 'green',
  registry_buyer_financer_rejected: 'red',
  registry_token_amount: 'green',
  registry_bank_pay: 'green',
  registry_buyer_pay: 'green',
  registry_stamp_duty: 'green'
}

export const nextTab = {
  property_new: 'property-details',
  property_verified: 'property-details',
  property_rejected: 'property-details',
  registry_new: 'owner-details',
  registry_owner: 'owner-details',
  registry_owner_financer: 'owner-details',
  registry_skip_owner_financer: 'buyer-details',
  registry_owner_financer_verified: 'buyer-details',
  registry_owner_financer_rejected: 'buyer-details',
  registry_buyer: 'buyer-details',
  registry_buyer_confirmed: 'buyer-details',
  registry_buyer_rejected: 'buyer-details',
  registry_buyer_financer: 'buyer-details',
  registry_skip_buyer_financer: 'payment',
  registry_buyer_financer_confirmed: 'payment',
  registry_buyer_financer_rejected: 'payment',
  registry_token_amount: 'payment',
  registry_bank_pay: 'payment',
  registry_buyer_pay: 'stamp-duty',
  registry_stamp_duty: 'stamp-duty'
}
export const data = [
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'approved',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'approved',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'approved',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'approved',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'pending',
    view: 'view'
  },
  {
    srNo: 1,
    propertyId: 'ABC',
    propertyType: 'Residential',
    propertyLocation: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    city: 'Delhi',
    status: 'approved',
    view: 'view'
  }
]
export const customData = [
  {
    srNo: 1,
    location: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    usageCategory: 'Urban - Residential Flat - 19 Page No.12',
    propertyDetails: 'Lorem ipsum dolor sit amet, consectetuer adipiscing '
  },
  {
    srNo: 1,
    location: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    usageCategory: 'Urban - Residential Flat - 19 Page No.12',
    propertyDetails: 'Lorem ipsum dolor sit amet, consectetuer adipiscing '
  },
  {
    srNo: 1,
    location: 'Block 370, Clementi Avenue 2, #09-128, Singapore 120370',
    usageCategory: 'Urban - Residential Flat - 19 Page No.12',
    propertyDetails: 'Lorem ipsum dolor sit amet, consectetuer adipiscing '
  }
]

export const stampDuty = [
  {
    duty: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  },
  {
    duty: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  },
  {
    duty: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  }
]

export const partyDetails = [
  {
    srNo: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  },
  {
    srNo: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  },
  {
    srNo: 1,
    partyName: 'Saurav',
    partyType: 'Seller/ Executor 1/Vendor',
    partyCategory: 'Individual',
    action: 'view'
  }
]
export const dutyDetails = [
  {
    srNo: 11,
    partyName: 'Handelling Chargesss Counter',
    partyType: '720'
  },
  {
    srNo: 11,
    partyName: 'Handelling Chargess Counter',
    partyType: '720'
  }
]

export const DocumentDutyTotal = [
  {
    txInfo: 'First payment financier to supplier',
    date: '27 july, 2018',
    amount: '$8000'
  },
  {
    txInfo: 'First payment financier to supplier',
    date: '27 july, 2018',
    amount: '$8000'
  }
]

export const commonUploadDoc = [
  {
    docDetails: 'Documnet deed file',
    select: 'uploadFile',
    download: 'Seller/ Executor 1/Vendor',
    action: 'view'
  },
  {
    docDetails: 'Documnet deed file',
    select: 'uploadFile',
    download: 'Seller/ Executor 1/Vendor',
    action: 'view'
  },
  {
    docDetails: 'Documnet deed file',
    select: 'uploadFile',
    download: 'Seller/ Executor 1/Vendor',
    action: 'view'
  }
]

export const states = [
  'Andaman & Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chattisgarh',
  'Dadra & Nagar Haveli',
  'Daman & Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu & Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Poducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
]
