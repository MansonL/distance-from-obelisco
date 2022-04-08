import joi from "joi";
import { IAddressQuery } from "../types";

export const addressSchema: joi.ObjectSchema<IAddressQuery> =
  joi.object<IAddressQuery>({
    calle: joi.string().min(3).required().messages({
      "string.empty": "El campo 'calle' está incompleto.",
      "string.min": "El nombre de la calle es demasiado corto.",
    }),
    altura: joi.number().min(0).max(99999).required().messages({
      "number.base": "La altura de la calle debe estar entre 0 y 99999.",
      "number.min": "La altura de la calle no puede ser menor a 0.",
      "number.max": "La altura de la calle no puede ser mayor a 99999.",
    }),
    provincia: joi.string().min(2).required().messages({
      "string.empty": "El campo 'provincia' está incompleto.",
      "string.min": "El nombre de la 'provincia' es demasiado corto.",
    }),
    departamento: joi.string().min(1).optional(),
  });
