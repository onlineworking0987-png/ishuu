import { z } from "zod";

export const contactSubmissionSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(320),
  organizationName: z.string().trim().min(1).max(160),
  jobTitle: z.string().trim().min(1).max(120),
  numberOfEmployees: z.string().trim().min(1).max(32),
  location: z.string().trim().min(1).max(8),
  phoneNumber: z.string().trim().min(1).max(40),
  message: z.string().trim().min(1).max(5000),
  services: z.array(z.string().trim().min(1).max(60)).min(1).max(20),
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;

export type ContactSubmission = ContactSubmissionInput & {
  _id: string;
  createdAt: string;
};

