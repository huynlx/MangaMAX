/**@module BuildHeader */

/**
 * build extra for axios header
 * @function
 * @param {Object} extra - the new properties will be inserted to current header
 * @returns {Object} the new header
 */
export function buildExtraHeader(payload = {}, token?: string) {
  return {
    ...payload,
    ...(token ? buildHeaders(token) : {}),
  };
}

/**
 * build headers with the token
 * @function
 * @param {string} token
 * @returns {Object} is the expandation of the header
 */
function buildHeaders(token: string) {
  if (token === '' || !token) return;

  const bearerToken = token ? `Bearer ${token}` : undefined;

  return {
    Accept: 'application/json',
    Authorization: bearerToken,
  };
}

export default buildHeaders;
