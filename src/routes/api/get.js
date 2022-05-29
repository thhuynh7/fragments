// src/routes/api/get.js

/**
 * Get a list of fragments for the current user
 */

 const { createSuccessResponse } = require('../../../src/response')



 module.exports = (req, res) => {
   // TODO: this is just a placeholder to get something working...
  const data = { fragments: [] };
  const successResponse = createSuccessResponse(data);

  res.status(200).json(successResponse);
  
  // res.status(200).json({
  //   status: 'ok',
  //   fragments: [],
  // });
};


