import { handleIndexGet } from '../controllers/indexcontroller';
import { handleAnalyticsPost } from '../controllers/analyticscontroller';

var express = require('express');
var router = express.Router();

router.get('/', handleIndexGet);
router.post('/analytics', handleAnalyticsPost);

module.exports = router;