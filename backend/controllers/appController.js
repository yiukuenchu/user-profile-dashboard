import UserModel from '../model/User.model.js';
import bcrypt from 'bcrypt';

/** POST register request */
export async function register(req, res) {
  try {
    const { username, password, profile, email } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username })
        .then((err, user) => {
          if (err) reject(new Error(err));
          if (user) reject({ error: 'Please provide a unique username' });
          resolve();
        })
        .catch((err) => reject({ error: 'Please use unique username' }));
    });

    // check the existing user
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email })
        .then((err, email) => {
          if (err) reject(new Error(err));
          if (email) reject({ error: 'Please provide a unique email' });
          resolve();
        })
        .catch((err) => reject({ error: 'Please use unique email' }));
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
  res.json('login route');
}

/** GET getUser request */
export async function getUser(req, res) {
  res.json('getUser route');
}

/** PUT editUser request */
export async function editUser(req, res) {
  res.json('editUser route');
}
