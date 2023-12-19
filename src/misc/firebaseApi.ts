import { FieldValues, UseFormSetError } from "react-hook-form";
import { RefObject } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Coordinates from "coordinate-parser";
import { db } from "../main";
import { GeoPoint, addDoc, collection, Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import ReactQuill from "react-quill";
import { Post } from "./types";

export async function makePost(
  user: User | null | undefined,
  formData: any,
  setError: UseFormSetError<FieldValues>,
  quillRef: RefObject<ReactQuill>
) {
  let errorOccured = false;
  if (!user) {
    throw new Error("Please sign in to make a post");
  }

  formData.start = Date.UTC(
    formData.startYear,
    formData.startMonth - 1,
    formData.startDay
  );
  formData.end = Date.UTC(
    formData.endYear,
    formData.endMonth - 1,
    formData.endDay
  );

  if (formData.start > formData.end) {
    setError("start", {
      message: "Start date must be before end date",
    });
    errorOccured = true;
  }

  if (quillRef.current?.getEditor().getLength() === 0) {
    setError("description", {
      message: "Please enter a description",
    });
    errorOccured = true;
  }

  const converter = new QuillDeltaToHtmlConverter(
    quillRef.current?.getEditor().getContents().ops ?? []
  );

  formData.description = converter.convert();
  // Convert HMS coords to decimal

  try {
    const coordinates = new Coordinates(formData.coordinates);
    delete formData.coordinates;

    formData.latitude = coordinates.getLatitude();
    formData.longitude = coordinates.getLongitude();
  } catch (e) {
    setError("coordinates", {
      message:
        "Please enter valid coordinates (example: 50°00′56″N 02°41′51″E)",
    });
    errorOccured = true;
  }

  if (errorOccured) {
    throw Error("An error was detected in the form");
  }

  const data: Post = {
    body: formData.description,
    coordinates: new GeoPoint(formData.latitude, formData.longitude),
    dateFrom: Timestamp.fromMillis(formData.start),
    dateTo: Timestamp.fromMillis(formData.end),
    name: formData.title,
    type: formData.type,
    ownerId: user.uid,
    ownerName: user.displayName ?? "Anonymous",
  };

  await addDoc(collection(db, "points"), data);
}
