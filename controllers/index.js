
const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");
const profileRoutes = require("./profile-routes.js");
const listingRoutes = require("./listing-routes.js");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
<<<<<<< HEAD
router.use("/dashboard", dashboardRoutes);
//router.use("/profile", profileRoutes);
=======
//router.use("/dashboard", dashboardRoutes);
router.use("/profile", profileRoutes);
>>>>>>> eff12c112ded2c56371c32109fc0ed5f27bfbe92
router.use("/listing", listingRoutes);


router.use((req, res) => {
    res.status(400).end();
});

module.exports = router;

