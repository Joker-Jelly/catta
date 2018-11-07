const { text, json } = require('micro');
const cors = require('micro-cors')();

const textData = require('./data/text.js');
const simpleData = require('./data/simple.json');
const complexData = require('./data/complex.json');

const handler = async (req) => {
  let data = await text(req);
  try {
    data = JSON.parse(data);
  } catch(e) {
    const text = data;
    data = {
      type: 'custom',
      data: text
    };
  }

  const type = data.type;

  switch (type) {
    case 'text':
      return textData;
    case 'simple':
      return simpleData;
    case 'complex':
      return complexData;
  }

  return data;
}

module.exports = cors(handler);