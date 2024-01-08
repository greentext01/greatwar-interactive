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
  options: { [key: string]: string };
} & React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function Select({
  options,
  register,
  name,
  registerArgs,
  ...props
}: Props) {
  return (
    <select
      className="bg-themered-900 rounded-lg h-10 px-1 w-full focus-visible:outline-none text-white/90"
      {...register(name, registerArgs)}
      {...props}
    >
      {Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>
          {v}
        </option>
      ))}
    </select>
  );
}
