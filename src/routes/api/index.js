// src/routes/api/index.js
// const path = require('path');
/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');
const contentType = require('content-type');

const get = require('../api/get');
// Create a router on which to mount our API endpoints
const router = express.Router();
const Fragment = require('../../model/fragment');
// Define our first route, which will be: GET /v1/fragments
//  router.get('/fragments', require('./get'));
router.get('/fragments', get.getFragments);

// Other routes will go here later on...
router.get('/fragments/:id/info', get.getFragmentInfo);

router.get('/fragments/:id', get.getFragmentData);

// POST
// Support sending various Content-Types on the body up to 5M in size
const rawBody = () =>
  express.raw({
    inflate: true,
    limit: '5mb',
    type: (req) => {
      // See if we can parse this content type. If we can, `req.body` will be
      // a Buffer (e.g., `Buffer.isBuffer(req.body) === true`). If not, `req.body`
      // will be equal to an empty Object `{}` and `Buffer.isBuffer(req.body) === false`
      const { type } = contentType.parse(req);
      return Fragment.isSupportedType(type);
    },
  });

// Use a raw body parser for POST, which will give a `Buffer` Object or `{}` at `req.body`
router.post('/fragments', rawBody(), require('./post'));

// router.post('/fragments', require('./post'));

module.exports = router;
