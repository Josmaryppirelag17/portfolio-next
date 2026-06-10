import { z } from "zod";

const MIN_FORM_AGE_MS = 3_000;
const MAX_FORM_AGE_MS = 3_600_000;

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name cannot be empty")
    .max(120, "Name cannot exceed 120 characters")
    .trim(),
  email: z
    .string()
    .min(1, "Email cannot be empty")
    .max(200, "Email cannot exceed 200 characters")
    .email("Invalid email format")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(1, "Message cannot be empty")
    .max(5000, "Message cannot exceed 5000 characters")
    .trim(),
  fax: z.string().optional(),
  website: z.string().optional(),
  formTimestamp: z
    .number({ message: "Invalid timestamp" })
    .positive("Timestamp must be positive"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function isFormTimestampValid(timestamp: number): { valid: boolean; reason?: string } {
  const now = Date.now();
  const age = now - timestamp;

  if (age < 0) {
    return { valid: false, reason: "Form timestamp is in the future" };
  }
  if (age < MIN_FORM_AGE_MS) {
    return { valid: false, reason: "Form submitted too quickly (possible bot)" };
  }
  if (age > MAX_FORM_AGE_MS) {
    return { valid: false, reason: "Form expired. Please reload the page." };
  }
  return { valid: true };
}

export function formatZodErrors(errors: z.ZodError): string[] {
  return errors.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  });
}

export class ValidationService {
  static isFormTimestampValid = isFormTimestampValid;
  static formatZodErrors = formatZodErrors;
}
