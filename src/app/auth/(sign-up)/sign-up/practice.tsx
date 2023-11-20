"use client";
import { useAppContext } from "@/provider/AppContextProvider";
import { DaumAddressType } from "@/type/DaumAddressType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "../atom/Input";
import DaumPostCode from "../module/DaumPostCode";

type UserInfo = {
  name: string
  phoneNumber: string
}


export default function FromInfo() {
  const router = useRouter();
  const { appValueList, handleAppRecord } = useAppContext();
  const [activeChk, setActiveChk] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [address, setAddress] = useState<DaumAddressType[]>();


  useEffect(() => {
    if (localStorage.getItem("registerUser")) {
      setUserInfo(JSON.parse(localStorage.getItem("registerUser") as string));
    }
  }, []);

  useEffect(() => {
    if (address) {
      handleAppRecord("userZipCode", address[0] as unknown as string);
      handleAppRecord("userAddress", address[1] as unknown as string);
    }
  }, [address]);


  return (
    <>
      <div className="flex flex-col gap-y-5 py-10 px-5">
        <div className="space-y-2">
          <Input
            className="rounded-lg"
            id="userZipCode"
            title={"자택주소"}
            type="text"
            disabled
          >
            우편번호
          </Input>
          <div className="flex gap-x-2">
            <Input
              className="w-full rounded-lg"
              id="userAddress"
              type="text"
              disabled
            />
            <DaumPostCode setAddress={setAddress} isView={false} setIsView={undefined} >우편번호 찾기</DaumPostCode>
          </div>
          <Input className="rounded-lg" id="userAddressDetail" type="text">
            상세주소
          </Input>
        </div>
      </div>


    </>
  );
}