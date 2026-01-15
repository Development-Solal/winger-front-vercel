import * as z from "zod";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { CustomSelect, CustomSelectMulti } from "@/components/ui/custom-select";

import { Label } from "@/components/ui/label";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "@/context/FormContext";

import Logo from "../../../assets/Logo/logo-blanc.png";
import ProgressBar3 from "../../../assets/Register/progress-bar-3.png";
import Background1 from "../../../assets/Register/background-1.png";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllLanguages,
  getAllLists,
  loadOptionsLanguagesAide,
  loadOptionsNationalitiesAide,
} from "@/services/ListService";
import { ListModel, ListModelSelect } from "@/models/ListModel";
import { CustomAsyncSelect, CustomAsyncSelectMulti } from "@/components/ui/custom-async-select";
import { t } from "i18next";
import { formatListWithDecouvrire } from "@/utils/utilts";

const formSchema = z.object({
  origine: z.string().optional(),
  nationality: z.union([z.string().optional(), z.number().optional()]),
  language: z.array(z.any()).optional(),
  religion: z.string().optional(),
  education: z.string().optional(),
  height: z.string().optional(),
  silhouette: z.string().optional(),
  smoker: z.string().optional(),
  tatoo: z.string().optional(),
  kids: z.array(z.string()).optional(),
  passions: z.array(z.string()).optional(),
  description: z
    .string()
    .max(1000, {
      message: "La description ne peut pas dépasser 1000 caractères",
    })
    .optional(),
});

interface RegisterAide2Props {
  onBack: () => void;
}

