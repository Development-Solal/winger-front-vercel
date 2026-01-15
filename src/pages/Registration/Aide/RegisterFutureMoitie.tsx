/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import {useEffect, useRef, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowLeft, MapPin} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Link, useSearchParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useFormContext} from "@/context/FormContext";
import {Textarea} from "@/components/ui/textarea";

import Logo from "../../../assets/Logo/logo-blanc.png";
import ProgressBar4 from "../../../assets/Register/progress-bar-4.png";
import Background1 from "../../../assets/Register/background-1.png";
import {
    getAllLanguages,
    getAllLists,
    getAllNationalities,
    loadOptionsLanguagesFM,
    loadOptionsNationalitiesFM,
} from "@/services/ListService";
import {ListModel, ListModelSelect} from "@/models/ListModel";
import {CreateAideService} from "@/services/AideService";
import {base64ToFile, formatListWithIndifferent} from "@/utils/utilts";
import {useUser} from "@/context/AuthContext";
import {CustomSelectMulti} from "@/components/ui/custom-select";
import {CustomAsyncSelectMulti} from "@/components/ui/custom-async-select";
import {Spinner} from "@/components/ui/spinner";
import toast from "react-hot-toast";
import {getFormSchemaRegisterFM} from "@/schemas/registerSchema";
import {useTranslation} from "react-i18next";

interface RegisterFutureMoitieProps {
    onBack?: () => void;
    onComplete?: () => void;
}

