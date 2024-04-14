import z from "zod";

const PHONE_REGEX = /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/;
const NAME_REGEX = /^[A-Za-z]+$/i;

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
  confirmPassword: z.string(),
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

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
