// src/routes/api/get.js
/**
 * Get a list of fragments for the current user
 */
const { createSuccessResponse } = require('../../../src/response');
// const { createErrorResponse } = require('../../../src/response');
const Fragment = require('../../model/fragment');
const hash = require('../../hash');

// module.exports = (req, res) => {
exports.getFragments = (req, res) => {
  const user = hash(req.user);

  Fragment.byUser(user, false)
    .then((data) => {
      console.log(data);
      res.status(200).json(createSuccessResponse({ fragments: data }));
    })
    .catch((err) => console.log(err));
};

exports.getFragmentInfo = (req, res) => {
  const id = req.params.id;
  const user = hash(req.user);

  Fragment.byId(user, id)
    .then((data) => {
      console.log(id);
      console.log(data);
      res.status(200).json(createSuccessResponse({ fragments: data }));
    })
    .catch((err) => console.log(err));
};

exports.getFragmentData = (req, res) => {
  const id = req.params.id;
  const user = hash(req.user);
  let fragment;

  Fragment.byId(user, id)
    .then((metadata) => {
      fragment = new Fragment(metadata);
      fragment.getData().then((buffer) => {
        res.header('Content-Type', fragment.type);
        res.status(200).send(buffer);
      });
    })
    .catch((err) => console.log(err));
};
