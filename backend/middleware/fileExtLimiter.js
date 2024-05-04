const fileExtLimiter = (req, res, next) => {
  const file = req.file;
  console.log(req.file);
  const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    req.fileEx = file;
    next();
  } else {
    return res.status(415).json({ message: "Invalid file type" });
  }
};

module.exports = fileExtLimiter;
