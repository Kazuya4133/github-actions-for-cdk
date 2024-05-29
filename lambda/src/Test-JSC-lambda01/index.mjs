export const handler = async (event) => {
  const lambdaName = process.env.LAMBDA_NAME || 'Unknown';
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify(`Hello from ${lambdaName}!`),
  };
  return response;
};