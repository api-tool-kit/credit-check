// ****************************************
// DARRT framework
// credit-check data elements 
// properties, requireds, and enums
// 2020-03-01 : mamund
// ****************************************

// this service's message properties
exports.props = [
  'id',
  'status',
  'companyName',
  'ratingValue',
  'dateCreated',
  'dateUpdated'
];

// required properties
exports.reqd = ['companyName'];

// enumerated properties
exports.enums = [
  {status:['pending','active','suspended','closed']}
];

// default values
exports.defs = [
  {name:'status', value:'active'}
];

