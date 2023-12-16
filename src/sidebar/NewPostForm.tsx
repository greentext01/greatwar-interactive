import { useAtom } from "jotai";
import Close from "../icons/close.svg?react";
import { formShownAtom } from "./Sidebar";
import Input from "./Input";
import Select from "./Select";
import { useForm } from "react-hook-form";
import DateRangePicker from "./DateRangePicker";
import FormField from "./FormField";
import { useRef } from "react";
import ReactQuill from "react-quill";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { useStickyState } from "../util";
import useFormPersist from "react-hook-form-persist";
import Coordinates from "coordinate-parser";
import Error from "./Error";
import { db } from "../main";
import { GeoPoint, addDoc, collection, Timestamp } from "firebase/firestore";

export default function NewPostForm() {
  const [, setFormShown] = useAtom(formShownAtom);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    setValue: setFormValue,
    formState: { errors },
  } = useForm();
  const [value, setValue] = useStickyState("", "newPostDescription");
  const quillRef = useRef<ReactQuill>(null);

  useFormPersist("newPostForm", {
    watch,
    setValue: setFormValue,
    storage: window.localStorage,
  });

  const onSubmit = (data: any) => {
    data.start = Date.UTC(data.startYear, data.startMonth - 1, data.startDay)
    data.end = Date.UTC(data.endYear, data.endMonth - 1, data.endDay)
    
    if (data.start > data.end) {
      setError("start", {
        message: "Start date must be before end date",
      });
    }

    if (quillRef.current?.getEditor().getLength() === 0) {
      setError("description", {
        message: "Please enter a description",
      });
    }

    const converter = new QuillDeltaToHtmlConverter(
      quillRef.current?.getEditor().getContents().ops ?? []
    );

    data.description = converter.convert();
    // Convert HMS coords to decimal
    try {
      const coordinates = new Coordinates(data.coordinates);
      delete data.coordinates;

      data.latitude = coordinates.getLatitude();
      data.longitude = coordinates.getLongitude();
    } catch (e) {
      setError("coordinates", {
        message:
          "Please enter valid coordinates (example: 50°00′56″N 02°41′51″E)",
      });
    }

    if (Object.keys(errors).length !== 0) {
      console.error(errors)
      return
    }

    try {
      console.log(data)
      addDoc(collection(db, "points"), {
        body: data.description,
        coordinates: new GeoPoint(data.latitude, data.longitude),
        dateFrom: Timestamp.fromMillis(data.start),
        dateTo: Timestamp.fromMillis(data.end),
        name: data.title,
        type: data.type,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-[700px] relative">
      <div className="absolute top-10 left-10 right-0 h-[400px] rounded-3xl shadow-evenInset z-10 pointer-events-none" />
      <div className="absolute top-10 left-10 right-0 h-[400px] rounded-3xl overflow-clip p-4 bg-themered-500 resize-x">
        <div
          className="p-4 bg-themered-500 overflow-auto scrollbar-thumb-themered-200 h-full
        scrollbar-track-themered-950 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin"
        >
          <Close
            className="left-4 top-4 w-6 h-6 cursor-pointer absolute bg-red-950/50 rounded-full p-1"
            onClick={() => setFormShown(false)}
          />
          <form className="h-full" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="font-bold text-3xl text-white text-center mb-1">
              New historical event
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
                <Error>{errors.title.message.toString()}</Error>
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
                <Error>{errors.type.message.toString()}</Error>
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
              <DateRangePicker
                namePrefix="end"
                register={register}
                errors={errors}
              />
            </FormField>

            <FormField title="Coordinates (in any valid format)">
              <Input
                register={register}
                name="coordinates"
                placeholder="50°00′56″N 02°41′51″E"
              />
              {errors.coordinates?.message && (
                <Error>{errors.coordinates.message.toString()}</Error>
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
                <Error>{errors.description.message.toString()}</Error>
              )}
            </FormField>

            <input
              type="submit"
              value="Post"
              className="bg-themeblue-300 rounded-lg h-12 text-lg px-2 w-full focus-visible:outline-none text-white/90 font-bold mt-5 shadow-inner shadow-white/20"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
