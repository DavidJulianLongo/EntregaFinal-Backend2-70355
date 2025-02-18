export const authorization = (role) => {
    return (req, res, next) => {
        console.log('Role from parameter:', role);
        if (req.user.role !== role) return res.status(403).json({ status: "Error", msg: "You are not authorized" });
        if (!req.user) return res.status(409).json({ status: "Error", message: "You are not authenticated" });
        
        next();
    }

}