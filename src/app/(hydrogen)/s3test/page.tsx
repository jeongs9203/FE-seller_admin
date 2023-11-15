'use client';
import AWS from "aws-sdk";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import React, { useState } from "react";
import Image from 'next/image'

export default function Home() {
  const [file, setFile] = React.useState<File | null>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [show, setShow] = React.useState<string>("hidden");
  const [s3location, setS3location] = useState<string>("");

  AWS.config.update({
    region: process.env.AWS_REGION as string,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("file", file);
    if (!file) {
      return;
    }

    const upload = new AWS.S3.ManagedUpload({
      params: {
        ACL: "public-read",
        Body: file,
        Key: "contents/" + file.name,
        Bucket: process.env.AWS_BUCKET_NAME as string,
      },
    });

    const promise = upload.promise();
    setS3location((await promise).Location)
    console.log("promise", (await promise).Location);

  };

  React.useEffect((): void => {
    if (message.length > 0) {
      setShow("block");
    }
  }, [show, message]);

  return (
    <main>
      <div className="bg-white h-screen sm:h-full sm:py-24">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
            <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Upload a File to S3
            </h2>
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 flex max-w-md gap-x-4"
            >
              <input
                id="file"
                type="file"
                className="cursor-pointer min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files) {
                    setFile(files[0]);
                  }
                }}
                accept="image/png, image/jpeg, image/jpg"
              />
              <button
                className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                type="submit"
                disabled={uploading}
              >
                Upload
              </button>
            </form>
            <div className={`pt-2 relative ${show}`}>
              <div className="absolute left-[40%] mx-auto rounded-md bg-white/5 px-3.5 py-4 text-white">
                {message}
              </div>
            </div>
            <svg
              viewBox="0 0 1024 1024"
              className="absolute left-1/2 top-1/2 -z-10 sm:h-[64rem] w-[64rem] -translate-x-1/2"
              aria-hidden="true"
            >
              <circle
                cx={512}
                cy={512}
                r={512}
                fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
                fillOpacity="0.7"
              />
              <defs>
                <radialGradient
                  id="759c1415-0410-454c-8f7c-9a820de03641"
                  cx={0}
                  cy={0}
                  r={1}
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(512 512) rotate(90) scale(512)"
                >
                  <stop stopColor="#7775D6" />
                  <stop offset={1} stopColor="#E935C1" stopOpacity={0} />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      {
        s3location &&  <Image src={s3location} width={200} height={200} alt='s3' />
      }
    </main>
  );
}