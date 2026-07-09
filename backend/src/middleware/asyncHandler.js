export default function asyncHandler(fn) {
  return async function asyncUtil(req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}