const RegisterAide2 = ({ onBack }: RegisterAide2Props) => {
  const navigate = useNavigate();

  const { formDataAide, setFormDataAide } = useFormContext();
  const [searchParams] = useSearchParams();
  const gdprAideId = searchParams.get("gdpr_aide_id");

  const [origineList, setOrigineList] = useState<ListModelSelect[]>([]);
  const [educationList, setEducationList] = useState<ListModelSelect[]>([]);
  const [heightList, setHeightList] = useState<ListModelSelect[]>([]);
  const [kidList, setKidList] = useState<ListModelSelect[]>([]);
  const [passionList, setPassionList] = useState<ListModelSelect[]>([]);
  const [religionList, setReligionList] = useState<ListModelSelect[]>([]);
  const [silhouetteList, setSilhouetteList] = useState<ListModelSelect[]>([]);
  const [smokerList, setSmokerList] = useState<ListModelSelect[]>([]);
  const [tattooList, setTattooList] = useState<ListModelSelect[]>([]);

  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formDataAide, // Load saved values
  });
  const watchedValues = useWatch({ control: form.control });

  const [selectedNationality, setSelectedNationality] = useState<string>();

  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<{ label: string; value: string }[]>([]);

  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    getAllLists()
      .then((res) => {
        setOrigineList(
          res.origineList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setEducationList(
          res.educationList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setHeightList(
          res.heightList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setKidList(
          res.kidList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setPassionList(
          res.passionList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setReligionList(
          res.religionList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setSilhouetteList(formatListWithDecouvrire(res.silhouetteList));

        setSmokerList(
          res.smokerList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setTattooList(
          res.tattooList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function hydrateLanguageSelect() {
      if (formDataAide.language && formDataAide.language.length > 0) {
        try {
          const response = await getAllLanguages(1, 1000, ""); // adjust pagination
          const matched = response.languages.filter((lang: { value: string }) =>
            formDataAide?.language?.includes(lang.value)
          );

          const hydrated = matched.map((lang: { value: string; label: string }) => ({
            value: lang.value,
            label: lang.label.toLowerCase(),
          }));

          setSelectedLanguageOptions(hydrated);
          form.setValue(
            "language",
            hydrated.map((item: { value: string }) => item.value)
          ); // only send IDs
        } catch (err) {
          console.error("Error hydrating languages:", err);
        }
      }
    }

    hydrateLanguageSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedNationality(formDataAide.nationality_name);
    // setSelectedLanguage(selected ? selected.map((item: ListModelSelect) => item.label) : []);
  }, [formDataAide.nationality_name]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setFormDataAide((prev: any) => ({
      ...prev,
      ...watchedValues,
      nationality_name: selectedNationality ?? formDataAide.nationality_name,
      // language: selectedLanguage ?? formDataAide.language,
      step: 3,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchedValues, setFormDataAide]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setErrorMsg("");
    console.log("value", values);

    if (gdprAideId) {
      navigate(`/register/aide/future-motie?gdpr_aide_id=${gdprAideId}`);
    } else {
      navigate("/register/aide/future-motie");
    }
  };

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
  };

  return (
    <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{ backgroundImage: `url(${Background1})` }}>
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
          <img src={ProgressBar3} alt="Progress3" className="flex" />
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">{t("registration.aide")}</h2>
          <p className="text-sm mb-6 font-quicksand_regular">
            {t("forms.facultative").split("{{link}}")[0]}
            <a
              href="https://preprod.winger.fr/politiques-de-confidentialite"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mid-pink underline hover:text-dark-pink">
              politique de confidentialité
            </a>
            {t("forms.facultative").split("{{link}}")[1]}
          </p>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submission triggered!");

                form.handleSubmit(onSubmit, onError)(e);
              }}
              className="space-y-6">
              {/* Origine */}
              <FormField
                control={form.control}
                name="origine"
                render={({ field }) => (
                  <FormItem>
                    <CustomSelect
                      options={origineList}
                      value={field.value ? origineList.find((option) => option["value"] === field.value) ?? null : null}
                      onChange={(selected) => field.onChange(selected?.value ?? "")}
                      placeholder={t("forms.origine_aide")}
                      icon={<MapPin size={18} className="text-dark-pink" />}
                      aria-label="Origine"
                    />
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Nationality */}
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomAsyncSelect
                          key={Math.random()}
                          value={
                            field.value
                              ? {
                                  value: String(field.value),
                                  label: String(selectedNationality || field.value),
                                }
                              : null
                          }
                          loadOptions={loadOptionsNationalitiesAide}
                          onChange={(selected) => {
                            field.onChange(selected?.value || "");
                            setSelectedNationality(selected?.label || "");
                          }}
                          placeholder={t("forms.nationality_aide")}
                          page={1}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Language */}
              <FormField
                control={form.control}
                name="language"
                render={() => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomAsyncSelectMulti
                          value={selectedLanguageOptions}
                          loadOptions={loadOptionsLanguagesAide}
                          onChange={(selected) => {
                            const selectedOptions = selected || [];
                            setSelectedLanguageOptions(selectedOptions);

                            const selectedIds = selectedOptions.map((item) => item.value);
                            form.setValue("language", selectedIds); // Only IDs go to backend
                          }}
                          placeholder={t("forms.language_aide")}
                          page={1}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Religion */}
              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <CustomSelect
                            options={religionList}
                            value={
                              field.value
                                ? religionList.find((option) => option["value"] === field.value) ?? null
                                : null
                            }
                            onChange={(selected) => field.onChange(selected?.value ?? "")}
                            placeholder={t("forms.religion_aide")}
                            icon={<MapPin size={18} className="text-dark-pink" />}
                          />
                        </div>
                      </div>
                      <FormMessage className="text-logo-red font-bold xl:text-md" />
                    </FormItem>
                  );
                }}
              />

              {/* Education */}
              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelect
                          options={educationList}
                          value={
                            field.value ? educationList.find((option) => option["value"] === field.value) ?? null : null
                          }
                          onChange={(selected) => field.onChange(selected?.value)}
                          placeholder={t("forms.education_aide")}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Height */}
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelect
                          options={heightList}
                          value={
                            field.value ? heightList.find((option) => option["value"] === field.value) ?? null : null
                          }
                          onChange={(selected) => field.onChange(selected?.value)}
                          placeholder={t("forms.height_aide")}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Silhouette */}
              <FormField
                control={form.control}
                name="silhouette"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelect
                          options={silhouetteList}
                          value={
                            field.value
                              ? silhouetteList.find((option) => option["value"] === field.value) ?? null
                              : null
                          }
                          onChange={(selected) => field.onChange(selected?.value)}
                          placeholder={t("forms.silhouette_aide")}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Smoker */}
              <FormField
                control={form.control}
                name="smoker"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelect
                          options={smokerList}
                          value={
                            field.value ? smokerList.find((option) => option["value"] === field.value) ?? null : null
                          }
                          onChange={(selected) => field.onChange(selected?.value)}
                          placeholder={t("forms.smoker_aide")}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Tatoo */}
              <FormField
                control={form.control}
                name="tatoo"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelect
                          options={tattooList}
                          value={
                            field.value ? tattooList.find((option) => option["value"] === field.value) ?? null : null
                          }
                          onChange={(selected) => field.onChange(selected?.value)}
                          placeholder={t("forms.tattoo_aide")}
                          icon={<MapPin size={18} className="text-dark-pink" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* kids */}
              <FormField
                control={form.control}
                name="kids"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelectMulti
                          options={kidList}
                          value={
                            field.value ? kidList.filter((option) => field["value"]?.includes(option["value"])) : []
                          }
                          onChange={(selected) =>
                            field.onChange(selected?.map((item: { value: string }) => item.value))
                          }
                          placeholder={t("forms.kids_aide")}
                          icon={<MapPin size={18} className="text-[#ce015e]" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Passions */}
              <FormField
                control={form.control}
                name="passions"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <CustomSelectMulti
                          options={passionList}
                          value={
                            field.value ? passionList.filter((option) => field["value"]?.includes(option["value"])) : []
                          }
                          onChange={(selected) =>
                            field.onChange(selected?.map((item: { value: string }) => item.value))
                          }
                          placeholder={t("forms.passions_aide")}
                          icon={<MapPin size={18} className="text-[#ce015e]" />}
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground mr-4 mb-2">{t("forms.description_title")}</Label>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <Textarea
                            title={t("forms.description_text")}
                            placeholder={t("forms.description_text")}
                            className="resize-y"
                            {...field}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{field.value?.length || 0}/1000 caractères</div>
                      <FormMessage className="text-logo-red font-bold xl:text-md" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Error Msg */}
              {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

              {/* Submit Button */}
              <div className="mt-8 flex items-center justify-between w-full">
                {/* Left - Précédent */}
                <div className="flex items-center gap-4">
                  <span className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.previous")}</span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (gdprAideId) {
                        navigate(`/register/aide/1?gdpr_aide_id=${gdprAideId}`);
                        onBack();
                      } else {
                        navigate("/register/aide/1");
                      }
                    }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                    <ArrowLeft className="text-white" strokeWidth={4} size={18} />
                  </button>
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

export default RegisterAide2;
