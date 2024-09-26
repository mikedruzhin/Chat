const setHeaders = (headers, { getState }) => {
  const { token } = getState().users;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export default setHeaders;
