const config = require("../config");
const qs = require("qs");
const fastify = require("fastify")({
  logger: config.shouldFastifyLog,
  pluginTimeout: 60000,
  querystringParser: (str) => qs.parse(str),
});
const swagger = require("../swagger-config");
const sequelizeInstance = require("./dbConnection");

(async () => {
  try {
    fastify.register(require("fastify-swagger"), swagger.options);
    await sequelizeInstance.query("SET session_replication_role = replica;");
    fastify
      .register(require("./drugType"), { prefix: "/api" })
      .register(require("./drug"), { prefix: "/api/" })
      .register(require("./pharmacy"), { prefix: "/api" })
      .register(require("./prescribable"), { prefix: "/api" })
      .register(require("./prescription"), { prefix: "/api" })
      .register(require("./drugStatistics"), { prefix: "/api" })
      .register(require("./statisticTypes"), { prefix: "/api" })
      .register(require("./prescriptionReason"), { prefix: "/api" })
      .register(require("./prescriptionPrescribableDrug"), { prefix: "/api" })
      .register(require("./prescriptionPrescribableDrugReason"), {
        prefix: "/api",
      })
      .after(async () => {
        console.log(2);
        await sequelizeInstance.query(
          "SET session_replication_role = DEFAULT;"
        );
      });
    await fastify.listen(config.port, config.serverHost);
    fastify.swagger();
    fastify.log.info(`Server is listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.log(err);
    fastify.log.error(err);
    process.exit(1);
  }
})();

module.exports = fastify;
