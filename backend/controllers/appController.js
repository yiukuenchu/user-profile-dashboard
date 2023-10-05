import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** middleware for user verify */
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;
    let exist = await UserModel.findOne({ username });
    if (!exist) {
      return res.status(404).send({ error: 'User not exist' });
    }
    next();
  } catch (error) {
    return res.status(404).send({ error: 'Authentication error' });
  }
}

/** POST register request */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username });
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'Please use unique username' });

        resolve();
      });
    });

    // check the existing user
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: 'Please use unique Email' });

        resolve();
      });
    });

    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || '',
                email,
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ msg: 'User Register Succesfully' })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res.status(500).send({
                error: 'Enable to hashed password',
              });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({
          error,
        });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

/** POST login request */
export async function login(req, res) {
  const { username, password } = req.body;

  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck)
              return res.status(400).send({ error: "Don't have Password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              ENV.JWT_SECRET,
              { expiresIn: '24h' }
            );

            return res.status(200).send({
              msg: 'Login Successful...!',
              username: user.username,
              token,
            });
          })
          .catch((error) => {
            return res.status(400).send({ error: 'Password does not Match' });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: 'Username not Found' });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

/** GET getUser request */
export async function getUser(req, res) {
  const { username } = req.params;

  try {
    if (!username) return res.status(501).send({ error: 'Invalid Username' });

    UserModel.findOne({ username }, function (err, user) {
      if (err) return res.status(500).send({ err });
      if (!user)
        return res.status(501).send({ error: "Couldn't Find the User" });

      /** remove password from user */
      // mongoose return unnecessary data with object so convert it into json
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(201).send(rest);
    });
  } catch (error) {
    return res.status(404).send({ error: 'Cannot Find User Data' });
  }
}

/** PUT editUser request */
export async function edit(req, res) {
  try {
    // const id = req.query.id;
    const { userId } = req.user;

    if (userId) {
      const body = req.body;

      // update the data
      UserModel.updateOne({ _id: userId }, body, function (err, data) {
        if (err) throw err;

        return res.status(201).send({ msg: 'Record Updated...!' });
      });
    } else {
      return res.status(401).send({ error: 'User Not Found...!' });
    }
  } catch (error) {
    return res.status(401).send({ error });
  }
}
