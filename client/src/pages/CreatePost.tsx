import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";
import { getText } from "./Home";

const radioButtons = [
  "art",
  "science",
  "technology",
  "cinema",
  "design",
  "food",
];

export default function CreatePost() {
  const state = useLocation().state;
  const [value, setValue] = useState<string>(state?.title || "");
  const [title, setTitle] = useState<string>(state?.desc || "");
  const [file, setFile] = useState<string | Blob>("");
  const [category, setCategory] = useState<string>(state?.category || "");

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:8000/api/upload",
        formData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    const imageURL = await uploadImage();
    try {
      state
        ? await axios.put(
            `http://localhost:8000/api/posts/${state.id}`,
            {
              title,
              desc: value,
              category,
              img: file ? imageURL : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `http://localhost:8000/api/posts`,
            {
              title,
              desc: value,
              category,
              img: file ? imageURL : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <div className="flex gap-x-10 pt-10 pb-20">
        <div className="basis-2/3 flex flex-col gap-y-4">
          <input
            type="text"
            placeholder="Your post title"
            className="border border-neutral-300 px-2 py-4 w-full"
            onChange={(e) => setTitle(e.target.value)}
            value={getText(title)!}
          />
          <div>
            <ReactQuill
              className="h-[300px]"
              theme="snow"
              value={value}
              onChange={setValue}
            />
          </div>
        </div>
        <div className="basis-1/3">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-2xl font-bold">Publish Post</h1>
            <div className="flex gap-x-2">
              <span>
                <b>Status: </b>Draft
              </span>
              <span>
                <b>Visibility: </b>Public
              </span>
            </div>
            <input
              type="file"
              id="img-file"
              onChange={(e) => setFile(e.target.files![0])}
            />
            <div className="flex gap-2 items-start">
              <button className="px-8 py-2 bg-neutral-700 text-white">
                Save as draft
              </button>
              <button
                className="px-8 py-2 bg-neutral-700 text-white"
                onClick={handleSubmit}
              >
                Puplish
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 py-4">
            {radioButtons.map((radioButton) => (
              <div className="flex gap-x-4 items-center" key={radioButton}>
                <input
                  type="radio"
                  value={radioButton}
                  onChange={(e) => setCategory(e.target.value)}
                  checked={category === radioButton}
                />
                <label htmlFor={radioButton} className="capitalize">
                  {radioButton}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
