import { z } from "zod";

export const getFormSchemaEditAidant= (t: (key: string) => string) =>
z.object({
  profile_pic: z.any().optional(),
  first_name: z.string().min(2, {
    message: t("formError.first_name"),
  }),
  age: z.string({
    required_error:  t("formError.age"),
  }),
  closest_town: z.union([z.string().min(1, ("formError.closest_town") ), z.number()]),
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
  // aidant_is_aide: z.enum(["oui", "non", "peut-etre"], {
  //   required_error:  t("formError.aidant_is_aide"),
  // }),
});

export const getFormSchemaEditAidantPro= (t: (key: string) => string) =>
 z.object({
  profile_pic: z.any().optional(),

  first_name: z.string().min(2, {
    message: t("formError.first_name"),
  }),
  last_name: z.string().min(2, {
    message: t("formError.last_name"),
  }),
  company_name: z.string().min(2, {
    message: t("formError.company_name"),
  }),
  profile_type: z.string().min(2, {
    message: t("formError.profile_type"),
  }),
  closest_town: z.union([z.string().min(1,t("formError.closest_town")), z.number()]),
  company_id: z.string().min(2, {
    message: t("formError.company_id"),
  }),
  company_description: z.string().min(2, {
    message: t("formError.company_description"),
  }),
  email: z.string().email({
    message: t("formError.email"),
  }),
});

export const getFormSchemaEditAide= (t: (key: string) => string) =>
z.object({
  profile_pic: z.any().optional(),
  aidant_is_aide: z.enum(["non", "oui" ,"peut-etre"]),
  gender: z.string({
    required_error: t("formError.gender"),
  }),
  name: z.string().min(2, {
    message: t("formError.first_name"),
  }),
  age: z.string({
    required_error: t("formError.age"),
  }),
  closest_town: z.union([z.string().min(1, t("formError.closest_town")), z.number()]),
  commune: z.union([z.string().min(1, t("formError.commune")), z.number()]),
  aidant_relation: z.string({
    required_error: t("formError.option"),
  }),
  origine: z.string().optional(),
  nationality: z.union([z.string().optional(), z.number().optional()]),
  language: z.union([z.any().optional(), z.any().optional()]),
  religion: z.string().optional(),
  education: z.string().optional(),
  height: z.string().optional(),
  silhouette: z.string().optional(),
  smoker: z.string().optional(),
  tatoo: z.string().optional(),
  kids: z.array(z.string()).optional(),
  passions: z.array(z.string()).optional(),
  description: z.string().max(1000, {
  message: "La description ne peut pas dépasser 1000 caractères"
}).optional(),
});

export const getFormSchemaEditFM= (t: (key: string) => string) =>
z.object({
  FMgender: z.string({
    required_error: t("formError.gender"),
  }),
  FMage: z.array(z.string()).min(1, t("formError.age")),
  FMtown: z.array(z.string()).min(1, t("formError.closest_town")),
  FMorigine: z.any().optional(),
  FMnationality: z.any().optional(),
  FMlanguage: z.any().optional(),
  FMreligion: z.any().optional(),
  FMeducation: z.any().optional(),
  FMheight: z.any().optional(),
  FMsilhouette: z.any().optional(),
  FMsmoker: z.any().optional(),
  FMtatoo: z.any().optional(),
  FMkids: z.any().optional(),
  FMpassions: z.array(z.string()).optional(),
  FMdescription: z.string().optional(),
});