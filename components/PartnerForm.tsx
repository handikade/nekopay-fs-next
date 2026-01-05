"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Card>
      <CardHeader>
        <CardTitle>Create a Partner</CardTitle>
        <CardDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="partner_number">Partner Number</Label>
              <Input
                id="partner_number"
                {...register("partner_number")}
                placeholder="e.g. PN001"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register("email")}
                placeholder="e.g dika@nekopay.id"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="e.g. 08123456789"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PartnerForm;
