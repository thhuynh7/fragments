// src/routes/api/post.js
const { randomUUID } = require('crypto');
const { createSuccessResponse } = require('../../../src/response');
const { createErrorResponse } = require('../../../src/response');
const Fragment = require('../../model/fragment');
const hash = require('../../../src/hash');

// module.exports = (req, res) => {
exports.postFragment = (req, res) => {
  const id = randomUUID();
  const ownerId = hash(req.user);
  const created = JSON.stringify(new Date());
  const updated = JSON.stringify(new Date());
  const type = 'text/plain';
  const size = req.body.toString().length;

  let location = 'http://localhost:8080/v1/fragments/';
  location += id;

  const fragment = new Fragment({ id, ownerId, created, updated, type, size });

  // console.log(fragment);
  fragment
    .save()
    .then(
      fragment.setData(req.body).then(() => {
        res.header('Location', location);
        res.status(201).json(createSuccessResponse({ fragment: fragment }));
      })
    )
    .catch((err) => console.log(err));
};

exports.deleteFragment = (req, res) => {
  const id = req.params.id;
  const user = hash(req.user);

  Fragment.byId(user, id)
  .then((data) => {
    if (typeof(data) != 'undefined' && data != null) {
      Fragment.delete(user, id).then((data) => {
        res.status(200).json(createSuccessResponse());})
        .catch((err) => console.log(err));
    } else {
      res.status(404).json(createErrorResponse(404, 'not found'));
    }
  })
  .catch((err) => console.log(err));


};
