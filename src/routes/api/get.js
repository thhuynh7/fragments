// src/routes/api/get.js
/**
 * Get a list of fragments for the current user
 */
const { createSuccessResponse } = require('../../../src/response');
const { createErrorResponse } = require('../../../src/response');
const Fragment = require('../../model/fragment');

// module.exports = (req, res) => {
exports.getFragments = (req, res) => {
  // TODO: this is just a placeholder to get something working...
  // const data = { fragments: [] };
  // const fragments = Fragment.
  // const user = req.user;

  Fragment.byUser(req.user, false)
    .then((data) => {
      console.log(data);
      res.status(200).json(createSuccessResponse({ fragments: data }));
    })
    .catch((err) => console.log(err));
  // const successResponse = createSuccessResponse(data);
  // res.status(200).json(successResponse);
  // res.status(200).json({
  //   status: 'ok',
  //   fragments: [],
  // });
};

exports.getFragmentInfo = (req, res) => {
  const id = req.params.id;

  Fragment.byId(req.user, id)
    .then((data) => {
      console.log(id);
      console.log(data);
      res.status(200).json(createSuccessResponse({ fragments: data }));
    })
    .catch((err) => console.log(err));
};

exports.getFragmentData = (req, res) => {
  const id = req.params.id;
  let fragment;

  Fragment.byId(req.user, id)
    .then((metadata) => {
      fragment = new Fragment(metadata);
      fragment.getData().then((buffer) => {
        res.setHeader('Cache-Control', 'no-cache');
        const data = {fragment:buffer.toString()};
        const successResponse = createSuccessResponse(data);
        res.status(200).json(successResponse);
      });
    })
    .catch((err) => console.log(err));
};
