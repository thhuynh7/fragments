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
  const ownerId = hash(req.user);
  const created = JSON.stringify(new Date());
  const updated = JSON.stringify(new Date());
  const type = 'text/plain';
  const size = req.body.toString().length;

  const fragment = new Fragment({ id, ownerId, created, updated, type, size });

  console.log(fragment);
  fragment
    .save()
    .then(
      fragment.setData(req.body)
        .then(() => res.status(201).json(createSuccessResponse({ fragments: fragment }))))
    .then(
      fragment.getData().then((buffer) => {
        console.log(buffer.toString());
      }))
    .catch((err) => console.log(err));
};


