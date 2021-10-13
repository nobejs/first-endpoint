const debugLogger = requireUtil("debugLogger");

describe("Test Handler UserCanRegister", () => {
  it("user_can_register", async () => {
    let result = {};
    try {
      result = await testStrategy("UserCanRegister", {
        prepareResult: {
          email: "bob@example.com",
          password: "verySecrective",
        },
      });
    } catch (error) {
      debugLogger(error);
    }
    const { respondResult } = result;

    expect(respondResult).toMatchObject({
      uuid: expect.any(String),
      email: "bob@example.com",
      password: expect.not.stringMatching("verySecretive"),
    });
  });

  it("user_must_enter_email_password_to_proceed", async () => {
    let respondResult = {};
    try {
      respondResult = await testStrategy("UserCanRegister", {
        prepareResult: {},
      });
    } catch (error) {
      respondResult = error;
    }

    expect(respondResult).toEqual(
      expect.objectContaining({
        errorCode: expect.stringMatching("InputNotValid"),
      })
    );
  });
});
