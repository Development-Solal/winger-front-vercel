/* eslint-disable @typescript-eslint/no-explicit-any */
import {useUser} from "@/context/AuthContext";
import {useEffect, useState, useRef} from "react";
import {useNavigate, useParams} from "react-router-dom";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";
import Background1 from "../../assets/Register/background-1.png";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {CustomAsyncSelectMulti} from "@/components/ui/custom-async-select";
import {loadOptionsLanguagesFM, loadOptionsNationalitiesFM} from "@/services/ListService";
import {getAllLists} from "@/services/ListService";
import {ListModel, ListModelSelect} from "@/models/ListModel";
import {ArrowUp, MapPin} from "lucide-react";
import {Label} from "@radix-ui/react-label";
import {GetFutureMoitieByIdService, UpdateFutureMoitieService} from "@/services/AideService";
import {Textarea} from "@/components/ui/textarea";
import {CustomSelectMulti} from "@/components/ui/custom-select";
import {FmAideModel} from "@/models/AideModel";
import {Spinner} from "@/components/ui/spinner";
import toast from "react-hot-toast";
import {formatListWithIndifferent} from "@/utils/utilts";
import {getFormSchemaEditFM} from "@/schemas/compteSchema";
import {useTranslation} from "react-i18next";
import {useMobile} from "@/hooks/use-mobile";

