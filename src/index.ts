import { initFlow } from "./cli/flow/init";
import { createTables } from "./db/createTables";

async function start() {
  await createTables();

  await initFlow();
}

start();
