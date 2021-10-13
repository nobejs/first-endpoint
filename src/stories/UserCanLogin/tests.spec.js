const debugLogger = requireUtil("debugLogger");

describe("Test Handler UserCanLogin", () => {
  it("user_can_login", async () => {
    let result = {};
    let registeredUser = {};
    try {
      registeredUser = await testStrategy("UserCanRegister", {
        prepareResult: {
          email: "bob@example.com",
          password: "verySecrective",
        },
      });

      result = await testStrategy("UserCanLogin", {
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
      uuid: registeredUser["handleResult"].uuid,
      email: "bob@example.com",
      password: expect.not.stringMatching("verySecretive"),
    });
  });
});
