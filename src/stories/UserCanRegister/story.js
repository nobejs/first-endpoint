const validator = requireValidator();
const knex = requireKnex();
const bcrypt = require("bcrypt");
const findKeysFromRequest = requireUtil("findKeysFromRequest");

const prepare = ({ req }) => {
  const payload = findKeysFromRequest(req, ["email", "password"]);
  return payload;
};

const authorize = () => {
  return true;
};

const validateInput = async (prepareResult) => {
  const constraints = {
    email: {
      email: true,
      presence: {
        allowEmpty: false,
        message: "^Please enter email",
      },
    },
    password: {
      presence: {
        allowEmpty: false,
        message: "^Please enter password",
      },
    },
  };

  return validator(prepareResult, constraints);
};

const handle = async ({ prepareResult }) => {
  try {
    await validateInput(prepareResult);

    const hash = await bcrypt.hash(prepareResult.password, 10);

    const users = await knex("users")
      .insert({
        email: prepareResult.email,
        password: hash,
      })
      .returning("*");

    return users[0];
  } catch (error) {
    throw error;
  }
};

const respond = ({ handleResult }) => {
  return handleResult;
};

module.exports = {
  prepare,
  authorize,
  handle,
  respond,
};
