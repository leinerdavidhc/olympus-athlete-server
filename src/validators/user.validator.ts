import { z, ZodError } from 'zod';

export class UserValidator {
  // Esquema de validación para el registro de usuario
  private static RegisterSchema = z.object({
    fullname: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter"),
    sexo: z.union([
      z.literal("Male"),
      z.literal("Female")
    ]).refine(val => ["Male", "Female"].includes(val), {
      message: "Invalid gender"
    }),
    height: z.number().positive("Height must be a positive number").min(0, "Height is required"),
    weight: z.number().positive("Weight must be a positive number").min(0, "Weight is required"),
  });

  // Método de validación para el registro de usuario
  static validateUserRegister = (user: any) => {
    try {
      this.RegisterSchema.parse(user);
      return { valid: true, errors: [] };
    } catch (error) {
      if (error instanceof ZodError) {
        return { valid: false, errors: error.errors }; 
      } else {
        console.error("An unexpected error occurred:", error);
        return { valid: false, errors: ["An unexpected error occurred"] }; 
      }
    }
  };

  // Esquema de validación para el inicio de sesión
  private static LoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
  });

  // Método de validación para el inicio de sesión
  static validateUserLogin = (user: any) => {
    try {
      this.LoginSchema.parse(user);
      return { valid: true, errors: [] }; 
    } catch (error) {
      if (error instanceof ZodError) {
        return { valid: false, errors: error.errors }; 
      } else {
        console.error("An unexpected error occurred:", error);
        return { valid: false, errors: ["An unexpected error occurred"] };
      }
    }
  };
}
