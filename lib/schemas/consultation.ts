import { contactBaseSchema } from "./contact-base";

export const consultationSchema = contactBaseSchema;

export type ConsultationFormData = typeof consultationSchema._type;