const FutureMoitie = () => {
  const {encodedAideId} = useParams();
  const {user} = useUser();
  const {t} = useTranslation();
  const formSchema = getFormSchemaEditFM(t);
  const navigate = useNavigate();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FMgender: "homme",
      FMage: [],
      FMtown: [],
      FMorigine: [],
      FMnationality: [],
      FMlanguage: "",
      FMreligion: [],
      FMeducation: [],
      FMheight: [],
      FMsilhouette: [],
      FMsmoker: [],
      FMtatoo: [],
      FMkids: [],
      FMpassions: [],
      FMdescription: "",
    },
  });

  const [aideId, setAideId] = useState<string>();
  const [origineList, setOrigineList] = useState<ListModelSelect[]>([]);
  const [ageList, setAgeList] = useState<ListModelSelect[]>([]);
  const [educationList, setEducationList] = useState<ListModelSelect[]>([]);
  const [heightList, setHeightList] = useState<ListModelSelect[]>([]);
  const [kidList, setKidList] = useState<ListModelSelect[]>([]);
  const [passionList, setPassionList] = useState<ListModelSelect[]>([]);
  const [religionList, setReligionList] = useState<ListModelSelect[]>([]);
  const [silhouetteList, setSilhouetteList] = useState<ListModelSelect[]>([]);
  const [smokerList, setSmokerList] = useState<ListModelSelect[]>([]);
  const [tattooList, setTattooList] = useState<ListModelSelect[]>([]);
  const [townList, setTownList] = useState<ListModelSelect[]>([]);

  const [selectedNationalityOptions, setSelectedNationalityOptions] = useState<{label: string; value: string}[]>([]);
  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<{label: string; value: string}[]>([]);

  const [FmData, setFmData] = useState<FmAideModel>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    if (encodedAideId) {
      setAideId(atob(encodedAideId.toString()));
    }
  }, [encodedAideId]);

  useEffect(() => {
    getAllLists()
      .then(res => {
        setOrigineList(formatListWithIndifferent(res.origineList));

        setEducationList(formatListWithIndifferent(res.educationList));
        setHeightList(formatListWithIndifferent(res.heightList));
        setReligionList(formatListWithIndifferent(res.religionList));
        setSilhouetteList(formatListWithIndifferent(res.silhouetteList));
        setSmokerList(formatListWithIndifferent(res.smokerList));
        setTattooList(formatListWithIndifferent(res.tattooList));

        setAgeList(
          res.ageList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setTownList(
          res.townList.map((item: ListModel) => ({
            value: String(item.id),
            label: item.title,
          }))
        );
        setKidList(formatListWithIndifferent(res.kidList));
        setPassionList(formatListWithIndifferent(res.passionList));
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (aideId) {
      GetFutureMoitieByIdService(aideId)
        .then(res => {
          setFmData(res);
        })
        .catch(err => console.error(err));
    }
  }, [aideId]);

  useEffect(() => {
    if (FmData) {
      // Set the form values based on the fetched aidant data
      form.setValue("FMgender", FmData.gender || "");
      // form.setValue("FMorigine", FmData.origine_id?.toString() || "");
      // form.setValue("FMnationality", FmData.nationality_id || "");
      // form.setValue("FMlanguage", FmData.language_id || "");

      // form.setValue("FMreligion", FmData.religion?.id.toString() || "");
      // form.setValue("FMeducation", FmData.education?.id.toString() || "");
      // form.setValue("FMheight", FmData.height?.id.toString() || "");
      // form.setValue("FMsilhouette", FmData.silhouette?.id.toString() || "");
      // form.setValue("FMsmoker", FmData.smoker?.id.toString() || "");
      // form.setValue("FMtatoo", FmData.tattoo?.id.toString() || "");
      // form.setValue("FMkids", FmData.kids?.id.toString() || "");
      form.setValue("FMdescription", FmData.description || "");

      form.setValue(
        "FMage",
        FmData.ages.map(p => p.id.toString())
      );
      form.setValue(
        "FMtown",
        FmData.townOptions.map(p => p.id.toString())
      );

      form.setValue(
        "FMpassions",
        FmData.passions.map(p => p.id.toString())
      );

      form.setValue(
        "FMorigine",
        FmData.origines?.map(p => p.id.toString())
      );
      form.setValue(
        "FMreligion",
        FmData.religions.map(p => p.id.toString())
      );
      form.setValue(
        "FMeducation",
        FmData.educations.map(p => p.id.toString())
      );
      form.setValue(
        "FMheight",
        FmData.heights.map(p => p.id.toString())
      );
      form.setValue(
        "FMkids",
        FmData.kids.map(p => p.id.toString())
      );
      form.setValue(
        "FMsilhouette",
        FmData.silhouettes.map(p => p.id.toString())
      );
      form.setValue(
        "FMsmoker",
        FmData.smokers.map(p => p.id.toString())
      );
      form.setValue(
        "FMtatoo",
        FmData.tattoos.map(p => p.id.toString())
      );

      const languageIds = FmData.languages.map(l => l.id.toString()); // store as strings
      const languageOptions = FmData.languages.map(l => ({
        value: l.id.toString(),
        label: l.title,
      }));

      form.setValue("FMlanguage", languageIds);
      setSelectedLanguageOptions(languageOptions);

      const nationalityIds = FmData.nationalities?.map(l => l.id.toString()); // store as strings
      const nationalityOptions = FmData.nationalities?.map(l => ({
        value: l.id.toString(),
        label: l.title,
      }));

      form.setValue("FMnationality", nationalityIds);
      setSelectedNationalityOptions(nationalityOptions);
    }
  }, [FmData, form]);

  function cleanValues(input: any): any {
    if (Array.isArray(input)) {
      // Filter out "blank" and "indifférent", and recursively clean the rest
      return input.map(item => cleanValues(item)).filter(item => item !== "" && item !== null && item !== undefined);
    } else if (typeof input === "object" && input !== null) {
      return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, cleanValues(value)]));
    } else if (input === "blank" || input === "indifférent") {
      return "";
    }
    return input;
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Transform the form values: Replace "blank" or "indifferent" with ""
    const transformedValues = cleanValues(values);

    const formData = new FormData();

    Object.entries(transformedValues).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    if (aideId) {
      UpdateFutureMoitieService(aideId, formData)
        .then(res => {
          console.log(res);
          setErrorMsg("");
          setIsLoading(false);
          toast.success("Future moitié modifiée avec succès.");
        })
        .catch(err => {
          console.error(err);
          setErrorMsg(err?.response?.data?.message);
          setIsLoading(false);
        });
    }
  };

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
  };

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 mx-auto w-full max-w-screen-xl">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <DashboardNav />
          <div
            ref={ref}
            className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full scroll-mt-24"
            style={{backgroundImage: `url(${Background1})`}}>
            <div className="rounded-md bg-white p-6 sm:p-8 shadow-lg mt-8 w-full max-w-full">
              <Button
                className="rounded-md bg-mid-blue font-quicksand text-white shadow-lg md:ml-auto text-right flex  mb-5 ml-10 "
                onClick={e => {
                  e.preventDefault();
                  navigate(`/compte/profils-aides/${encodedAideId}`);
                }}>
                {t("buttons.aide")}
              </Button>
              <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">
                Future Moitié de {FmData?.aide.name}
              </h2>

              <Form {...form}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    console.log("Form submission triggered!");

                    form.handleSubmit(onSubmit, onError)(e);
                  }}
                  className="space-y-6">
                  <div className="space-y-4">
                    {/* Form Label on the same line as options */}
                    <div className="flex flex-col md:flex-row items-center">
                      <Label className="text-muted-foreground mr-4 mb-2">{t("forms.FM")} *</Label>
                      <FormField
                        control={form.control}
                        name="FMgender"
                        render={({field}) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex flex-wrap gap-1.5 md:gap-4 w-full">
                                {/* Homme */}
                                <label
                                  className={`flex-1 w-1/2 h-1/2 rounded-md text-center py-1 px-4 cursor-pointer ${
                                    field.value === "homme"
                                      ? "bg-dark-pink border-dark-pink border-2 text-white hover:opacity-90"
                                      : "border-dark-pink border-2 text-dark-pink hover:bg-light-pink"
                                  }`}>
                                  <input
                                    type="radio"
                                    name={field.name}
                                    value="homme"
                                    checked={field.value === "homme"}
                                    onChange={field.onChange}
                                    className="hidden"
                                  />
                                  {t("forms.male")}
                                </label>

                                {/* Femme */}
                                <label
                                  className={`flex-1 min-w-32 h-1/2  rounded-md text-center py-1  px-4 cursor-pointer ${
                                    field.value === "femme"
                                      ? "bg-dark-pink border-dark-pink border-2 text-white hover:opacity-90 "
                                      : "border-dark-pink border-2 text-dark-pink hover:bg-light-pink"
                                  }`}>
                                  <input
                                    type="radio"
                                    name={field.name}
                                    value="femme"
                                    checked={field.value === "femme"}
                                    onChange={field.onChange}
                                    className="hidden"
                                  />
                                  {t("forms.female")}
                                </label>
                              </div>
                            </FormControl>
                            <FormMessage className="text-logo-red font-bold xl:text-md" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="FMage"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <CustomSelectMulti
                              options={ageList}
                              value={
                                field.value ? ageList.filter(option => field["value"]?.includes(option["value"])) : []
                              }
                              onChange={selected =>
                                field.onChange(selected?.map((item: {value: string}) => item.value))
                              }
                              placeholder={t("forms.ages_fm") + "*"}
                              icon={<MapPin size={18} className="text-dark-pink" />}
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  {/* Town */}
                  <FormField
                    control={form.control}
                    name="FMtown"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <CustomSelectMulti
                              options={townList}
                              value={
                                field.value ? townList.filter(option => field["value"]?.includes(option["value"])) : []
                              }
                              onChange={selected =>
                                field.onChange(selected?.map((item: {value: string}) => item.value))
                              }
                              placeholder={t("forms.closest_town_fm") + "*"}
                              icon={<MapPin size={18} className="text-dark-pink" />}
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-4">
                    {/* Form Label on the same line as options */}
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="FMorigine"
                        render={({field}) => (
                          <FormItem>
                            <CustomSelectMulti
                              options={origineList}
                              value={
                                field.value
                                  ? origineList.filter(option => field["value"]?.includes(option["value"]))
                                  : []
                              }
                              onChange={selected =>
                                field.onChange(selected?.map((item: {value: string}) => item.value))
                              }
                              placeholder="Choisissez des origines"
                              icon={<MapPin size={18} className="text-dark-pink" />}
                              aria-label="Origine" // 👈 for accessibility
                            />
                            <FormMessage className="text-logo-red font-bold xl:text-md" />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Nationality */}
                      <FormField
                          control={form.control}
                          name="FMnationality"
                          render={() => (
                              <FormItem>
                                  <div className="flex items-center">
                                      <div className="relative flex-1">
                                          <CustomAsyncSelectMulti
                                              key="fm-nationality-select" // Add this line only
                                              value={selectedNationalityOptions}
                                              loadOptions={loadOptionsNationalitiesFM}
                                              onChange={selected => {
                                                  const selectedOptions = selected || [];
                                                  setSelectedNationalityOptions(selectedOptions);

                                                  const selectedIds = selectedOptions.map(item => item.value);
                                                  form.setValue("FMnationality", selectedIds);
                                              }}
                                              placeholder={t("Choisissez des nationalités")}
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
                      name="FMlanguage"
                      render={() => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomAsyncSelectMulti
                                value={selectedLanguageOptions}
                                loadOptions={loadOptionsLanguagesFM}
                                onChange={selected => {
                                  const selectedOptions = selected || [];
                                  setSelectedLanguageOptions(selectedOptions);

                                  const selectedIds = selectedOptions.map(item => item.value);
                                  form.setValue("FMlanguage", selectedIds);
                                }}
                                placeholder={t("forms.language_fm")}
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
                      name="FMreligion"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={religionList}
                                value={
                                  field.value
                                    ? religionList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.religion_fm")}
                                icon={<MapPin size={18} className="text-dark-pink" />}
                              />
                            </div>
                          </div>
                          <FormMessage className="text-logo-red font-bold xl:text-md" />
                        </FormItem>
                      )}
                    />

                    {/* Education */}
                    <FormField
                      control={form.control}
                      name="FMeducation"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={educationList}
                                value={
                                  field.value
                                    ? educationList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.education_fm")}
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
                      name="FMheight"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={heightList}
                                value={
                                  field.value
                                    ? heightList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.height_fm")}
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
                      name="FMsilhouette"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={silhouetteList}
                                value={
                                  field.value
                                    ? silhouetteList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.silhouette_fm")}
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
                      name="FMsmoker"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={smokerList}
                                value={
                                  field.value
                                    ? smokerList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.smoker_fm")}
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
                      name="FMtatoo"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={tattooList}
                                value={
                                  field.value
                                    ? tattooList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.tattoo_fm")}
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
                      name="FMkids"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={kidList}
                                value={
                                  field.value ? kidList.filter(option => field["value"]?.includes(option["value"])) : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.kid_fm")}
                                icon={<MapPin size={18} className="text-dark-pink" />}
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
                      name="FMpassions"
                      render={({field}) => (
                        <FormItem>
                          <div className="flex items-center">
                            <div className="relative flex-1">
                              <CustomSelectMulti
                                options={passionList}
                                value={
                                  field.value
                                    ? passionList.filter(option => field["value"]?.includes(option["value"]))
                                    : []
                                }
                                onChange={selected =>
                                  field.onChange(selected?.map((item: {value: string}) => item.value))
                                }
                                placeholder={t("forms.passions_fm")}
                                icon={<MapPin size={18} className="text-[#ce015e]" />}
                              />
                            </div>
                          </div>
                          <FormMessage className="text-logo-red font-bold xl:text-md" />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col space-y-2">
                      <Label className="text-muted-foreground mr-4 mb-2">{t("forms.fm_description")}</Label>
                      <FormField
                        control={form.control}
                        name="FMdescription"
                        render={({field}) => (
                          <FormItem>
                            <div className="flex items-center">
                              <div className="relative flex-1">
                                <Textarea className="resize-y" {...field} />
                              </div>
                            </div>
                            <FormMessage className="text-logo-red font-bold xl:text-md" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Error Msg */}
                  {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

                  {/* Submit Button */}
                  <div className="flex justify-end pt-4 gap-x-5">
                    {!isLoading ? (
                      <Button
                        type="submit"
                        className=" rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto">
                        {t("buttons.edit")}
                      </Button>
                    ) : (
                      <Spinner />
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default FutureMoitie;
