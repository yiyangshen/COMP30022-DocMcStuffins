import app from "./config/serverConfig";

if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const port: number = +(process.env.PORT || 48080);

/* Listen for incoming connections */
app.listen(port, () => {
    console.log(`API listening on port ${port}.`);
});
