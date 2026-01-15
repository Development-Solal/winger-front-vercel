// schemas/registerSchema.ts
import { z } from "zod";

export const getFormSchemaRegisterParticulier = (t: (key: string) => string) =>
  z.object({
    profile_pic: z.custom<File | string | Blob>(
      val => typeof val === "string" || val instanceof File || val instanceof Blob,
      {
        message: t("formError.images"),
      }
    ),
    first_name: z.string().min(2, {
      message: t("formError.first_name"),
    }),
    age: z.string({
      required_error: t("formError.age"),
    }),
    closest_town: z.union([
      z.string().min(1, { message: t("formError.closest_town") }),
      z.number(),
    ]),
    profile_type: z.string().min(2, {
      message: t("formError.profile_type"),
    }),
    // aidant_is_aide: z.enum(["oui", "non", "peut-etre"], {
    //   required_error: t("formError.aidant_is_aide"),
    // }),
    age_terms: z.literal(true, {
      errorMap: () => ({ message: t("formError.age_terms") }),
    }),
    accept_terms_cgv: z.literal(true, {
      errorMap: () => ({ message: t("formError.accept_terms_cgv") }),
    }),
    accept_terms_poc: z.literal(true, {
      errorMap: () => ({ message: t("formError.accept_terms_poc") }),
    }),
    newsletter_terms: z.boolean().optional().default(false),
    push_notification_terms: z.boolean().optional().default(false),
    
  });

export const getFormSchemaRegisterParticulier2 = (t: (key: string) => string) =>
  z.object({
      profile_type: z.string().min(2, {
        message: t("formError.profile_type"),
      }),
      last_name: z.string().min(2, {
        message: t("formError.last_name"),
      }),
      commune: z.union([z.string().min(1, t("formError.commune")), z.number()]),
      email: z.string().email({
        message: t("formError.email"),
      }),
      confirm_email: z.string().email({
        message: t("formError.confirm_email"),
      }),
      password: z.string().min(6, {
        message: t("formError.password"),
      }),
      confirm_password: z.string().min(6, {
        message: t("formError.confirm_password"),
      }),
    })
    .refine(data => data.password === data.confirm_password, {
      path: ["confirm_password"],
      message: t("formError.password_check"),
    })
    .refine(data => data.email === data.confirm_email, {
      path: ["confirm_email"],
      message: t("formError.email_check"),
    });

export const getFormSchemaRegisterPro = (t: (key: string) => string) =>
    z.object({
  profile_pic: z
    .custom<File>(file => file instanceof File, {
      message: t("formError.images"),
    })
    .refine(file => file?.size > 0, {
      message: t("formError.images2"),
    }),
  first_name: z.string().min(2, {
    message: t("formError.first_name"),
  }),
  last_name: z.string().min(2, {
    message: t("formError.last_name"),
  }),
  profile_type: z.string().min(2, {
    message: t("formError.profile_type"),
  }),
  company_name: z.string().min(2, {
    message: t("formError.company_name"),
  }),
  closest_town: z.union([z.string().min(1, t("formError.closest_town")), z.number()]),
  company_id: z.string().min(2, {
    message: t("formError.company_id"),
  }),
  company_description: z.string().min(2, {
    message: t("formError.company_description"),
  }),
  email: z.string().email({
    message: t("formError.email"),
  }),
  confirm_email: z.string().email({
    message: t("formError.confirm_email"),
  }),
  password: z.string().min(6, {
    message: t("formError.password"),
  }),
  confirm_password: z.string().min(6, {
    message: t("formError.confirm_password"),
  }),
  age_terms: z.literal(true, {
      errorMap: () => ({ message: t("formError.age_terms") }),
    }),
    accept_terms_cgv: z.literal(true, {
      errorMap: () => ({ message: t("formError.accept_terms_cgv") }),
    }),
    accept_terms_poc: z.literal(true, {
      errorMap: () => ({ message: t("formError.accept_terms_poc") }),
    }),
    newsletter_terms: z.boolean().optional().default(false),
    push_notification_terms: z.boolean().optional().default(false),
})
.refine(data => data.password === data.confirm_password, {
  path: ["confirm_password"],
  message: t("formError.password_check"),
})
.refine(data => data.email === data.confirm_email, {
  path: ["confirm_email"],
  message: t("formError.email_check"),
});

export const getFormSchemaRegisterAide= (t: (key: string) => string) =>
z.object({
  profile_pic: z.any(),
  gender: z.enum(["homme", "femme"], {
    required_error: t("formError.option"),
  }),
  name: z.string().min(2, {
    message: t("formError.first_name"),
  }),
  age: z.string({
    required_error: t("formError.age"),
  }),
  closest_town: z.union([z.string().min(1, t("formError.closest_town")), z.number()]),
  commune: z.union([z.string().min(1, t("formError.commune")), z.number()]),
  aidant_relation: z.enum(["ami", "famille", "travail", "pro", "autre"], {
    required_error: t("formError.option"),
  }),
});

export const getFormSchemaRegisterFM= (t: (key: string) => string) =>
z.object({
  FMgender: z.enum(["homme", "femme"], {
    required_error: t("formError.option"),
  }),
  FMage: z.array(z.string()).min(1, t("formError.age_fm")),
  FMtown: z.array(z.string()).min(1, t("formError.closest_town")),
  FMorigine: z.any().optional(),
  FMnationality: z.any().optional(),
  FMlanguage: z.array(z.any()).optional(),
  FMreligion: z.array(z.string()).optional(),
  FMeducation: z.array(z.string()).optional(),
  FMheight: z.any().optional(),
  FMsilhouette: z.any().optional(),
  FMsmoker: z.any().optional(),
  FMtatoo: z.any().optional(),
  FMkids: z.any().optional(),
  FMpassions: z.array(z.string()).optional(),
  FMdescription: z.string().optional(),
});

