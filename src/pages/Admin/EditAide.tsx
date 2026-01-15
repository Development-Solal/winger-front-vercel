import {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";

import Background1 from "../../assets/Register/background-1.png";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CustomAsyncSelect, CustomAsyncSelectMulti} from "@/components/ui/custom-async-select";
import {
    loadOptionsCommunes,
    loadOptionsLanguagesAide,
    loadOptionsNationalitiesAide,
    loadOptionsTowns,
} from "@/services/ListService";
import {getAllLists} from "@/services/ListService";
import {ListModel} from "@/models/ListModel";
import {ArrowUp, Cake, MapPin, UserRound, UserRoundPlus} from "lucide-react";
import {Label} from "@radix-ui/react-label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {GetAideByIdService, UpdateAideService} from "@/services/AideService";
import {Textarea} from "@/components/ui/textarea";
import {CustomSelect, CustomSelectMulti} from "@/components/ui/custom-select";
import {AideModel} from "@/models/AideModel";
import {BASE_URL} from "@/utils/api";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner";
import CropModal from "@/components/modals/CropModal";
import {useTranslation} from "react-i18next";
import {getFormSchemaEditAide} from "@/schemas/compteSchema";
import AdminNav from "./AdminNav";
import {useMobile} from "@/hooks/use-mobile";

