const express = require("express");
require('dotenv').config()
const cors = require('cors')
const connection = require("./configuration/Config.js");
const userRoutes = require("./modules/Users/Routes/Users.routes.js");
const blogRoutes = require("./modules/Blogs/Routes/Blogs.routes");
const app = express();
const port = process.env.PORT;

// ** Middlewares ** //
app.use(cors())
app.use(express.json());
app.use(userRoutes);
app.use(blogRoutes);

connection();
// ** Hosting ** //
app.listen(port, () => console.log(`listening on http://localhost:${port}/`));
