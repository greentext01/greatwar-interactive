import { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "./Input";
import Error from "../misc/Error";
import { FormValsType } from "./NewPostForm";

type Props = {
  register: UseFormRegister<FormValsType>;
  namePrefix: "start" | "end";
  errors: FieldErrors<FormValsType>;
};

export default function DateRangePicker({
  register,
  namePrefix,
  errors,
}: Props) {
  return (
    <>
      <div className="flex gap-2">
        <Input
          placeholder="Year (4 digits)"
          type="number"
          className="bg-themered-900 rounded-lg h-10 px-2 w-full focus-visible:outline-none text-white/90 placeholder:text-themered-200"
          name={`${namePrefix}Year`}
          register={register}
          registerArgs={{
            valueAsNumber: true,
            validate: (value: number) =>
              value <= new Date().getFullYear() || "Please select a valid year",
          }}
        />
        <Input
          placeholder="Month (2 digits)"
          type="number"
          className="bg-themered-900 rounded-lg h-10 px-2 w-full focus-visible:outline-none text-white/90 placeholder:text-themered-200"
          name={`${namePrefix}Month`}
          register={register}
          registerArgs={{
            valueAsNumber: true,
            validate: (value: number) =>
              (0 < value && value <= 12) || "Please select a valid month",
          }}
        />
        <Input
          placeholder="Day (2 digits)"
          type="number"
          className="bg-themered-900 rounded-lg h-10 px-2 w-full focus-visible:outline-none text-white/90 placeholder:text-themered-200"
          name={`${namePrefix}Day`}
          register={register}
          registerArgs={{
            valueAsNumber: true,
            validate: (value: number) =>
              (0 < value && value <= 31) || "Please select a valid day",
          }}
        />
      </div>
      {(errors[`${namePrefix}Day`] ||
        errors[`${namePrefix}Month`] ||
        errors[`${namePrefix}Year`] ||
        errors[namePrefix]?.message) && (
        <>
          {errors[namePrefix]?.message ? (
            <Error>{errors[namePrefix]?.message?.toString()}</Error>
          ) : (
            <Error>Please enter a valid date</Error>
          )}
        </>
      )}
    </>
  );
}
