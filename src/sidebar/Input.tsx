import {
  FieldPath,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormValsType } from "./NewPostForm";

type Props = {
  register: UseFormRegister<FormValsType>;
  registerArgs?: RegisterOptions<FormValsType, FieldPath<FormValsType>>;
  name: keyof FormValsType;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input({ register, name, registerArgs, ...props }: Props) {
  return (
    <input
      type="text"
      autoComplete="false"
      className="bg-themered-900 rounded-lg h-10 px-2 w-full focus-visible:outline-none text-white/90 placeholder:text-themered-200"
      {...register(name, registerArgs)}
      {...props}
    />
  );
}
