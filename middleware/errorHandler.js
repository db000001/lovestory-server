export const errorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err));
  return res.status(500).json({ message: err.message ?? "Server Error" });
};
