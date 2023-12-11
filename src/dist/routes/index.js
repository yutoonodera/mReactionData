"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indexcontroller_1 = require("../controllers/indexcontroller");
const analyticscontroller_1 = require("../controllers/analyticscontroller");
var express = require('express');
var router = express.Router();
router.get('/', indexcontroller_1.handleIndexGet);
router.post('/analytics', analyticscontroller_1.handleAnalyticsPost);
module.exports = router;
