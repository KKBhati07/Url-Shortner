//importing Url model
import Url from "../models/Url.js";

// importing log middleware to log the error
import { log } from "../middlewares/logger_middleware.js";

const redirect=async(req,res)=>{
    try {
        const { code } = req.params;
        // getting the original url form the database
        const url = await Url.findOne({ code });
        // if not found
        if (!url) return res.render("error",{content:"Invalid Code"});
        // if found, redirecting to the original url
        return res.redirect(url.original);
    } catch (error) {
        console.log(error);
        // to log the error in the error file
        log(`URL: ${req.url} ${error}`, "error.txt");
        return res.render("error",{content:"Internal server error"});


    }
}
export {redirect};