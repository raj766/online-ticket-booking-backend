import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";
const app = express();

const PORT = process.env.PORT || 8000;

// Configure the session middleware
app.use(session({
    secret: 'your secret key', // Secret key used to sign the session ID cookie
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
    cookie: { secure: false } // Set to true if you're using https
  }));

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the directory for the views
app.set('views', path.join(__dirname, 'views'));
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',(req,res) =>{
    return res.json(['its working']);
})
// admin route import
import AdminAuthRoute from "./routes/AdminAuthRoute.js";
console.log('process.env.ADMIN_PREFIX',process.env.ADMIN_PREFIX);
app.use(process.env.ADMIN_PREFIX,AdminAuthRoute);

app.listen(PORT,()=>console.log(`Server is running on PORT:${PORT}`))