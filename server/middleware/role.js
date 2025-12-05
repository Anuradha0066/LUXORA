export const isAdmin = (req, res, next) => {
  if (!req.staff || req.staff.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden - Admin only' });
  }
  next();
};
