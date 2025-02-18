import passport from "passport";

export const passportCall = (strategy) => {
    return (req, res, next) => {
        passport.authenticate(strategy, (err, user, info) => {
            if (err) return next(err);
            if (!user) return res.status(401).json({ status: "Error", message: info.message ? info.message : info.message.toString() });
            req.user = user;
            console.log("User from JWT:", user);
            next();
        })(req, res, next);
    }
};