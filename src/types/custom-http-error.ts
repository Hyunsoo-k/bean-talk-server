interface CustomHttpError extends Error {
  status: number;
};

export default CustomHttpError;