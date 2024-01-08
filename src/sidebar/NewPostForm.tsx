import Input from "./Input";
import Select from "./Select";
import DateRangePicker from "./DateRangePicker";
import FormField from "./FormField";
import ReactQuill from "react-quill";
import { useStickyState as usePersistentState } from "../misc/util";
import useFormPersist from "react-hook-form-persist";
import ErrorComponent from "../misc/Error";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { makePost } from "../misc/postFns";
import { auth } from "../main";

export interface FormValsType extends FieldValues {
  title: string;
  startYear: number;
  startMonth: number;
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  type: "info" | "battle" | "event" | "context" | "important";
  coordinates: string;
  start?: string;
  end?: string;
  description?: string;
}

export interface NewPostData extends FormValsType {
  id: string;
  delta: string;
}

type Props = {
  post?: NewPostData;
};

export default function NewPostForm({ post }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<FormValsType>({
    defaultValues: post,
  });
  const [value, setValue] = usePersistentState(
    post?.delta ?? "",
    post ? `editPostDesc${post.id}` : "newPostDescription"
  );
  const quillRef = useRef<ReactQuill>(null);
  const [user] = useAuthState(auth);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useFormPersist("newPostForm", {
    watch,
    setValue: setFormValue,
    storage: window.localStorage,
  });

  const onSubmit = (formData: any) => {
    setSubmitDisabled(true);
    toast
      .promise(makePost(user, formData, setError, quillRef, post?.id), {
        error: (err) => {
          console.error(err);
          return err.message;
        },
        success: (msg) => {
          if (!post) setValue("");
          reset();
          return msg;
        },
        loading: "Posting...",
      })
      .finally(() => setSubmitDisabled(false));
  };

  return (
    <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="font-bold text-3xl text-white text-center mb-1">
        {post ? "Edit" : "New"} historical event
      </h1>
      <h3 className="text-themered-200 text-center mb-4">
        This form autosaves; no need to worry about losing your progress!
      </h3>

      <FormField title="Title">
        <Input
          register={register}
          name="title"
          registerArgs={{
            required: { value: true, message: "Please enter a title" },
          }}
        />
        {errors.title?.message && (
          <ErrorComponent>{errors.title.message.toString()}</ErrorComponent>
        )}
      </FormField>

      <FormField title="Event type">
        <Select
          register={register}
          name="type"
          options={{
            battle: "Battle",
            event: "Event",
            context: "Context",
            info: "Info",
            important: "Important",
          }}
          registerArgs={{
            required: {
              value: true,
              message: "Please select an event type",
            },
            validate: (value) =>
              ["battle", "event", "context", "info", "important"].find(
                (v) => v === value
              ) !== undefined || "Please select a valid event type",
          }}
        />
        {errors.type?.message && (
          <ErrorComponent>{errors.type.message.toString()}</ErrorComponent>
        )}
      </FormField>

      <FormField title="Start date">
        <DateRangePicker
          namePrefix="start"
          register={register}
          errors={errors}
        />
      </FormField>

      <FormField title="End date">
        <DateRangePicker namePrefix="end" register={register} errors={errors} />
      </FormField>

      <FormField title="Coordinates (in any valid format)">
        <Input
          register={register}
          name="coordinates"
          placeholder="50°00′56″N 02°41′51″E"
        />
        {errors.coordinates?.message && (
          <ErrorComponent>
            {errors.coordinates.message.toString()}
          </ErrorComponent>
        )}
      </FormField>

      <FormField title="Description">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={setValue}
          className="bg-themered-950 rounded-lg fill-white"
          scrollingContainer="true"
        />
        {errors.description?.message && (
          <ErrorComponent>
            {errors.description.message.toString()}
          </ErrorComponent>
        )}
      </FormField>

      <input
        type="submit"
        value="Post"
        disabled={submitDisabled}
        className="bg-themeblue-300 disabled:bg-themeblue-300/80 disabled:text-gray-300/50 rounded-lg h-12 text-lg px-2 w-full focus-visible:outline-none text-white/90 font-bold mt-5 shadow-inner shadow-white/20"
      />
    </form>
  );
}
