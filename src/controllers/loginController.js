/* ///////////////////////////////////////////////// */
/*  Required Packages and Constant Declaration */
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
app.set('view engine', 'ejs');
const Joi = require("joi");
const bcrypt = require("bcrypt");
const app = express();

const database = require(`${__dirname}/../config/databaseConfig`);
const userCollection = database
  .db(process.env.MONGODB_DATABASE)
  .collection("users");

  const expireTime = 60 * 60 * 1000;

app.get('/login', (req, res) => {
    res.render('login');
});

exports.checkUserInput = (req, res, next) => {
    email = req.body.email;
    password = req.body.password;

    const schema = Joi.string().max(20).required();
    const validationResult = schema.validate(email);

    if (validationResult.error != null) {
        console.log(validationResult);
        const error = validationResult.error.details[0].message;

        res.send(`Invalid Input: ${error}. <a href='/login'>Try Again</a>`);
        return;
    }

    next();
    };

exports.login = async (req, res, next) => {
    email = req.body.email;
    password = req.body.password;
    
    const result = await userCollection
        .find({ email: email })
        .project({ email: 1, password: 1, _id: 1, username: 1})
        .toArray();
    
    console.log(result);
    
    if (result.length != 1) {
        res.send(
        `Invalid email/password combination. </br> <a href='/login'>Try Again</a>`
        );
        return;
    }
    
    if (await bcrypt.compare(password, result[0].password)) {
        console.log("correct password");
        req.session.authenticated = true;
        req.session.email = email;
        req.session.username = result[0].username;
        req.session.cookie.maxAge = expireTime;
    
        res.redirect("/member");
        return;
    } else {
        console.log("incorrect password");
        res.send(
        `Invalid email/password combination. </br> <a href='/login'>Try Again</a>`
        );
        return;
    }
    };