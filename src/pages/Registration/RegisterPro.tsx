import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Eye,
  EyeOff,
  LockIcon,
  LockKeyhole,
  Mail,
  MapPin,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import {useEffect, useRef, useState} from "react";

import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {Textarea} from "@/components/ui/textarea";
import {useNavigate} from "react-router-dom";

import Logo from "../../assets/Logo/logo-blanc.png";
import ProgressBar1 from "../../assets/Register/progress-bar-1.png";
import Background1 from "../../assets/Register/background-1.png";
import {Button} from "@/components/ui/button";
import {CreateAidantProService} from "@/services/AidantService";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import {loadOptionsTowns} from "@/services/ListService";
import {useUser} from "@/context/AuthContext";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner";
import CropModal from "@/components/modals/CropModal";
import {useFormContext} from "@/context/FormContext";
import {getFormSchemaRegisterPro} from "@/schemas/registerSchema";
import {useTranslation} from "react-i18next";
import {Checkbox} from "@/components/ui/checkbox";

const Register3: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const formSchema = getFormSchemaRegisterPro(t);

  const {setUser} = useUser();
  const {clearFormData} = useFormContext();

  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_type: "Professionnel",
      first_name: "",
      last_name: "",
      email: "",
      confirm_email: "",
      password: "",
      confirm_password: "",
      closest_town: "",
      company_name: "",
      company_id: "",
      company_description: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null); // State for the image preview
  const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedTown, setSelectedTown] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, []);

  useEffect(() => {
    const firstErrorKey = Object.keys(form.formState.errors)[0];

    if (firstErrorKey && formRef.current) {
      const errorElement = formRef.current.querySelector(`[name="${firstErrorKey}"]`);

      if (logoRef.current && firstErrorKey == "profile_pic") {
        logoRef.current.scrollIntoView({behavior: "smooth", block: "start"});
      }
      if (errorElement) {
        errorElement.scrollIntoView({behavior: "smooth", block: "center"});
        (errorElement as HTMLElement).focus();
      }
    }
  }, [form.formState.errors]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "profile_pic" && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'email') {
          formData.append(key, (value as string)?.trim().toLowerCase());
      } else if (
        // Skip GDPR fields, we'll add them separately as JSON
        key !== "accept_terms_cgv" && 
        key !== "accept_terms_poc" && 
        key !== "age_terms" && 
        key !== "newsletter_terms" && 
        key !== "push_notification_terms"
      ) {
        formData.append(key, value as string);
      }
    });

    // ✅ Add GDPR consents as JSON
    const gdprConsents = {
      cgv: values.accept_terms_cgv === true,
      privacy_policy: values.accept_terms_poc === true,
      age_18: values.age_terms === true,
      newsletter: values.newsletter_terms === true,
      push: values.push_notification_terms === true
    };

    formData.append("gdprConsents", JSON.stringify(gdprConsents));

    CreateAidantProService(formData)
      .then(res => {
        const {id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant} =
          res.user;
        setUser({id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant});
        localStorage.setItem("user_id", id.toString());
        setIsLoading(false);

        setErrorMsg("");
        clearFormData();
        toast.success("Aidant pro créée avec succès.");
        navigate("/verify-email");
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setErrorMsg(err?.response?.data?.message);
      });
  }

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
  };

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{backgroundImage: `url(${Background1})`}}>
      <div className="mx-auto max-w-2xl">
        {/* Logo and title */}
        <div className="flex flex-col items-center space-y-2">
          <img src={Logo} alt="Logo" className="flex w-50 h-56" />
          <p ref={logoRef} className="text-center text-4xl md:text-5xl font-freestyle  text-white">
            {t("registration.title")}
          </p>
        </div>

        {/* Progress indicator */}
        <div className="relative mx-auto flex max-w-xl items-center justify-between">
          <img src={ProgressBar1} alt="Progress0" className="flex" />
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">{t("registration.aidant")}</h2>
          <p className="text-md mb-6 font-quicksand_regular text-center">{t("forms.public_info")}</p>

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={e => {
                e.preventDefault();
                console.log("Form submission triggered!");

                form.handleSubmit(onSubmit, onError)(e);
              }}
              className="space-y-6">
              {/* Profile Image Upload */}
              <FormField
                control={form.control}
                name="profile_pic"
                render={() => {
                  return (
                    <FormItem>
                      <div className="text-center">
                        <span className="text-logo-red font-bold xl:text-md">{t("forms.image")} *</span>
                        <div className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1">
                          <label
                            htmlFor="profileImageInput"
                            className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden">
                            {preview ? (
                              <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                              <UserRoundPlus className="h-12 w-12 text-white" />
                            )}
                          </label>
                          <input
                            id="profileImageInput"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const imageUrl = URL.createObjectURL(file);
                                setTempImage(imageUrl);
                                e.target.value = "";
                              }
                            }}
                          />
                        </div>
                      </div>
                      <FormMessage className="text-logo-red font-bold xl:text-md" />
                    </FormItem>
                  );
                }}
              />

              {tempImage && (
                <CropModal
                  imageSrc={tempImage}
                  onClose={() => setTempImage(null)}
                  onCropComplete={(croppedFile, croppedPreview) => {
                    form.setValue("profile_pic", croppedFile);
                    setPreview(croppedPreview);
                    setTempImage(null);
                  }}
                />
              )}

              {/* Form Fields */}
              <FormField
                control={form.control}
                name="first_name"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <UserRound
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          title={t("forms.first_name_aidant") + "*"}
                          placeholder={t("forms.first_name_aidant") + "*"}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>

                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="last_name"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <UserRound
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          title={t("forms.last_name_aidant") + "*"}
                          placeholder={t("forms.last_name_aidant") + "*"}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Briefcase
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          title={t("forms.company_name") + "*"}
                          placeholder={t("forms.company_name") + "*"}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closest_town"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomAsyncSelect
                          value={
                            field.value
                              ? {value: String(field.value), label: String(selectedTown || field.value)}
                              : null
                          }
                          loadOptions={loadOptionsTowns}
                          onChange={selected => {
                            field.onChange(selected?.value || "");
                            setSelectedTown(selected?.label || "");
                          }}
                          placeholder={t("forms.closest_town_aidant") + "*"}
                          page={1}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_id"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Briefcase
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          title={t("forms.company_id") + "*"}
                          placeholder={t("forms.company_id") + "*"}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_description"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Textarea
                          title={t("forms.company_description")}
                          placeholder={t("forms.company_description")}
                          className="resize-y "
                          {...field}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink" size={20} />
                        <Input
                          {...field}
                          title={t("forms.email_aidant")}
                          placeholder={t("forms.email_aidant")}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_email"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2  text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          title={t("forms.confirm_email_aidant")}
                          placeholder={t("forms.confirm_email_aidant")}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <LockKeyhole
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("forms.password")}
                          title={t("forms.password")}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye className="text-dark-pink" size={20} />
                          ) : (
                            <EyeOff className="text-dark-pink" size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <LockKeyhole
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t("forms.confirm_password")}
                          title={t("forms.confirm_password")}
                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                        />
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                          {showConfirmPassword ? (
                            <Eye className="text-dark-pink" size={20} />
                          ) : (
                            <EyeOff className="text-dark-pink" size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* COOKIE CONDITION */}
              <div className="rounded-md border p-4 bg-white shadow-sm space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LockIcon className="w-5 h-5 text-yellow-500" />
                  Consentements et préférences
                </h3>

                {/* Required checkbox age*/}
                <FormField
                  control={form.control}
                  name="accept_terms_cgv"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={false}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm leading-snug">
                        <div className="flex flex-wrap items-center gap-2 -mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                            REQUIS
                          </span>
                          <span>
                            J’ai lu et j’accepte les{" "}
                            <a href="/cgv" target="_blank" className="text-blue-600 underline">
                              Conditions Générales de Vente
                            </a>{" "}
                          </span>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="accept_terms_poc"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={false}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm leading-snug">
                        <div className="flex flex-wrap items-center gap-2 -mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                            REQUIS
                          </span>
                          <span>
                            J’ai pris connaissance de la{" "}
                            <a
                              href="/politiques-de-confidentialite"
                              target="_blank"
                              className="text-blue-600 underline">
                              Politique de confidentialité
                            </a>{" "}
                          </span>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age_terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={false}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm leading-snug">
                        <div className="flex flex-wrap items-center gap-2 -mt-1">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                            REQUIS
                          </span>
                          <span>Je déclare que l'Aidant(e) et les Aidé(e)s ont + de 18 ans</span>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newsletter_terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={false}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm leading-snug">
                        <div className="flex flex-wrap items-center gap-2 -mt-1">
                          <span className="text-xs bg-green-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                            Optionnels
                          </span>
                          <span>Newsletter e-mail (WINGer) — J’accepte de recevoir la newsletter</span>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="push_notification_terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <FormControl>
                        <Checkbox
                          defaultChecked={false}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-1 text-sm leading-snug">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 -mt-1">
                          <span className="text-xs bg-green-100 text-blue-800 px-2 py-0.5 rounded-sm font-semibold">
                            Optionnels
                          </span>
                          <span>
                            Notifications push — J’accepte de recevoir des notifications push sur mon smartphone via
                            l’App Mobile WINGer. Retrait possible à tout moment sur votre smartphone.
                          </span>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Auto checkbox */}
                {/* <div className="flex flex-col sm:flex-row items-start gap-2 mt-2">
                  <Checkbox checked disabled />
                  <div className="text-sm leading-snug flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-sm font-semibold">
                      AUTO
                    </span>
                    <span>
                      Cookies essentiels au fonctionnement du site
                      <span className="text-xs text-gray-600 ml-1">(authentification, sécurité)</span>
                    </span>
                  </div>
                </div> */}
              </div>

              {/* Error Msg */}
              {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

              {/* Submit Button */}
              <div className="mt-8 flex items-center justify-between w-full">
                {/* Left - Précédent */}
                <div className="flex items-center gap-4">
                  <span className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.previous")}</span>
                  <Link
                    to="/register"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                    <ArrowLeft className="text-white" strokeWidth={4} size={18} />
                  </Link>
                </div>

                {/* Right - Suivant */}
                <div className="flex items-center gap-4">
                  <span className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.next")}</span>
                  {!isLoading ? (
                    <Button
                      type="submit"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                      <ArrowRight className="text-white" strokeWidth={4} size={28} />
                    </Button>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register3;
