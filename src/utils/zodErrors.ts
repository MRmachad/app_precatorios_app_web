import { ZodErrorMap } from "zod";

export const errorMap: ZodErrorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
      case "invalid_type":
        message = `Tipo inválido: esperado ${issue.expected} para o campo [${issue.path}]`;
        break;
      case "invalid_literal":
        message = `Valor inválido: esperado literal ${issue.expected}`;
        break;
      case "custom":
        message = `Erro customizado: ${issue.message}`;
        break;
      case "invalid_union":
        message = "Entrada inválida";
        break;
      case "invalid_union_discriminator":
        message = `Discriminador inválido: esperados ${issue.options.join(", ")}`;
        break;
      case "invalid_enum_value":
        message = `Valor inválido: esperado ${issue.options.join(", ")}, recebido ${issue.received}`;
        break;
      case "unrecognized_keys":
        message = `Chaves não reconhecidas: ${issue.keys.join(", ")}`;
        break;
      case "invalid_arguments":
        message = "Argumentos inválidos";
        break;
      case "invalid_return_type":
        message = "Tipo de retorno inválido";
        break;
      case "invalid_date":
        message = "Data inválida";
        break;
      case "invalid_string":
        if (issue.validation === "email") {
          message = "Email inválido";
        } else if (issue.validation === "url") {
          message = "URL inválida";
        } else if (issue.validation === "uuid") {
          message = `Opção inválida para o campo ${issue.path}`;
        } else {
          message = "String inválida";
        }
        break;
      case "too_small":
        message = `Mínimo de ${issue.minimum} caracteres para o campo [${issue.path}]`;
        break;
      case "too_big":
        message = `Valor muito grande: máximo ${issue.maximum}, recebido ${_ctx.data}`;
        break;
      case "invalid_intersection_types":
        message = "Tipos de interseção inválidos";
        break;
      case "not_multiple_of":
        message = `Valor não é múltiplo de ${issue.multipleOf}`;
        break;
      case "not_finite":
        message = "Número não é finito";
        break;
      default:
        message = "Erro inválido";
        break;
    }
    return { message };
  };