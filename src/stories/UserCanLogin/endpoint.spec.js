const contextClassRef = requireUtil("contextHelper");
const randomUser = requireUtil("randomUser");
const knex = requireKnex();
const httpServer = requireHttpServer();

describe("Test API UserCanLogin", () => {
  beforeAll(async () => {
    await knex("users").truncate();
  });

  it("user_can_login", async () => {
    let registerResult;
    let loginResult;
    try {
      const app = httpServer();

      const payload = {
        email: "bob@example.com",
        password: "verySecrective",
      };

      registerResult = await app.inject({
        method: "POST",
        url: "/register",
        payload,
      });

      loginResult = await app.inject({
        method: "POST",
        url: "/login",
        payload,
      });
    } catch (error) {
      loginResult = error;
    }

    expect(loginResult.statusCode).toBe(200);
    expect(loginResult.json()).toMatchObject({
      uuid: registerResult.json().uuid,
      email: "bob@example.com",
      password: expect.not.stringMatching("verySecretive"),
    });
  });
});
