import { PerguntaDAO } from "../db/dao/PerguntaDAO";
import type { PerguntaAbstract } from "./PerguntaAbstract";
import { PerguntaDisertativa } from "./PerguntaDisertativa";
import { PerguntaObjetiva } from "./PerguntaObjetiva";

interface IPerguntaObjetiva {
  tipo: "Objetiva";
  enunciado: string;
  alternativa1: string;
  alternativa2: string;
}

interface IPerguntaDisertativa {
  tipo: "Disertativa";
  enunciado: string;
}

export class Pergunta {
  public static async procurar(id: string): Promise<PerguntaAbstract<any>> {
    const result = await PerguntaDAO.find(id);
    if (result.tipo === "Disertativa")
      return new PerguntaDisertativa(result.id, result.enunciado);
    else
      return new PerguntaObjetiva(
        result.id,
        result.enunciado,
        result.alternativa1,
        result.alternativa2
      );
  }

  public static async listar(): Promise<PerguntaAbstract<any>[]> {
    const results = await PerguntaDAO.findAll();
    return results.map((result) => {
      if (result.tipo === "Disertativa")
        return new PerguntaDisertativa(result.id, result.enunciado);
      else
        return new PerguntaObjetiva(
          result.id,
          result.enunciado,
          result.alternativa1,
          result.alternativa2
        );
    });
  }

  public static async criarPergunta(
    pergunta: IPerguntaObjetiva | IPerguntaDisertativa
  ) {
    const id = await PerguntaDAO.create(pergunta);
    if (pergunta.tipo === "Objetiva")
      return new PerguntaObjetiva(
        id,
        pergunta.enunciado,
        pergunta.alternativa1,
        pergunta.alternativa2
      );
    else {
      return new PerguntaDisertativa(id, pergunta.enunciado);
    }
  }
}
