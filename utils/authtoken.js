const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwttoken = () => {

    const createJwtToken = (data) =>{
        // token: jwt.sign({ data: { _id: data._id, first_name: data.first_name, email: data.email, mobile: data.mobile } },
        //     process.env.secretKey,
        //     { expiresIn: "48h" }
        // )

        // Create token
        const token = jwt.sign(
            { data },
            process.env.TOKEN_SECRET,
            {
                expiresIn: "12h",
            }
        );
        return token;
    };

    const verifyToken = (req, res, next) => {

        const token = req.headers["authorization"];
        if (!token) {
          return res.status(403).send("A token is required for authentication");
        }
        try {
          const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
         
          req.user = decoded;
          next();
        } 
        catch (err) {
          return res.status(400).send('Token not valid');
        }
      };


    return{
        createJwtToken,
        verifyToken
    }
}

module.exports = jwttoken();