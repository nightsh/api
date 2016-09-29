'use strict';

const bookshelf = require('../../config').bookshelf;
const BaseModel = require('./base');
const Source = require('./source');
const helpers = require('../helpers');

const relatedModels = [
  'source',
];

const Publication = BaseModel.extend({
  tableName: 'publications',
  hasTimestamps: true,
  visible: [
    'id',
    'source',
    'source_url',
    'title',
    'abstract',
    'created_at',
    'updated_at',
    'authors',
  ],
  source: function () {
    return this.belongsTo('Source');
  },
  toJSONSummary: function () {
    const attributes = this.toJSON();
    const result = {
      id: attributes.id,
      url: attributes.url,
      title: attributes.title,
      source_url: attributes.source_url,
      source_id: this.attributes.source_id,
    };

    return result;
  },
  virtuals: {
    url: function () {
      return helpers.urlFor(this);
    },
  },
}, {
  relatedModels
});

module.exports = bookshelf.model('Publication', Publication);
