import express = require('express');
import serializer from '../serializer';
import orgsRouter from './orgs';
import oauth2Router from './oauth2';

let router = express.Router();

router.use('/oauth2', oauth2Router);
router.use('/orgs', orgsRouter);

export default router;