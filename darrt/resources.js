/*****************************************
// bigco, inc
// credit check resources 
// 2020-02-01 : mamund
 *****************************************/

/*******************************************
// initialization and setup for DARRT
********************************************/
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser');

var actions = require('./actions');
var representation = require('./representation');
var transitions = require('./transitions');
var utils = require('./lib/utils');

// set up request body parsing & response templates
router.use(bodyParser.json({type:representation.getResponseTypes()}));
router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

// load response templates and input forms
var templates = representation.getTemplates();
var forms = transitions.forms;

// optional tracking middleware
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now() + " : " + req.headers.host + req.url)
  next()
})

/************************************************************************/

// shared metadata for this service
var metadata = [
  {name: "title", value: "BigCo Credit Check"},
  {name: "author", value: "Mike Amundsen"},
  {name: "release", value: "1.0.0"} 
];

// ***********************************************************
// public resources for the credit check service
// ***********************************************************

// home
router.get('/',function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.home;
  args.type = "home";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"home"
  };
  respond(args);
});

// credit check list
router.get('/list/',function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.list;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"list"
  };
  respond(args);
});

// credit check item
router.get('/list/:id', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.item;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  };
  respond(args);
});

// credit check form READ
router.get('/form/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.form;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  }
  respond(args);
});

// credit check form CREATE
router.post('/form/', function(req,res){
  var args = {};
  args.request = req;
  args.response = res;
  args.action = actions.create;
  args.type = "credit";
  args.config = {
    metadata:metadata,
    templates:templates,
    forms:forms,
    filter:"item"
  };
  respond(args);
});

/***********************************************************************/

// initialize module
function init() {
  express = require('express')
  router = express.Router()
  bodyParser = require('body-parser');

  actions = require('./actions');
  representation = require('./representation');
  transitions = require('./transitions');
  utils = require('./lib/utils');

  // set up request body parsing & response templates
  router.use(bodyParser.json({type:representation.getResponseTypes()}));
  router.use(bodyParser.urlencoded({extended:representation.urlencoded}));

  // load response templates and input forms
  templates = representation.getTemplates();
  forms = transitions.forms;
}

// local resource handler function
function respond(args) {
  var request = args.request||null;
  var response = args.response||null;
  var action = args.action||null;
  var object = args.type||"";
  var config = args.config||{};

  return utils.handler(request,response,action,object,config);	
}

// publish the capability routes
module.exports = router

