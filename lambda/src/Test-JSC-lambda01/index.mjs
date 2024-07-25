import _ from 'lodash';

export async function handler(event) {
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda with Layer.zip! ' + _.capitalize('layer')),
  };
  return response;
}