const EditAdminAide = () => {
    const {aide} = useParams();
    const isMobile = useMobile();
    const ref = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const formSchema = getFormSchemaEditAide(t);

    const [aideId, setAideId] = useState<string>();
    const [ageList, setAgeList] = useState([]);
    const [origineList, setOrigineList] = useState([]);
    const [educationList, setEducationList] = useState([]);
    const [heightList, setHeightList] = useState([]);
    const [kidList, setKidList] = useState([]);
    const [passionList, setPassionList] = useState([]);
    const [religionList, setReligionList] = useState([]);
    const [silhouetteList, setSilhouetteList] = useState([]);
    const [smokerList, setSmokerList] = useState([]);
    const [tattooList, setTattooList] = useState([]);

    const [selectedNationality, setSelectedNationality] = useState<string>();
    const [selectedCommune, setSelectedCommune] = useState<string>();
    const [selectedTown, setSelectedTown] = useState<string>();

    const [aideData, setAideData] = useState<AideModel>();
    const [preview, setPreview] = useState<string | null>(null); // State for the image preview
    const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview

    const [errorMsg, setErrorMsg] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<{ label: string; value: string }[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "homme",
            aidant_is_aide: "non",
            name: "",
            age: aideData?.age_id ? aideData.age_id.toString() : "",
            closest_town: "",
            commune: "",
            aidant_relation: "ami",
            origine: "",
            nationality: "",
            language: [],
            religion: "",
            education: "",
            height: "",
            silhouette: "",
            smoker: "",
            tatoo: "",
            kids: [],
            passions: [],
            description: "",
        },
    });

    useEffect(() => {
        if (ref.current && isMobile) {
            ref.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [isMobile]);

    useEffect(() => {
        if (aide) {
            setAideId(aide);
        }
    }, [aide]);

    useEffect(() => {
        getAllLists()
            .then(res => {
                setAgeList(res.ageList);
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
                setSilhouetteList(
                    res.silhouetteList.map((item: ListModel) => ({
                        value: String(item.id),
                        label: item.title,
                    }))
                );
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
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (aideData?.language && Array.isArray(aideData.language)) {
            const transformed = aideData.language.map(lang => ({
                value: String(lang.id),
                label: lang.title.toLowerCase(),
            }));

            setSelectedLanguageOptions(transformed);
            form.setValue(
                "language",
                transformed.map(item => item.value)
            ); // Only IDs
        }
    }, [aideData?.language, form]);

    useEffect(() => {
        if (aideId) {
            GetAideByIdService(aideId)
                .then(res => {
                    setAideData(res);
                    setPreview(res.profile_pic ? BASE_URL + "assets/" + res.profile_pic : null);
                })
                .catch(err => console.error(err));
        }
    }, [aideId]);

    useEffect(() => {
        if (aideData && ageList.length > 0) {
            // Set the form values based on the fetched aidant data
            form.setValue("gender", aideData.gender || "");
            form.setValue("aidant_is_aide", aideData.aidant_is_aide || "");
            form.setValue("name", aideData.name || "");
            form.setValue("age", aideData.age_id ? String(aideData.age_id) : "");
            form.setValue("closest_town", aideData.town_id || "");
            form.setValue("commune", aideData.commune_id || "");
            form.setValue("aidant_relation", aideData.aidant_relation || "");
            form.setValue("origine", aideData.origine_id?.toString() || "");
            form.setValue("nationality", aideData.nationality_id || "");

            form.setValue("religion", aideData.religion?.id.toString() || "");
            form.setValue("education", aideData.education?.id.toString() || "");
            form.setValue("height", aideData.height?.id.toString() || "");
            form.setValue("silhouette", aideData.silhouette?.id.toString() || "");
            form.setValue("smoker", aideData.smoker?.id.toString() || "");
            form.setValue("tatoo", aideData.tattoo?.id.toString() || "");
            form.setValue("description", aideData.description || "");

            form.setValue(
                "kids",
                aideData.kids.map(p => p.id.toString())
            );

            form.setValue(
                "passions",
                aideData.passions.map(p => p.id.toString())
            );

            form.setValue(
                "language",
                aideData.language.map(p => p.id.toString())
            );

            setSelectedNationality(aideData?.nationality?.title);
            setSelectedTown(aideData?.town?.town);
            setSelectedCommune(aideData?.commune?.name);
        }
    }, [ageList.length, aideData, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        // Transform the form values: Replace "blank" or "indifferent" with ""
        const transformedValues = Object.entries(values).reduce((acc, [key, value]) => {
            if (value === "blank" || value === "indifférent") {
                acc[key] = ""; // replace with empty string
            } else {
                acc[key] = value;
            }
            return acc;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }, {} as Record<string, any>);

        const formData = new FormData();

        Object.entries(transformedValues).forEach(([key, value]) => {
            if (key === "profile_pic" && value instanceof File) {
                formData.append(key, value);
            } else {
                formData.append(key, value as string);
            }
        });

        if (aideId) {
            UpdateAideService(aideId, formData)
                .then(res => {
                    console.log(res);
                    setErrorMsg("");
                    setIsLoading(false);
                    toast.success(t("compte.edit_aide_success"));
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
        <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
            <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
                <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold font-quicksand">WINGer Administrateur</h1>
                    </div>
                </div>
            </div>
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-[300px,1fr]">
                    <AdminNav/>
                    <div ref={ref} className="space-y-6 p-6">
                        <div
                            className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full scroll-mt-24"
                            style={{backgroundImage: `url(${Background1})`}}>
                            <div className="rounded-md bg-white p-8 shadow-lg mt-8">
                                {/* Responsive flex row/col for title + button */}
                                <Button
                                    className="rounded-md bg-mid-blue font-quicksand text-white shadow-lg md:ml-auto text-right flex mb-5"
                                    onClick={e => {
                                        e.preventDefault();
                                        navigate(`/admin/editAdminFutureMoitie/${aide}`);
                                    }}>
                                    {t("buttons.FM_aide")}
                                </Button>
                                <h2 className="text-2xl font-bold text-dark-blue text-center w-full md:w-auto md:mx-auto">
                                    Profil de {aideData?.name}
                                </h2>

                                <Form {...form}>
                                    <form
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
                                                            <div
                                                                className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1">
                                                                <label
                                                                    htmlFor="profileImageInput"
                                                                    className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden">
                                                                    {preview ? (
                                                                        <img src={preview} alt="Preview"
                                                                             className="h-full w-full object-cover"/>
                                                                    ) : (
                                                                        <UserRoundPlus
                                                                            className="h-12 w-12 text-white"/>
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
                                                                        // if (e.target.files?.[0]) {
                                                                        //   const file = e.target.files[0];
                                                                        //   field.onChange(file);

                                                                        //   const reader = new FileReader();
                                                                        //   reader.readAsDataURL(file);
                                                                        //   reader.onload = () => {
                                                                        //     const base64String = reader.result as string;
                                                                        //     setPreview(base64String);
                                                                        //   };
                                                                        // }
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                                    </FormItem>
                                                );
                                            }}
                                        />

                                        {tempImage && (
                                            <CropModal
                                                imageSrc={tempImage}
                                                onClose={() => setTempImage(null)}
                                                onCropComplete={croppedFile => {
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
                                        <div className="space-y-4">

                                            <Label
                                                className="text-muted-foreground mr-4 mb-2">{t("forms.aidant_is_aide")}</Label>


                                            <FormField
                                                control={form.control}
                                                name="aidant_is_aide"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div
                                                                className="flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-4">
                                                                {/* Oui */}
                                                                <label
                                                                    className="flex items-center gap-3 px-3 py-2 rounded-md  cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={field.name}
                                                                        value="oui"
                                                                        checked={field.value === "oui"}
                                                                        onChange={field.onChange}
                                                                        className="h-5 w-5 accent-dark-pink"
                                                                    />
                                                                    <span
                                                                        className="text-dark-pink text-sm font-bold">{t("forms.oui")}</span>
                                                                </label>

                                                                {/* Non */}
                                                                <label
                                                                    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={field.name}
                                                                        value="non"
                                                                        checked={field.value === "non"}
                                                                        onChange={field.onChange}
                                                                        className="h-5 w-5 accent-dark-pink"
                                                                    />
                                                                    <span
                                                                        className="text-dark-pink text-sm font-bold">{t("forms.non")}</span>
                                                                </label>

                                                                {/* Peut-Être */}
                                                                <label
                                                                    className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                                    <input
                                                                        type="radio"
                                                                        name={field.name}
                                                                        value="peut-etre"
                                                                        checked={field.value === "peut-etre"}
                                                                        onChange={field.onChange}
                                                                        className="h-5 w-5 accent-dark-pink"
                                                                    />
                                                                    <span
                                                                        className="text-dark-pink text-sm font-bold">{t("forms.maybe")}</span>
                                                                </label>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <div className="space-y-4">
                                            {/* Form Label on the same line as options */}
                                            <div className="flex flex-col md:flex-row items-center">
                                                <Label
                                                    className="text-muted-foreground mr-4 mb-2">{t("forms.they")}</Label>
                                                <FormField
                                                    control={form.control}
                                                    name="gender"
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
                                                            <FormMessage
                                                                className="text-logo-red font-bold xl:text-md"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>

                                        {/* Form Fields */}
                                        <FormField
                                            control={form.control}
                                            name="name"
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
                                                                title={t("forms.first_name_aide")}
                                                                placeholder={t("forms.first_name_aide") + "*"}
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
                                            name="age"
                                            render={({field}) => (
                                                <FormItem>
                                                    <div className="flex items-center">
                                                        <div className="relative flex-1">
                                                            <Select onValueChange={field.onChange}
                                                                    value={field.value || ""}>
                                                                <FormControl>
                                                                    <SelectTrigger
                                                                        title={t("forms.age_aide")}
                                                                        className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                                                                        <Cake
                                                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                                                                            size={20}
                                                                        />
                                                                        <SelectValue
                                                                            placeholder={t("forms.age_aide") + "*"}/>
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
                                                    <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                                        ? {
                                                                            value: String(field.value),
                                                                            label: String(selectedTown || field.value)
                                                                        }
                                                                        : null
                                                                }
                                                                loadOptions={loadOptionsTowns}
                                                                onChange={selected => {
                                                                    field.onChange(selected?.value || "");
                                                                    setSelectedTown(selected?.label || "");
                                                                }}
                                                                placeholder={t("forms.closest_town_aide") + "*"}
                                                                page={1}
                                                                icon={<MapPin size={18} className="text-dark-pink"/>}
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
                                                                        ? {
                                                                            value: String(field.value),
                                                                            label: String(selectedCommune || field.value)
                                                                        }
                                                                        : null
                                                                }
                                                                loadOptions={loadOptionsCommunes}
                                                                onChange={selected => {
                                                                    field.onChange(selected?.value || "");
                                                                    setSelectedCommune(selected?.label || "");
                                                                }}
                                                                placeholder={t("forms.commune_aide") + "*"}
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

                                        <div className="space-y-4">
                                            {/* Form Label on the same line as options */}
                                            <div className="space-y-4">
                                                <Label
                                                    className="flex items-center justify-between text-muted-foreground text-base sm:text-lg">
                                                    Lien avec l'Aidant(e): *
                                                </Label>

                                                <FormField
                                                    control={form.control}
                                                    name="aidant_relation"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <div
                                                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 justify-items-left">
                                                                    {[
                                                                        {value: "ami", label: "Ami"},
                                                                        {value: "famille", label: "Famille"},
                                                                        {value: "travail", label: "Travail"},
                                                                        {value: "pro", label: "Aidant Pro"},
                                                                        {value: "autre", label: "Autre"},
                                                                    ].map(({value, label}) => (
                                                                        <label
                                                                            key={value}
                                                                            className="flex items-left gap-3 px-4 py-2 rounded-md cursor-pointer w-full max-w-[220px] justify-left">
                                                                            <input
                                                                                type="radio"
                                                                                name={field.name}
                                                                                value={value}
                                                                                checked={field.value === value}
                                                                                onChange={field.onChange}
                                                                                className="h-5 w-5 accent-dark-pink"
                                                                            />
                                                                            <span
                                                                                className="text-dark-pink text-md font-bold">{label}</span>
                                                                        </label>
                                                                    ))}
                                                                </div>
                                                            </FormControl>

                                                            <FormMessage
                                                                className="text-logo-red font-bold xl:text-md"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-4">
                                                <FormField
                                                    control={form.control}
                                                    name="origine"
                                                    render={({field}) => (
                                                        <FormItem>
                                                            <CustomSelect
                                                                options={origineList}
                                                                value={
                                                                    field.value
                                                                        ? origineList.find(option => option["value"] === field.value) ?? null
                                                                        : null
                                                                }
                                                                onChange={selected => field.onChange(selected?.value ?? "")}
                                                                placeholder={t("forms.origine_aide")}
                                                                icon={<MapPin size={18} className="text-dark-pink"/>}
                                                                aria-label="Origine" // 👈 for accessibility
                                                            />
                                                            <FormMessage
                                                                className="text-logo-red font-bold xl:text-md"/>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>

                                            {/* Nationality */}
                                            <FormField
                                                control={form.control}
                                                name="nationality"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomAsyncSelect
                                                                    key={Math.random()}
                                                                    value={
                                                                        field.value
                                                                            ? {
                                                                                value: String(field.value),
                                                                                label: String(selectedNationality || field.value)
                                                                            }
                                                                            : null
                                                                    }
                                                                    loadOptions={loadOptionsNationalitiesAide}
                                                                    onChange={selected => {
                                                                        field.onChange(selected?.value || "");
                                                                        setSelectedNationality(selected?.label || "");
                                                                    }}
                                                                    placeholder={t("forms.nationality_aide")}
                                                                    page={1}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                                                    onChange={selected => {
                                                                        const selectedOptions = selected || [];
                                                                        setSelectedLanguageOptions(selectedOptions);
                                                                        form.setValue(
                                                                            "language",
                                                                            selectedOptions.map(item => item.value)
                                                                        ); // IDs only
                                                                    }}
                                                                    placeholder={t("forms.language_aide")}
                                                                    page={1}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="religion"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={religionList}
                                                                    value={
                                                                        field.value
                                                                            ? religionList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.religion_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="education"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={educationList}
                                                                    value={
                                                                        field.value
                                                                            ? educationList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.education_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="height"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={heightList}
                                                                    value={
                                                                        field.value
                                                                            ? heightList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.height_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="silhouette"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={silhouetteList}
                                                                    value={
                                                                        field.value
                                                                            ? silhouetteList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.silhouette_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="smoker"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={smokerList}
                                                                    value={
                                                                        field.value
                                                                            ? smokerList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.smoker_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="tatoo"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelect
                                                                    options={tattooList}
                                                                    value={
                                                                        field.value
                                                                            ? tattooList.find(option => option["value"] === field.value) ?? null
                                                                            : null
                                                                    }
                                                                    onChange={selected => field.onChange(selected?.value)}
                                                                    placeholder={t("forms.tattoo_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-dark-pink"/>}
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
                                                name="kids"
                                                render={({field}) => (
                                                    <FormItem>
                                                        <div className="flex items-center">
                                                            <div className="relative flex-1">
                                                                <CustomSelectMulti
                                                                    options={kidList}
                                                                    value={
                                                                        field.value
                                                                            ? kidList.filter(option => field["value"]?.includes(option["value"]))
                                                                            : []
                                                                    }
                                                                    onChange={selected =>
                                                                        field.onChange(selected?.map((item: {
                                                                            value: string
                                                                        }) => item.value))
                                                                    }
                                                                    placeholder={t("forms.kids_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-[#ce015e]"/>}
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
                                                name="passions"
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
                                                                        field.onChange(selected?.map((item: {
                                                                            value: string
                                                                        }) => item.value))
                                                                    }
                                                                    placeholder={t("forms.passions_aide")}
                                                                    icon={<MapPin size={18}
                                                                                  className="text-[#ce015e]"/>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                                    </FormItem>
                                                )}
                                            />

                                            <div className="flex flex-col space-y-2">
  <Label className="text-muted-foreground mr-4 mb-2">
    Un petit mot sur mon aidé(e): 
  </Label>
  <FormField
    control={form.control}
    name="description"
    render={({ field }) => {
      console.log("Description value:", field.value); // Debug line
      return (
        <FormItem>
          <div className="relative flex-1">
            <Textarea
              title={t("forms.description_text")}
              placeholder={t("forms.description_text")}
              className="resize-y"
              {...field}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {field.value ? field.value.length : 0}/1000 caractères
          </p>
          <FormMessage className="text-logo-red font-bold xl:text-md" />
        </FormItem>
      );
    }}
  />
</div>
                                        </div>

                                        {/* Error Msg */}
                                        {errorMsg &&
                                            <div className="flex justify-center text-light-blue">{errorMsg}</div>}

                                        {/* Submit Button */}
                                        <div className="flex justify-end pt-4 gap-x-5">
                                            {!isLoading ? (
                                                <Button
                                                    type="submit"
                                                    className=" rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto">
                                                    {t("buttons.edit")}
                                                </Button>
                                            ) : (
                                                <Spinner/>
                                            )}
                                        </div>
                                    </form>
                                </Form>
                            </div>
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
                    <ArrowUp className="w-5 h-5"/>
                </button>
            )}
        </div>
    );
};

export default EditAdminAide;
