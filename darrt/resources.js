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
  utils.handler(req,res,actions.home,"home", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"home"
    }
  )
});

// credit check list
router.get('/list/',function(req,res){
  utils.handler(req,res,actions.list,"credit", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"list"
    }
  )
});

// credit check item
router.get('/list/:id', function(req,res){
  utils.handler(req,res,actions.item,"credit", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// credit check form READ
router.get('/form/', function(req,res){
  utils.handler(req,res,actions.form,"credit", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms, 
      filter:"item"
    }
  )
});

// credit check form CREATE
router.post('/form/', function(req,res){
  utils.handler(req,res,actions.create,"credit", 
    {
      metadata:metadata,
      templates:templates,
      forms:forms,
      filter:"item"
    }
  )
});

// publish the capability routes
module.exports = router
