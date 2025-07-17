import { z } from "zod";

export const vehicleSchema = z.object({
  make: z.string().min(2, "La marque est requise"),
  model: z.string().min(2, "Le modèle est requis"),
  plate: z.string().min(3).max(10, "Immatriculation invalide"),
  pricePerDay: z.number().positive("Le prix doit être supérieur à 0"),
  status: z.enum(["available", "rented", "maintenance"]),
  images: z
    .array(
      z.object({
        url: z.string().url("URL invalide"),
      })
    )
    .min(1, "Ajoutez au moins une image"),
});
export type Vehicle = z.infer<typeof vehicleSchema>;
