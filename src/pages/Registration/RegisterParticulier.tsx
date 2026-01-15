import * as z from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Cake, LockIcon, MapPin, UserRound, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/Logo/logo-blanc.png";
import ProgressBar1 from "../../assets/Register/progress-bar-1.png";
import Background1 from "../../assets/Register/background-1.png";
import { useEffect, useRef, useState } from "react";
import { getAllLists, loadOptionsTowns } from "@/services/ListService";
import { ListModel } from "@/models/ListModel";
import { CustomAsyncSelect } from "@/components/ui/custom-async-select";

import CropModal from "@/components/modals/CropModal";
import { useFormContext } from "@/context/FormContext";
import { useTranslation } from "react-i18next";
import { getFormSchemaRegisterParticulier } from "@/schemas/registerSchema";
import { Checkbox } from "@/components/ui/checkbox";

const Register2: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formSchema = getFormSchemaRegisterParticulier(t);

  const { formDataAidantPar, setFormDataAidantPar } = useFormContext();

  const logoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDataAidantPar, // Load saved values
  });
  const watchedValues = useWatch({ control: form.control });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [preview, setPreview] = useState<any>(formDataAidantPar?.profile_pic); // State for the image preview
  const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview
  const [errorMsg, setErrorMsg] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const [ageList, setAgeList] = useState([]);
  const [selectedTown, setSelectedTown] = useState<string>();

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const firstErrorKey = Object.keys(form.formState.errors)[0];
    if (firstErrorKey && formRef.current) {
      const errorElement = formRef.current.querySelector(`[name="${firstErrorKey}"]`);

      if (logoRef.current && firstErrorKey == "profile_pic") {
        logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        (errorElement as HTMLElement).focus();
      }
    }
  }, [form.formState.errors]);

  useEffect(() => {
    getAllLists()
      .then((res) => {
        setAgeList(res.ageList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setSelectedTown(formDataAidantPar.closest_town_name);
  }, [formDataAidantPar.closest_town_name]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormDataAidantPar((prev: any) => ({
      ...prev,
      ...watchedValues,
      profile_pic: watchedValues.profile_pic ? preview : null,
      closest_town_name: selectedTown ?? formDataAidantPar.closest_town_name,
      step: 1,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues, setFormDataAidantPar, preview]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setIsLoading(true);
    // const formData = new FormData();

    // Object.entries(values).forEach(([key, value]) => {
    //   if (key === "profile_pic" && value instanceof File) {
    //     formData.append(key, value);
    //   } else {
    //     formData.append(key, value as string);
    //   }
    // });

    // CreateAidantService(formData)
    //   .then(res => {
    //     const {id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant} =
    //       res.user;
    //     setUser({id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant});
    //     localStorage.setItem("user_id", id.toString());

    //     setErrorMsg("");
    //     setIsLoading(false);
    //     toast.success("Aidant créée avec succès.");
    //     navigate("/verify-email");
    //     clearFormDataParticulier();
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     setIsLoading(false);
    //     setErrorMsg(err?.response?.data?.message);
    //   });
    navigate("/register/particulier/2"); // Go to next step
    setErrorMsg("");
    console.log(values);
  }

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
  };

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background1})` }}>
      {/* Back button */}

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
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue"> {t("registration.aidant")}</h2>
          <p className="text-md mb-6 font-quicksand_regular text-center">{t("forms.public_info")}</p>

          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submission triggered!");

                form.handleSubmit(onSubmit, onError)(e);
              }}
              className="space-y-6">
              {/* Profile Image Upload */}
              <FormField
                control={form.control}
                name="profile_pic"
                render={() => (
                  <FormItem>
                    <div className="text-center">
                      <span className=" text-logo-red font-bold xl:text-md">{t("forms.image")} *</span>
                      <div className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1 ">
                        <label
                          htmlFor="profileImageInput"
                          className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden ">
                          {preview ? (
                            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                          ) : (
                            <UserRoundPlus className="h-12 w-12 text-white " />
                          )}
                        </label>
                        <input
                          id="profileImageInput"
                          type="file"
                          accept="image/*"
                          className="hidden "
                          onChange={(e) => {
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
                )}
              />

              {tempImage && (
                <CropModal
                  imageSrc={tempImage}
                  onClose={() => setTempImage(null)}
                  onCropComplete={(croppedFile) => {
                    // form.setValue("profile_pic", croppedFile);
                    // setPreview(croppedPreview);
                    // setTempImage(null);
                    form.setValue("profile_pic", croppedFile);
                    const reader = new FileReader();
                    reader.readAsDataURL(croppedFile);
                    reader.onload = () => {
                      const base64String = reader.result as string;
                      setPreview(base64String);
                    };
                    // setPreview(croppedPreview);
                    setTempImage(null);
                  }}
                />
              )}

              {/* Form Fields */}
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <UserRound
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          title={t("forms.first_name_aidant") + "*"}
                          {...field}
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
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              title={t("forms.age_aidant") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                              <Cake
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                                size={20}
                              />
                              <SelectValue placeholder={t("forms.age_aidant") + "*"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {ageList.map((age: ListModel) => (
                              <SelectItem key={age.id} value={String(age.id)}>
                                {age.title} ans
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="closest_town"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomAsyncSelect
                          value={
                            field.value
                              ? { value: String(field.value), label: String(selectedTown || field.value) }
                              : null
                          }
                          loadOptions={loadOptionsTowns}
                          onChange={(selected) => {
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

              {/* COOKIE CONDITION */}
              <div className="rounded-md border p-4 bg-white shadow-sm space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <LockIcon className="w-5 h-5 text-yellow-500" />
                  Consentements et préférences
                </h3>

                {/* Required checkbox age*/}

                {/* terms */}
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
                          <span>Je déclare avoir 18 ans ou plus.{" "}</span> 
                          <a href="/cgv" target="_blank" className="text-blue-600 underline">
                              Conditions Générales de Vente
                            </a>{" "}
                            <a href="/politiques-de-confidentialite" target="_blank" className="text-blue-600 underline">
                              Politique de confidentialité
                            </a>{" "}
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
                  <Button
                    type="submit"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                    <ArrowRight className="text-white" strokeWidth={4} size={28} />
                  </Button>
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
