// src/model/fragment.js

// Use https://www.npmjs.com/package/content-type to create/parse Content-Type headers
const contentType = require('content-type');

// Functions for working with fragment metadata/data using our DB
const {
  readFragment,
  writeFragment,
  readFragmentData,
  writeFragmentData,
  listFragments,
  deleteFragment,
} = require('./data');

module.exports = class Fragment {
  constructor({ id, ownerId, created, updated, type, size = 0 }) {
    // TODO
    this.id = id;
    this.ownerId = ownerId;
    this.created = created;
    this.updated = updated;
    this.type = type;
    this.size = size;
  }

  /**
   * Get all fragments (id or full) for the given user
   * @param {string} ownerId user's hashed email
   * @param {boolean} expand whether to expand ids to full fragments
   * @returns Promise<Array<Fragment>>
   */
  static async byUser(ownerId, expand = false) {
    // TODO
    const data = listFragments(ownerId, expand);
    return Promise.resolve(data);
  }

  /**
   * Gets a fragment for the user by the given id.
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise<Fragment>
   */
  static async byId(ownerId, id) {
    // TODO
    const fragment = readFragment(ownerId, id);
    return Promise.resolve(fragment);
  }

  /**
   * Delete the user's fragment data and metadata for the given id
   * @param {string} ownerId user's hashed email
   * @param {string} id fragment's id
   * @returns Promise
   */
  static delete(ownerId, id) {
    // TODO
    return Promise.resolve(deleteFragment(ownerId, id))
    .then(() => console.log('fragment deleted'))
    .catch((err) => console.log(err));
  }

  /**
   * Saves the current fragment to the database
   * @returns Promise
   */
  save() {
    // TODO
    const metadata = writeFragment(this);
    return Promise.resolve(metadata);
  }

  /**
   * Gets the fragment's data from the database
   * @returns Promise<Buffer>
   */
  // getData() {
  getData() {
    // TODO
    const buffer = readFragmentData(this.ownerId, this.id);
    return Promise.resolve(buffer);
  }

  /**
   * Set's the fragment's data in the database
   * @param {Buffer} data
   * @returns Promise
   */
  async setData(data) {
    // TODO
    const write = writeFragmentData(this.ownerId, this.id, data);
    return Promise.resolve(write);
  }

  /**
   * Returns the mime type (e.g., without encoding) for the fragment's type:
   * "text/html; charset=utf-8" -> "text/html"
   * @returns {string} fragment's mime type (without encoding)
   */
  get mimeType() {
    const { type } = contentType.parse(this.type);
    return type;
  }

  /**
   * Returns true if this fragment is a text/* mime type
   * @returns {boolean} true if fragment's type is text/*
   */
  // get isText() {
  //   // TODO
  // }

  /**
   * Returns the formats into which this fragment type can be converted
   * @returns {Array<string>} list of supported mime types
   */
  // get formats() {
  //   // TODO
  // }

  /**
   * Returns true if we know how to work with this content type
   * @param {string} value a Content-Type value (e.g., 'text/plain' or 'text/plain: charset=utf-8')
   * @returns {boolean} true if we support this Content-Type (i.e., type/subtype)
   */
  static isSupportedType(value) {
    // TODO
    if (value === 'text/plain' || value === 'text/plain: charset=utf-8') {
      return true;
    }
    return false;
  }
};

// module.exports.Fragment = Fragment;
