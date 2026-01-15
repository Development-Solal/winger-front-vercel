import * as z from "zod";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, MapPin, UserRound} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import Logo from "../../assets/Logo/logo-blanc.png";
import ProgressBar1 from "../../assets/Register/progress-bar-1.png";
import Background1 from "../../assets/Register/background-1.png";
import {useEffect, useRef, useState} from "react";
import {CreateAidantService} from "@/services/AidantService";
import {useUser} from "@/context/AuthContext";
import {loadOptionsCommunes} from "@/services/ListService";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import {Spinner} from "@/components/ui/spinner";
import toast from "react-hot-toast";
import {useFormContext} from "@/context/FormContext";
import {base64ToFile} from "@/utils/utilts";
import {getFormSchemaRegisterParticulier2} from "@/schemas/registerSchema";
import {useTranslation} from "react-i18next";

const Register2: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const formSchema = getFormSchemaRegisterParticulier2(t);

  const {formDataAidantPar, setFormDataAidantPar, clearFormDataAidantPar} = useFormContext();
  const {setUser} = useUser();

  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDataAidantPar, // Load saved values
  });

  const watchedValues = useWatch({control: form.control});

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedCommune, setSelectedCommune] = useState<string>();

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

  useEffect(() => {
    setSelectedCommune(formDataAidantPar.commune_name);
  }, [formDataAidantPar.commune_name]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormDataAidantPar((prev: any) => ({
      ...prev,
      ...watchedValues,
      commune_name: selectedCommune ?? formDataAidantPar.commune_name,
      profile_type: "Particulier",
      step: 1,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues, setFormDataAidantPar]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log("📋 Form data before submit:", formDataAidantPar);
  console.log("📋 Checkbox values:", {
    cgv: formDataAidantPar.accept_terms_cgv,
    privacy: formDataAidantPar.accept_terms_poc,
    age: formDataAidantPar.age_terms,
    newsletter: formDataAidantPar.newsletter_terms,
    push: formDataAidantPar.push_notification_terms
  });
    const formData = new FormData();

    const updatedData = {
      ...formDataAidantPar,
      step: 1,
    };

    Object.entries(updatedData).forEach(([key, value]) => {
      if (key === "profile_pic" && value != null) {
        formData.append(key, base64ToFile(value as string, "profile-pic.png"));
      } else if (key === 'email') {
          formData.append(key, (value as string)?.trim().toLowerCase());
      } else {
        formData.append(key, value as string);
      }
    });

    const gdprConsents = {
  cgv: formDataAidantPar.accept_terms_cgv === true,
  privacy_policy: formDataAidantPar.accept_terms_poc === true,
  age_18: formDataAidantPar.age_terms === true,
  newsletter: formDataAidantPar.newsletter_terms === true,  
  push: formDataAidantPar.push_notification_terms === true   
};

formData.append("gdprConsents", JSON.stringify(gdprConsents));  

    CreateAidantService(formData)
      .then(res => {
        const {id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant} =
          res.user;
        setUser({id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant});
        localStorage.setItem("user_id", id.toString());

        setErrorMsg("");
        setIsLoading(false);
        toast.success("Aidant créée avec succès.");
        navigate("/verify-email");
        clearFormDataAidantPar();
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
        setErrorMsg(err?.response?.data?.message);
      });
    return updatedData;
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
          <p className="text-md mb-6 font-quicksand_regular text-center">{t("forms.private_info")}</p>
          <Form {...form}>
            <form
                ref={formRef}
                onSubmit={e => {
                  e.preventDefault();
                  console.log("Form submission triggered!");

                  form.handleSubmit(onSubmit, onError)(e);
                }}
                className="space-y-6">
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
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                      </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="commune"
                  render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <CustomAsyncSelect
                                value={
                                  field.value
                                      ? {value: String(field.value), label: String(selectedCommune || field.value)}
                                      : null
                                }
                                loadOptions={loadOptionsCommunes}
                                onChange={selected => {
                                  field.onChange(selected?.value || "");
                                  setSelectedCommune(selected?.label || "");
                                }}
                                placeholder={t("forms.commune_aidant") + "*"}
                                page={1}
                                icon={<MapPin size={18} className="text-dark-pink"/>}
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                      </FormItem>
                  )}
              />
              <p className="text-light-blue text-xs">{t("forms.private_field")}</p>

              <FormField
                  control={form.control}
                  name="email"
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
                                title={t("forms.email_aidant")}
                                placeholder={t("forms.email_aidant")}
                                className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                title={t("forms.password")}
                                type={showPassword ? "text" : "password"}
                                placeholder={t("forms.password")}
                                className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}>
                              {showPassword ? (
                                  <Eye className="text-dark-pink" size={20}/>
                              ) : (
                                  <EyeOff className="text-dark-pink" size={20}/>
                              )}
                            </div>
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                title={t("forms.confirm_password")}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder={t("forms.confirm_password")}
                                className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                              {showConfirmPassword ? (
                                  <Eye className="text-dark-pink" size={20}/>
                              ) : (
                                  <EyeOff className="text-dark-pink" size={20}/>
                              )}
                            </div>
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                      </FormItem>
                  )}
              />

              {/* Error Msg */}
              {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}
              {/* Submit Button */}

              <div className="mt-8 flex items-center justify-between w-full">
                {/* Left - Précédent */}
                <div className="flex items-center gap-4">
                  <span className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.previous")}</span>
                  <Link
                      to="/register/particulier/1"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                    <ArrowLeft className="text-white" strokeWidth={4} size={18}/>
                  </Link>
                </div>

                {/* Right - Suivant */}
                <div className="flex items-center gap-4">
                  <span className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.next")}</span>
                  {!isLoading ? (
                      <Button
                          type="submit"
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                        <ArrowRight className="text-white" strokeWidth={4} size={28}/>
                      </Button>
                  ) : (
                      <Spinner/>
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

export default Register2;
