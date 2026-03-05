"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PhoneInput } from "./PhoneInput";

type TourSummary = {
  title: string;
  date: string;
  priceAmount: string;
  formattedDeposit: string;
  depositAmount: number;
};

interface BookingFormProps {
  tour: TourSummary;
}

const STEPS = [
  "Personal Details",
  "Emergency Contact",
  "Additional Info",
  "Terms & Review",
];

const bookingSchema = z
  .object({
    // STEP 1
    title: z.string().min(1, "Title is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    confirmEmail: z.string().email("Invalid email address"),
    mobile: z.string().min(1, "Mobile number is required"),
    houseName: z.string().min(1, "House name or number is required"),
    street: z.string().min(1, "Street or road name is required"),
    city: z.string().optional(),
    county: z.string().min(1, "County or state is required"),
    country: z.string().min(1, "Country is required"),
    postCode: z.string().min(1, "Post or zip code is required"),

    // STEP 2
    emTitle: z.string().min(1, "Title is required"),
    emFirstName: z.string().min(1, "First name is required"),
    emLastName: z.string().min(1, "Last name is required"),
    emRelationship: z.string().min(1, "Relationship is required"),
    emDayPhone: z.string().min(1, "Daytime phone is required"),
    emEveningPhone: z.string().min(1, "Evening phone is required"),
    emHouseName: z.string().min(1, "house number is required"),
    emStreet: z.string().min(1, "Street is required"),
    emCity: z.string().optional(),
    emCounty: z.string().min(1, "County or state is required"),
    emCountry: z.string().min(1, "Country is required"),
    emPostCode: z.string().min(1, "Post or zip code is required"),

    // STEP 3
    singleSupplement: z.boolean().default(false),
    dietary: z.string().optional(),
    medical: z.string().optional(),
    source: z.string().optional(),
    goals: z.string().optional(),
    social: z.string().optional(),

    // STEP 4
    agreeTerms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must agree to the terms and conditions",
      ),
    agreeInsurance: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must acknowledge the insurance requirement",
      ),
    captcha: z
      .boolean()
      .refine((val) => val === true, "Please complete the CAPTCHA"),
  })
  .superRefine(({ confirmEmail, email }, ctx) => {
    if (confirmEmail !== email) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmEmail"],
      });
    }
  });

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm({ tour }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema) as any,
    mode: "onTouched",
    defaultValues: {
      title: "mr",
      emTitle: "mr",
      singleSupplement: false,
      agreeTerms: false,
      agreeInsurance: false,
      captcha: false,
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof BookingFormData)[] = [];
    if (currentStep === 0) {
      fieldsToValidate = [
        "title",
        "firstName",
        "lastName",
        "email",
        "confirmEmail",
        "mobile",
        "houseName",
        "street",
        "city",
        "county",
        "country",
        "postCode",
      ];
    } else if (currentStep === 1) {
      fieldsToValidate = [
        "emTitle",
        "emFirstName",
        "emLastName",
        "emRelationship",
        "emDayPhone",
        "emEveningPhone",
        "emHouseName",
        "emStreet",
        "emCity",
        "emCounty",
        "emCountry",
        "emPostCode",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "singleSupplement",
        "dietary",
        "medical",
        "source",
        "goals",
        "social",
      ];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid && currentStep < STEPS.length - 1) {
      setCurrentStep((curr) => curr + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((curr) => curr - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const [isRedirecting, setIsRedirecting] = useState(false);

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsRedirecting(true);

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: tour.depositAmount,
          tourTitle: tour.title,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong during booking. Please try again.");
      setIsRedirecting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[1px] bg-gray-200 -z-10"></div>
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[1px] bg-black -z-10 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
          ></div>

          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step} className="flex flex-col items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300
                    ${isActive ? "bg-black text-white border-2 border-black" : ""}
                    ${isCompleted ? "bg-black text-white border-2 border-black" : ""}
                    ${!isActive && !isCompleted ? "bg-white text-gray-400 border-2 border-gray-200" : ""}
                  `}
                >
                  {isCompleted ? <Check size={18} /> : index + 1}
                </div>
                <span
                  className={`text-xs uppercase tracking-widest font-bold hidden md:block w-32 text-center
                    ${isActive ? "text-black" : "text-gray-400"}
                  `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm min-h-[500px] flex flex-col"
      >
        <div className="flex-1">
          {/* STEP 1: Personal Details */}
          <div
            className={
              currentStep === 0
                ? "block animate-in fade-in slide-in-from-right-4 duration-500"
                : "hidden"
            }
          >
            <h2 className="font-serif text-3xl mb-8 pb-4 border-b border-gray-100">
              Your details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Title*
                </label>
                <select
                  {...register("title")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none appearance-none"
                >
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="ms">Ms.</option>
                  <option value="miss">Miss</option>
                  <option value="dr">Dr.</option>
                </select>
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="hidden md:block"></div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  First name*
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Last name*
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Email address*
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Confirm email address*
                </label>
                <input
                  type="email"
                  {...register("confirmEmail")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.confirmEmail && (
                  <p className="text-red-500 text-xs mt-1">
                    Emails do not match
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Mobile telephone number*
                </label>
                <Controller
                  name="mobile"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      defaultCountry="GB"
                      placeholder="Enter phone number"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="hidden md:block"></div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  House name or number*
                </label>
                <input
                  type="text"
                  {...register("houseName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.houseName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.houseName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Street or road name*
                </label>
                <input
                  type="text"
                  {...register("street")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.street && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.street.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Town or city
                </label>
                <input
                  type="text"
                  {...register("city")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  County or state*
                </label>
                <input
                  type="text"
                  {...register("county")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.county && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.county.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Country*
                </label>
                <input
                  type="text"
                  {...register("country")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Post or zip code*
                </label>
                <input
                  type="text"
                  {...register("postCode")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.postCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 2: Emergency Contact */}
          <div
            className={
              currentStep === 1
                ? "block animate-in fade-in slide-in-from-right-4 duration-500"
                : "hidden"
            }
          >
            <h2 className="font-serif text-3xl mb-8 pb-4 border-b border-gray-100">
              Emergency contact
            </h2>
            <p className="text-gray-500 mb-8">
              Details of someone we can contact whilst you are on the trip.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Title*
                </label>
                <select
                  {...register("emTitle")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none appearance-none"
                >
                  <option value="mr">Mr.</option>
                  <option value="mrs">Mrs.</option>
                  <option value="ms">Ms.</option>
                  <option value="miss">Miss</option>
                  <option value="dr">Dr.</option>
                </select>
                {errors.emTitle && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emTitle.message}
                  </p>
                )}
              </div>
              <div className="hidden md:block"></div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  First name*
                </label>
                <input
                  type="text"
                  {...register("emFirstName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emFirstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emFirstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Last name*
                </label>
                <input
                  type="text"
                  {...register("emLastName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emLastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emLastName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Relationship to you*
                </label>
                <input
                  type="text"
                  {...register("emRelationship")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emRelationship && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emRelationship.message}
                  </p>
                )}
              </div>
              <div className="hidden md:block"></div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Daytime telephone*
                </label>
                <Controller
                  name="emDayPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      defaultCountry="GB"
                      placeholder="Enter daytime phone"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.emDayPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emDayPhone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Evening telephone*
                </label>
                <Controller
                  name="emEveningPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      defaultCountry="GB"
                      placeholder="Enter evening phone"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.emEveningPhone && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emEveningPhone.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  House name or number*
                </label>
                <input
                  type="text"
                  {...register("emHouseName")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emHouseName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emHouseName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Street or road name*
                </label>
                <input
                  type="text"
                  {...register("emStreet")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emStreet && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emStreet.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Town or city
                </label>
                <input
                  type="text"
                  {...register("emCity")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  County or state*
                </label>
                <input
                  type="text"
                  {...register("emCounty")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emCounty && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emCounty.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Country*
                </label>
                <input
                  type="text"
                  {...register("emCountry")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emCountry && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emCountry.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                  Post or zip code*
                </label>
                <input
                  type="text"
                  {...register("emPostCode")}
                  className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                />
                {errors.emPostCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.emPostCode.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 3: Additional Info */}
          <div
            className={
              currentStep === 2
                ? "block animate-in fade-in slide-in-from-right-4 duration-500"
                : "hidden"
            }
          >
            <h2 className="font-serif text-3xl mb-8 pb-4 border-b border-gray-100">
              Special Requirements & Info
            </h2>

            <div className="space-y-12">
              <div className="space-y-8">
                <label className="flex items-center gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-6 h-6 border-2 border-gray-300 group-hover:border-black transition-colors rounded-sm">
                    <input
                      type="checkbox"
                      {...register("singleSupplement")}
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <svg
                      className="hidden peer-checked:block w-4 h-4 text-black"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-800 font-medium">
                    Please send me details for single supplements where
                    available
                  </span>
                </label>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                    Dietary requirements
                  </label>
                  <textarea
                    {...register("dietary")}
                    rows={3}
                    placeholder="Please specify any dietary requirements..."
                    className="w-full bg-transparent border border-gray-300 p-4 focus:border-black focus:outline-none transition-colors rounded-sm resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                    Medical conditions
                  </label>
                  <textarea
                    {...register("medical")}
                    rows={3}
                    placeholder="Please specify any medical conditions we should be aware of..."
                    className="w-full bg-transparent border border-gray-300 p-4 focus:border-black focus:outline-none transition-colors rounded-sm resize-none"
                  ></textarea>
                </div>
              </div>

              <div className="space-y-8 pt-8 border-t border-gray-100">
                <h3 className="font-serif text-2xl mb-6">
                  Tell us a little about you
                </h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                    Where did you first hear about ShutterWild?
                  </label>
                  <select
                    {...register("source")}
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none appearance-none"
                  >
                    <option value="">Please select...</option>
                    <option value="friend">Friend</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                    What are the main things you are looking to achieve from
                    this trip?
                  </label>
                  <textarea
                    {...register("goals")}
                    rows={3}
                    className="w-full bg-transparent border border-gray-300 p-4 focus:border-black focus:outline-none transition-colors rounded-sm resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500 block">
                    Which social media sites do you use?
                  </label>
                  <input
                    type="text"
                    {...register("social")}
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:border-black focus:outline-none transition-colors rounded-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 4: Terms & Review */}
          <div
            className={
              currentStep === 3
                ? "block animate-in fade-in slide-in-from-right-4 duration-500"
                : "hidden"
            }
          >
            <h2 className="font-serif text-3xl mb-8 pb-4 border-b border-gray-100">
              Review & Terms
            </h2>

            <div className="bg-gray-50 p-6 border border-gray-100 mb-10 rounded-sm">
              <h3 className="font-serif text-xl mb-4">Summary</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Expedition:</span>
                  <span className="font-medium text-black">{tour.title}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Dates:</span>
                  <span className="font-medium text-black">{tour.date}</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span>Full Price:</span>
                  <span className="font-medium text-black">
                    {tour.priceAmount}
                  </span>
                </li>
                <li className="flex justify-between pb-1">
                  <span>Deposit Due Now:</span>
                  <span className="font-bold text-lg text-black">
                    {tour.formattedDeposit}
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-xl">Terms and conditions</h3>
              <div className="prose prose-sm max-w-none text-gray-600 space-y-4 mb-8 h-40 overflow-y-auto pr-4 border border-gray-200 p-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                <p>
                  1. A reservation is made once a booking form together with a
                  deposit has been received from you and ShutterWild confirms
                  the booking in writing/by e-mail. Provisional reservations can
                  be held for 14 days pending receipt of deposit payment.
                </p>
                <p>
                  2. All deposits and interim payments (where advised) once paid
                  are not refundable. The final balance is payable 60 days
                  before the holiday: the specific date will be advised on
                  confirmation of your booking. Without notice of cancellation
                  prior to the balance payment date, balance monies will remain
                  due and payable.
                </p>
                <p>
                  3. If ShutterWild need to cancel a holiday for any reason, a
                  full refund of the amount paid by you will be made, however
                  ShutterWild can accept no further liability.
                </p>
                <p>
                  4. ShutterWild reserve the right to change the itinerary or
                  leader of any holiday due to circumstances beyond its control.
                </p>
                <p>
                  5. To ensure compliance with Package Travel Regulations, all
                  monies received by ShutterWild will be held in a trust account
                  until the holiday is completed.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-6 h-6 border-2 border-gray-300 group-hover:border-black transition-colors rounded-sm mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      {...register("agreeTerms")}
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <svg
                      className="hidden peer-checked:block w-4 h-4 text-black"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-800 leading-relaxed font-medium">
                    I confirm that I have read the booking conditions and accept
                    them fully for the person named on the booking form*
                  </span>
                </label>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs ml-10 -mt-2">
                    {errors.agreeTerms.message}
                  </p>
                )}

                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-6 h-6 border-2 border-gray-300 group-hover:border-black transition-colors rounded-sm mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      {...register("agreeInsurance")}
                      className="peer absolute opacity-0 w-full h-full cursor-pointer"
                    />
                    <svg
                      className="hidden peer-checked:block w-4 h-4 text-black"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-800 leading-relaxed font-medium">
                    I acknowledge the need to complete an Insurance Indemnity
                    form and will send this to you after booking confirmation*
                  </span>
                </label>
                {errors.agreeInsurance && (
                  <p className="text-red-500 text-xs ml-10 -mt-2">
                    {errors.agreeInsurance.message}
                  </p>
                )}

                {/* Captcha Placeholder */}
                <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-2">
                  <span className="text-sm text-gray-600 font-bold">
                    Please complete the reCAPTCHA below*
                  </span>
                  <div className="bg-gray-100 w-full max-w-[300px] h-20 flex items-center justify-center border border-gray-300 relative">
                    <span className="text-gray-400 text-sm">
                      CAPTCHA Placeholder
                    </span>
                    {/* Simulated Checkbox for validation since it's just a placeholder for now */}
                    <input
                      type="checkbox"
                      {...register("captcha")}
                      className="absolute top-2 right-2 w-4 h-4 cursor-pointer opacity-0"
                      title="Click to verify (Demo)"
                    />
                    {/* Visual Check for the demo captcha */}
                    <Controller
                      name="captcha"
                      control={control}
                      render={({ field }) => (
                        <div
                          className={`absolute left-4 w-6 h-6 border bg-white flex items-center justify-center cursor-pointer ${field.value ? "border-green-500" : "border-gray-300"}`}
                          onClick={() => field.onChange(!field.value)}
                        >
                          {field.value && (
                            <Check size={16} className="text-green-500" />
                          )}
                        </div>
                      )}
                    />
                  </div>
                  {errors.captcha && (
                    <p className="text-red-500 text-xs">
                      {errors.captcha.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={handleBack}
              className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors px-6 py-4"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="bg-black text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting || isRedirecting}
              className="bg-[#2C3E2E] text-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-[#1A261C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || isRedirecting
                ? "Processing..."
                : "Submit Booking Request"}
            </button>
          )}
        </div>
      </form>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .PhoneInputOverride .PhoneInputInput {
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
        }
        .PhoneInputOverride .PhoneInputCountry {
          margin-right: 0.5rem;
        }
      `,
        }}
      />
    </div>
  );
}
