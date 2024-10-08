import { z, ZodError } from 'zod';

export class SuperUserValidator {
  // Esquema de validación para el registro de SuperUser
  private static RegisterSchema = z.object({
    fullname: z.string().min(1, "El nombre completo es requerido"),
    email: z.string().email("El correo electrónico no es válido").min(1, "El correo electrónico es requerido"),
    password: z.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "La contraseña debe contener al menos un carácter especial")
      .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
      .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula"),
  });

  // Esquema de validación para el inicio de sesión de SuperUser
  private static LoginSchema = z.object({
    email: z.string().email("El correo electrónico no es válido").min(1, "El correo electrónico es requerido"),
  });

  // Método de validación para el registro de SuperUser
  static validateRegister(input: any) {
    try {
      this.RegisterSchema.parse(input);
      return { valid: true, errors: [] }; 
    } catch (error) {
      if (error instanceof ZodError) {
        return { valid: false, errors: error.errors }; 
      } else {
        console.error("An unexpected error occurred:", error);
        return { valid: false, errors: ["An unexpected error occurred"] };
      }
    }
  }

  // Método de validación para el inicio de sesión de SuperUser
  static validateLogin(input: any) {
    try {
      this.LoginSchema.parse(input);
      return { valid: true, errors: [] }; 
    } catch (error) {
      if (error instanceof ZodError) {
        return { valid: false, errors: error.errors }; 
      } else {
        console.error("An unexpected error occurred:", error);
        return { valid: false, errors: ["An unexpected error occurred"] }; 
      }
    }
  }
}
