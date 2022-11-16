import { createTables } from "./db/createTables";
import { Adminstrador } from "./objects/Adminstrador";
import { Festa } from "./objects/Festa";

async function start() {
  await createTables();
  const a = await Adminstrador.logar("admin", "admin");
  if (!a) return console.log("Erro ao logar");
  const f = await Festa.criar({
    nome: "Festa do João",
    local: "Rua do João",
    horario: "20/12 às 20:00",
    adminstrador: a.getUsername(),
  });
  const af = await f.getAdminstrador();
  console.log(a, f, af);
}

start();
