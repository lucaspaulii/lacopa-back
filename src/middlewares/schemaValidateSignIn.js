import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { signInSchema } from "../modules/signInSchema.js"

export async function schemaValidateSignIn(req, res, next) {
  const user = req.body;
  const { error } = signInSchema.validate(user, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send(errors);
  }
  try {
    const emailExists = await usersCollection.findOne({ email: user.email });
    if (!emailExists) {
      return res.status(401).send("Invalid e-mail");
    }
    if (bcrypt.compareSync(user.password, emailExists.password)) {
      const token = uuid();
      const sessionUser = {
        token,
        userID: emailExists._id,
      };
      req.sessionUser = sessionUser;
      next();
      return;
    }
    return res.status(401).send("Invalid password");
  } catch (error) {
    res.sendStatus(400);
  }
  return;
}
