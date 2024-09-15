import z from "zod";

const PHONE_REGEX = /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/;
// const NAME_REGEX = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi;
const NAME_REGEX = /^[A-Za-zÀ-ú\s]+$/;

export const signUpFormSchema = z.object({
  name: z
    .string({
      invalid_type_error: "O nome precisa ser apenas texto",
      required_error: "Nome é obrigatório",
    })
    .regex(NAME_REGEX, "Apenas letras são permitidas"),
  email: z
    .string({
      invalid_type_error: "O nome precisa ser apenas texto",
      required_error: "E-mail é obrigatório",
    })
    .email("Forneça um E-mail válido"),
  phone: z
    .string({ required_error: "Telefone é obrigatório" })
    .regex(PHONE_REGEX, "Forneça um número de telefone válido"),
  password: z
    .string({ required_error: "Senha é obrigatório" })
    .trim()
    .min(6, "Sua senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string({ required_error: "Confirme sua senha" }),
});

export const loginFormSchema = z.object({
  email: z
    .string({
      invalid_type_error: "O nome precisa ser apenas texto",
      required_error: "Campo obrigatório",
    })
    .email("Forneça um E-mail válido"),
  password: z
    .string({ required_error: "Forneça sua senha" })
    .trim()
    .min(6, "Sua senha deve ter no mínimo 6 caracteres"),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, { message: "O nome é obrigatório" })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" }),

  email: z
    .string()
    .email({ message: "Formato de e-mail inválido" })
    .min(1, { message: "O e-mail é obrigatório" }),

  phone: z
    .string({ required_error: "Telefone é obrigatório" })
    .regex(PHONE_REGEX, "Forneça um número de telefone válido"),

  location: z
    .string({
      required_error: "Preencha sua localização",
    })
    .min(1, { message: "A localização é obrigatória" })
    .max(200, { message: "Sua localização deve ter no máximo 200 caracteres" })
    .trim(),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type UpdateProfileSchema = z.infer<typeof updateProfileSchema>;
