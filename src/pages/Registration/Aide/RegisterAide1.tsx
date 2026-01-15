import * as z from "zod";
import {useEffect, useRef, useState} from "react";
import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowLeft, ArrowRight, Cake, MapPin, UserRound, UserRoundPlus} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useFormContext} from "@/context/FormContext";

import Logo from "../../../assets/Logo/logo-blanc.png";
import ProgressBar2 from "../../../assets/Register/progress-bar-2.png";
import Background0 from "../../../assets/Register/background-0.png";
import {getAllLists, loadOptionsCommunes, loadOptionsTowns} from "@/services/ListService";
import {ListModel} from "@/models/ListModel";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import CropModal from "@/components/modals/CropModal";
import {useUser} from "@/context/AuthContext";
import {useTranslation} from "react-i18next";
import {getFormSchemaRegisterAide} from "@/schemas/registerSchema";
import MessageModal from "@/components/modals/MessageModal";

interface RegisterAide1Props {
    aideEmail?: string;
    onNext: () => void;
    onCancel: () => void;
}

const RegisterAide1 = ({aideEmail, onNext, onCancel}: RegisterAide1Props) => {
    const navigate = useNavigate();
    const {user} = useUser();
    const {t} = useTranslation();
    const formSchema = getFormSchemaRegisterAide(t);
    const [searchParams] = useSearchParams();
    const gdprAideId = searchParams.get('gdpr_aide_id');

    const {formDataAide, setFormDataAide} = useFormContext();
    const [ageList, setAgeList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedCommune, setSelectedCommune] = useState<string>();
    const [selectedTown, setSelectedTown] = useState<string>();

    const logoRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: formDataAide, // Load saved values
    });
    const watchedValues = useWatch({control: form.control});

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
                errorElement.scrollIntoView({behavior: "smooth", block: "start"});
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
        setSelectedCommune(formDataAide.commune_name);
        setSelectedTown(formDataAide.closest_town_name);
    }, [formDataAide.closest_town_name, formDataAide.commune_name]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [preview, setPreview] = useState<any>(formDataAide?.profile_pic); // State for the image preview
    const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview

    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        if (!user) return;

        const relation = user.ProfileAidant?.profile_type_id !== 1 ? "pro" : "ami";
        form.setValue("aidant_relation", relation);
    }, [user, form]);

    useEffect(() => {
        if (aideEmail) {
            form.setValue("email", aideEmail);
        }
    }, [aideEmail, form]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setFormDataAide((prev: any) => ({
            ...prev,
            ...watchedValues,
            profile_pic: watchedValues.profile_pic ? preview : null,
            commune_name: selectedCommune ?? formDataAide.commune_name,
            closest_town_name: selectedTown ?? formDataAide.closest_town_name,
            aidant_relation: watchedValues.aidant_relation,
            step: 2,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watchedValues, setFormDataAide, preview]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setErrorMsg("");
        console.log(values);

        if (gdprAideId) {
            navigate(`/register/aide/2?gdpr_aide_id=${gdprAideId}`);
        } else {
            navigate("/register/aide/2");
        }
    };

    const onError = (errors: unknown) => {
        console.log("Form errors:", errors);
    };

    return (
        <div className="min-h-screen px-8 py-4 font-quicksand_regular" style={{backgroundImage: `url(${Background0})`}}>
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
                    <img src={ProgressBar2} alt="Progress2" className="flex"/>
                </div>

                {/* Form Card */}
                <div className="rounded-3xl bg-white p-8 shadow-lg mt-8">
                    <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">{t("registration.aide")}</h2>
                    <Form {...form}>
                        <form
                            ref={formRef}
                            onSubmit={(e) => {
                                e.preventDefault();
                                console.log("Form submission triggered!", formDataAide);

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
                            <span
                                className="text-logo-red font-bold xl:text-md">{t("forms.image") + " (facultatif)"}</span>
                                                <div
                                                    className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1">
                                                    <label
                                                        htmlFor="profileImageInput"
                                                        className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden">
                                                        {preview ? (
                                                            <img src={preview} alt="Preview"
                                                                 className="h-full w-full object-cover"/>
                                                        ) : (
                                                            <UserRoundPlus className="h-12 w-12 text-white"/>
                                                        )}
                                                    </label>
                                                    <input
                                                        id="profileImageInput"
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => {
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
                                    onCropComplete={(croppedFile) => {
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
                            <p className="text-md mb-6 font-quicksand_regular text-center">{t("forms.public_info")}</p>

                            {user?.ProfileAidant?.profile_type_id === 1 && (
                                <>
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
                                </>)
                            }

                            <div className="space-y-4">
                                {/* Form Label on the same line as options */}
                                <div className="flex flex-col md:flex-row items-center">
                                    <Label className="text-muted-foreground mr-4 mb-2">{t("forms.they") + "*"}</Label>
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
                                                            className={`flex-1  min-w-32 h-1/2  rounded-md text-center py-1  px-4 cursor-pointer ${
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger
                                                            title={t("forms.age_aide")}
                                                            className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                                                            <Cake
                                                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                                                                size={20}
                                                            />
                                                            <SelectValue placeholder={t("forms.age_aide") + "*"}/>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {ageList.map((age: ListModel) => (
                                                            <SelectItem key={age.id} value={String(age.id)}>
                                                                {age.title} {t("forms.old")}
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
                                                    onChange={(selected) => {
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
                                                    onChange={(selected) => {
                                                        field.onChange(selected?.value || "");
                                                        setSelectedCommune(selected?.label || "");
                                                    }}
                                                    placeholder={t("forms.commune_aide") + "*"}
                                                    page={1}
                                                    icon={<MapPin size={18} className="text-dark-pink"/>}
                                                />
                                            </div>
                                        </div>
                                        <p className="text-light-blue text-xs">{t("forms.private_field")}</p>

                                        <FormMessage className="text-logo-red font-bold xl:text-md"/>
                                    </FormItem>
                                )}
                            />

                            <div className="space-y-4">
                                <Label
                                    className="flex items-center justify-between text-muted-foreground text-base sm:text-lg">
                                    {t("forms.aidant_relation")}
                                </Label>

                                <FormField
                                    control={form.control}
                                    name="aidant_relation"
                                    render={({field}) => (
                                        <FormItem>
                                            {user?.ProfileAidant?.profile_type_id == 2 ? (
                                                <FormControl>
                                                    <div
                                                        className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-4 justify-center">
                                                        {/* Pro */}
                                                        <label
                                                            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value="pro"
                                                                checked={field.value === "pro"}
                                                                onChange={field.onChange}
                                                                className="h-5 w-5 accent-dark-pink"
                                                            />
                                                            <span
                                                                className="text-dark-pink text-lg font-bold">{t("forms.pro")}</span>
                                                        </label>
                                                    </div>
                                                </FormControl>
                                            ) : (
                                                <FormControl>
                                                    <div
                                                        className="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-4 justify-center">
                                                        {/* Ami */}
                                                        <label
                                                            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value="ami"
                                                                checked={field.value === "ami"}
                                                                onChange={field.onChange}
                                                                className="h-5 w-5 accent-dark-pink"
                                                            />
                                                            <span
                                                                className="text-dark-pink text-md font-bold">{t("forms.ami")}</span>
                                                        </label>

                                                        {/* Famille */}
                                                        <label
                                                            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value="famille"
                                                                checked={field.value === "famille"}
                                                                onChange={field.onChange}
                                                                className="h-5 w-5 accent-dark-pink"
                                                            />
                                                            <span
                                                                className="text-dark-pink text-md font-bold">{t("forms.family")}</span>
                                                        </label>

                                                        {/* Travail */}
                                                        <label
                                                            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value="travail"
                                                                checked={field.value === "travail"}
                                                                onChange={field.onChange}
                                                                className="h-5 w-5 accent-dark-pink"
                                                            />
                                                            <span
                                                                className="text-dark-pink text-md font-bold">{t("forms.work")}</span>
                                                        </label>

                                                        {/* Autre */}
                                                        <label
                                                            className="flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer">
                                                            <input
                                                                type="radio"
                                                                name={field.name}
                                                                value="autre"
                                                                checked={field.value === "autre"}
                                                                onChange={field.onChange}
                                                                className="h-5 w-5 accent-dark-pink"
                                                            />
                                                            <span
                                                                className="text-dark-pink text-md font-bold">{t("forms.autre")}</span>
                                                        </label>
                                                    </div>
                                                </FormControl>
                                            )}

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
                                                navigate("/compte/profils-aides")
                                                onCancel();
                                            } else {
                                                // Normal registration - show modal
                                                setIsModalOpen(true);
                                            }
                                        }}
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                                        <ArrowLeft className="text-white" strokeWidth={4} size={18}/>
                                    </button>
                                </div>

                                {/* Right - Suivant */}
                                <div className="flex items-center gap-4">
                                    <span
                                        className="hidden xl:block text-lg font-bold text-dark-pink">{t("buttons.next")}</span>
                                    <Button
                                        type="submit"
                                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                                        <ArrowRight className="text-white" strokeWidth={4} size={28}/>
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
            <MessageModal message={t("forms.aide_back")} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
        </div>
    );
};

export default RegisterAide1;
