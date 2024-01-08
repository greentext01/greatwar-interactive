import { UseFormSetError } from "react-hook-form";
import { RefObject } from "react";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import Coordinates from "coordinate-parser";
import { db } from "../main";
import { GeoPoint, addDoc, collection, Timestamp, updateDoc, doc } from "firebase/firestore";
import { User } from "firebase/auth";
import ReactQuill from "react-quill";
import { InfoType, Post } from "./types";
import { FormValsType, NewPostData } from "../sidebar/NewPostForm";


export async function makePost(
  user: User | null | undefined,
  formData: any,
  setError: UseFormSetError<FormValsType>,
  quillRef: RefObject<ReactQuill>,
  originalPostId?: string,
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

  const delta = quillRef.current?.getEditor().getContents().ops ?? [];

  const converter = new QuillDeltaToHtmlConverter(delta);

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
    delta: JSON.stringify(delta),
  };

  if (originalPostId) {
    const docRef = doc(db, "points", originalPostId)
    await updateDoc(docRef, data);
    return "Post updated!"
  } else {
    await addDoc(collection(db, "points"), data);
    return "Post added!"
  }
}

export function firebaseToForm(post: InfoType): NewPostData {
  return {
    title: post.name,
    startYear: post.dateFrom.getUTCFullYear(),
    startMonth: post.dateFrom.getUTCMonth() + 1,
    startDay: post.dateFrom.getUTCDate() + 2,
    endYear: post.dateTo.getUTCFullYear(),
    endMonth: post.dateTo.getUTCMonth() + 1,
    endDay: post.dateTo.getUTCDate() + 2,
    type: post.type,
    coordinates: `${post.coordinates[1]}, ${post.coordinates[0]}`,
    id: post.id,
    delta: JSON.parse(post.delta),
  };
}