const RegisterFutureMoitie = ({onBack, onComplete}: RegisterFutureMoitieProps) => {
    console.log('🎯 RegisterFutureMoitie mounted');

    console.log('🎯 onBack prop:', onBack);
    console.log('🎯 onComplete prop:', onComplete);

    const navigate = useNavigate();
    const {user} = useUser();
    const {t} = useTranslation();
    const formSchema = getFormSchemaRegisterFM(t);
    const {formDataAide, setFormDataAide, clearFormData} = useFormContext();
    const [searchParams] = useSearchParams();
    const gdprAideId = searchParams.get('gdpr_aide_id');

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

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<{ label: string; value: string }[]>([]);
    const [selectedNationalityOptions, setSelectedNationalityOptions] = useState<{
        label: string;
        value: string
    }[]>([]);

    const logoRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const fmAgeRef = useRef<HTMLFormElement>(null);
    const fmTownRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        console.log(gdprAideId);
        if (logoRef.current) {
            logoRef.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, []);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDataAide, // Load saved values
    });
    const watchedValues = useWatch({control: form.control});

    useEffect(() => {
        const firstErrorKey = Object.keys(form.formState.errors)[0];
        if (firstErrorKey && formRef.current) {
            const errorElement = formRef.current!.querySelector(`[name="${firstErrorKey}"]`);
            if (errorElement && (fmAgeRef.current || fmTownRef.current)) {
                if (firstErrorKey == "FMage") {
                    fmAgeRef?.current?.focus();
                } else if (firstErrorKey == "FMtown") {
                    fmTownRef?.current?.focus();
                }
            }
        }
    }, [form.formState.errors]);

    useEffect(() => {
        getAllLists()
            .then((res) => {
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
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        async function hydrateLanguageSelect() {
            if (formDataAide.FMlanguage && formDataAide.FMlanguage.length > 0) {
                try {
                    const response = await getAllLanguages(1, 1000, ""); // adjust pagination
                    const matched = response.languages.filter((lang: { value: string }) =>
                        formDataAide?.FMlanguage?.includes(lang.value)
                    );

                    const hydrated = matched.map((lang: { value: string; label: string }) => ({
                        value: lang.value,
                        label: lang.label.toLowerCase(),
                    }));

                    setSelectedLanguageOptions(hydrated);
                    form.setValue(
                        "FMlanguage",
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
        async function hydrateNationalitySelect() {
            if (formDataAide.FMnationality && formDataAide.FMnationality.length > 0) {
                try {
                    const response = await getAllNationalities(1, 1000, ""); // adjust pagination
                    const matched = response.nationalities.filter((lang: { value: string }) =>
                        formDataAide?.FMnationality?.includes(lang.value)
                    );

                    const hydrated = matched.map((lang: { value: string; label: string }) => ({
                        value: lang.value,
                        label: lang.label.toLowerCase(),
                    }));

                    setSelectedNationalityOptions(hydrated);
                    form.setValue(
                        "FMnationality",
                        hydrated.map((item: { value: string }) => item.value)
                    ); // only send IDs
                } catch (err) {
                    console.error("Error hydrating nationalities:", err);
                }
            }
        }

        hydrateNationalitySelect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setFormDataAide((prev: any) => ({
            ...prev,
            ...watchedValues,
            step: 4,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedValues, setFormDataAide]);

    function cleanValues(input: any): any {
        if (Array.isArray(input)) {
            // Filter out "blank" and "indifférent", and recursively clean the rest
            return input
                .map((item) => cleanValues(item))
                .filter((item) => item !== "" && item !== null && item !== undefined);
        } else if (typeof input === "object" && input !== null) {
            return Object.fromEntries(Object.entries(input).map(([key, value]) => [key, cleanValues(value)]));
        } else if (input === "blank" || input === "indifférent") {
            return "";
        }
        return input;
    }

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const transformedValues = cleanValues(values);

        setFormDataAide((prev: any) => {
            const updatedData = {
                ...prev,
                ...transformedValues,
                step: 4,
            };

            const formData = new FormData();
            formData.append("userEmail", user?.email as string);
            formData.append("source", "web");

            //  Add gdprAideId if coming from Modifier
            if (gdprAideId) {
                console.log("🔗 Adding gdpr_aide_id to FormData:", gdprAideId);
                formData.append("gdpr_aide_id", atob(gdprAideId));
            }

            Object.entries(updatedData).forEach(([key, value]) => {
                if (key === "profile_pic" && value != null) {
                    formData.append(key, base64ToFile(value as string, "profile-pic.png"));
                } else {
                    formData.append(key, value as string);
                }
            });

            CreateAideService(formData)
                .then((res) => {
                    console.log(res);
                    setErrorMsg("");
                    setIsLoading(false);

                    if (gdprAideId && onComplete) {
                        toast.success("Profil Aidé(e) créé avec succès.");
                        clearFormData();
                        onComplete();
                    } else {
                        toast.success("Aide créée avec succès.");
                        clearFormData();
                        navigate("/register/done");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false);
                    setErrorMsg(err?.response?.data?.message);
                });

            return updatedData;
        });
    };

    const onError = (errors: unknown) => {
        console.log("Form errors:", errors);
    };

    return (
        <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{backgroundImage: `url(${Background1})`}}>
            <div className="mx-auto max-w-2xl">
                {/* Logo and title */}
                <div className="flex flex-col items-center space-y-2">
                    <img src={Logo} alt="Logo" className="flex w-50 h-56"/>
                    <p ref={logoRef} className="text-center text-4xl md:text-5xl font-freestyle  text-white">
                        {t("registration.title")}
                    </p>
                </div>

                {/* Progress indicator */}
                <div className="relative mx-auto flex max-w-xl items-center justify-between">
                    <img src={ProgressBar4} alt="Progress4" className="flex"/>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
                    <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">{t("registration.FM")}</h2>
                    <p className="text-sm mb-6 font-quicksand_regular">{t("forms.obligatoire")}</p>
                    <Form {...form}>
                        <form
                            ref={formRef}
                            onSubmit={(e) => {
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
                                                <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Age */}
                            <FormField
                                control={form.control}
                                name="FMage"
                                render={({field}) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <div className="relative flex-1">
                                                <CustomSelectMulti
                                                    name="FMage"
                                                    selectRef={fmAgeRef}
                                                    options={ageList}
                                                    value={
                                                        field.value ? ageList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.ages_fm") + "*"}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                    name="FMtown"
                                                    selectRef={fmTownRef}
                                                    options={townList}
                                                    value={
                                                        field.value ? townList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.closest_town_fm") + "*"}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                    </FormItem>
                                )}
                            />
                            <p className="text-sm mb-6 font-quicksand_regular">
  {t("forms.facultative").split('{{link}}')[0]}
  <a 
    href="https://preprod.winger.fr/politiques-de-confidentialite" 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-mid-pink underline hover:text-dark-pink"
  >
    politique de confidentialité
  </a>
  {t("forms.facultative").split('{{link}}')[1]}
</p>

                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="FMorigine"
                                    render={({field}) => (
                                        <FormItem>
                                            <CustomSelectMulti
                                                options={origineList}
                                                value={
                                                    field.value ? origineList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                }
                                                onChange={(selected) => field.onChange(selected?.map((item: {
                                                    value: string
                                                }) => item.value))}
                                                placeholder={t("forms.origine_fm")}
                                                icon={<MapPin size={18} className="text-dark-pink"/>}
                                            />
                                            <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                    key="fm-nationality-select"
                                                    value={selectedNationalityOptions}
                                                    loadOptions={loadOptionsNationalitiesFM}
                                                    onChange={(selected) => {
                                                        const selectedOptions = selected || [];
                                                        setSelectedNationalityOptions(selectedOptions);

                                                        const selectedIds = selectedOptions.map((item) => item.value);
                                                        form.setValue("FMnationality", selectedIds); // Only IDs go to backend
                                                    }}
                                                    placeholder={t("forms.nationality_fm")}
                                                    page={1}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                    </FormItem>
                                )}
                            />

                            {/* Language   */}
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
                                                    onChange={(selected) => {
                                                        const selectedOptions = selected || [];
                                                        setSelectedLanguageOptions(selectedOptions);

                                                        const selectedIds = selectedOptions.map((item) => item.value);
                                                        form.setValue("FMlanguage", selectedIds); // Only IDs go to backend
                                                    }}
                                                    placeholder={t("forms.language_fm")}
                                                    page={1}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                            ? religionList.filter((option) => field["value"]?.includes(option["value"]))
                                                            : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.religion_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                            ? educationList.filter((option) => field["value"]?.includes(option["value"]))
                                                            : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.education_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                        field.value ? heightList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.height_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                            ? silhouetteList.filter((option) => field["value"]?.includes(option["value"]))
                                                            : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.silhouette_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                        field.value ? smokerList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.smoker_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                        field.value ? tattooList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.tattoo_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                        field.value ? kidList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.kid_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                        field.value ? passionList.filter((option) => field["value"]?.includes(option["value"])) : []
                                                    }
                                                    onChange={(selected) =>
                                                        field.onChange(selected?.map((item: {
                                                            value: string
                                                        }) => item.value))
                                                    }
                                                    placeholder={t("forms.passions_fm")}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                            <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                    <span
                                        className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.previous")}</span>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (gdprAideId) {
                                                navigate(`/register/aide/2?gdpr_aide_id=${gdprAideId}`);
                                            } else {
                                                navigate("/register/aide/2");
                                            }
                                        }}>
                                        <ArrowLeft/>
                                    </button>
                                </div>

                                {/* Right - Suivant */}
                                <div className="flex items-center gap-4">
                                    {!isLoading ? (
                                        <Button type="submit" className="bg-dark-pink text-white font-quicksand">
                                            {t("buttons.final")}
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

export default RegisterFutureMoitie;
