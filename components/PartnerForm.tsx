"use client";

import NekoButton from "@/components/NekoButton";
import { createPartnerDto } from "@/modules/partner/dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const PartnerForm = () => {
  const [submitResult, setSubmitResult] = useState<string>("");

  const dto = createPartnerDto.omit({
    user_id: true,
    created_by: true,
    address_line1: true,
    address_line2: true,
    regency: true,
    city: true,
    province: true,
    postal_code: true,
    country: true,
    business_entity: true,
    company_phone: true,
    name: true,
    type: true,
  });
  type FormValues = z.infer<typeof dto>;

  const { register, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(dto),
    mode: "onBlur",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    alert("Submitted!");
  };

  const onError: SubmitErrorHandler<FormValues> = (errors) => {
    console.error("ERROR:", errors);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-4 p-6 bg-white shadow rounded-lg "
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="partner_number"
            className="block text-sm font-medium text-gray-700"
          >
            Partner Number
          </label>
          <input
            id="partner_number"
            {...register("partner_number")}
            placeholder="Partner Number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:text-gray-500 placeholder:italic text-blue-950"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            placeholder="Email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:text-gray-500 placeholder:italic text-blue-950"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            id="phone"
            {...register("phone")}
            placeholder="Phone"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm placeholder:text-gray-500 placeholder:italic text-blue-950"
          />
        </div>
      </div>

      <div className="flex items-center justify-end">
        <NekoButton type="submit" child="Nyan!"></NekoButton>
      </div>
    </form>
  );
};

export default PartnerForm;
