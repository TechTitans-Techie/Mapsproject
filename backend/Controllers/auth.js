
const bcrypt=require('bcrypt')
const User=require('./../Models/User')
const jwt=require('jsonwebtoken')
const RegisterUser = (request, response) => {
    bcrypt
        .hash(request.body.password, 10)
        .then((hashedPassword) => {
            const user = new User({
                email: request.body.email,
                password: hashedPassword,
            });
            user
                .save()
                .then((result) => {
                    response.status(201).send({
                        message: "User Created Successfully"
                    });
                })
                .catch((error) => {
                    response.status(500).send({
                        message: "Error creating user",
                        error,
                    });
                });
        })
        .catch((e) => {
            response.status(500).send({
                message: "Password was not hashed successfully",
                e,
            });
        })
}

const LoginUser = (request, response) => {
    console.log(request.body.password)
    User.findOne({ email: request.body.email })
        .then((user) => {
            bcrypt
                .compare(request.body.password, user.password)
                .then((passwordCheck) => {
                    console.log(passwordCheck)
                    if (!passwordCheck) {
                        return response.status(400).send({
                            message: "Passwords does not match",
                            error,
                        });
                    }

                    //   create JWT token
                    const token = jwt.sign(
                        {
                            userId: user._id,
                            userEmail: user.email,
                        },
                        "RANDOM-TOKEN",
                        { expiresIn: "24h" }
                    );
                    response.status(200).send({
                        message: "Login Successful",
                        email: user.email,
                        token,
                    });
                })
                .catch((error) => {
                    console.log(error)
                    response.status(400).send({
                        message: "Passwords does not match",
                        error,
                    });
                });
        })
        .catch((e) => {
            response.status(404).send({
                message: "Email not found",
                e,
            });
        });
}

module.exports={RegisterUser,LoginUser}