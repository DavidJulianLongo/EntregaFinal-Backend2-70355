export const authorization = (role) =>{
    return (req, res, next) =>{
        if (!req.user) return res.status(409).json({ status: "Error", message: info.message});
        if (req.user.role !== role) return res.status(403).json({ status: "Error", msg: "You are not authorized" });
        next();
    }
}