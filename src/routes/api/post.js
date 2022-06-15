// src/routes/api/get.js
/**
 * Get a list of fragments for the current user
 */
const { randomUUID } = require('crypto');
const { createSuccessResponse } = require('../../../src/response');
const Fragment = require('../../model/fragment');
const hash = require('../../../src/hash');

// module.exports = (req, res) => {
module.exports = (req, res) => {
  const id = randomUUID();
  // const ownerId = req.user;
  const ownerId = hash(req.user);
  const created = JSON.stringify(new Date());
  const updated = JSON.stringify(new Date());
  const type = 'text/plain';
  const size = req.body.toString().length;

  // let tempFragment = {id, ownerId, created, updated, type, size};

  const fragment = new Fragment({ id, ownerId, created, updated, type, size });

  console.log(fragment);
  fragment
    .save()
    .then(
      fragment.setData(req.body)
        .then(() => res.status(200).json(createSuccessResponse({ fragments: fragment }))))
    .then(
      fragment.getData().then((buffer) => {
        console.log(buffer.toString());
      }))
    .catch((err) => console.log(err));
};

// const successResponse = createSuccessResponse(data);
// res.status(200).json(successResponse);
// res.status(200).json({
//   status: 'ok',
//   fragments: [],
// });
