import { useLazyScrapeDetailQuery } from "@/lib/slices/service";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { IoEarthOutline, IoLogoInstagram } from "react-icons/io5";
import { BsInfoCircle } from "react-icons/bs";
import { CiLocationOn, CiTwitter, CiCamera } from "react-icons/ci";
import { FiFacebook, FiLinkedin, FiPhoneCall } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";

const DetailPage = () => {
  const { scrapeId } = useParams();
  const [scrapeDetail, { data, isLoading, isError, isSuccess }] =
    useLazyScrapeDetailQuery();

  useEffect(() => {
    if (scrapeId) {
      scrapeDetail(scrapeId);
    }
  }, [scrapeId]);
  return (
    <div className="p-2 m-auto max-w-screen-xl w-full">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-black ">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href={`/scrape/${scrapeId}`}
                className="text-black "
              >
                {data?.data?.name || " "}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="rounded-md shadow-md bg-white mt-1 sm:mt-3 p-5 flex flex-col sm:flex-row gap-4 sm:gap-7">
        <div className="">
          {/* logo */}
          <img
            src={data?.data?.logoUrl}
            alt=""
            className="bg-red h-40 w-36 bg-black rounded-md object-contain px-2"
          />
        </div>
        <div className="">
          <p className="text-2xl font-bold">{data?.data?.name || "N/A"}</p>
          <div className="flex flex-col sm:flex-row  mt-3 gap-3 sm:gap-10">
            <div className="flex flex-col basis-1/2 ">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <BsInfoCircle size={18} />
                Description
              </span>
              <span className="">{data?.data?.description || "N/A"}</span>
            </div>
            <span className="border hidden sm:block"></span>
            <div className="flex basis-1/2 flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-[#64748B] text-sm flex items-center gap-2">
                  <FiPhoneCall size={18} />
                  Phone
                </span>
                <span>{data?.data?.phone || "N/A"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#64748B] text-sm flex items-center gap-2">
                  <MdOutlineEmail size={18} />
                  Email
                </span>
                <span className="">{data?.data?.email || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mt-1 sm:mt-3 gap-3">
        <div className="w-[100%] sm:w-[33%]">
          <div className="flex flex-col gap-4 basis-1 sm:basis-1/3 border bg-white p-5  rounded-md shadow-md">
            <p className="font-bold text-lg">Company Details</p>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <IoEarthOutline size={18} />
                Website
              </span>
              <a href={data?.data?.webUrl} target="_blank">
                {data?.data?.webUrl || "N/A"}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <BsInfoCircle size={18} />
                Description
              </span>
              <span>{data?.data?.description || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <MdOutlineEmail size={18} />
                Email
              </span>
              <span>{data?.data?.email || "N/A"}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex item gap-2">
                <FiFacebook size={18} />
                Facebook
              </span>
              <a
                href={data?.data?.socialLinks?.facebook}
                target="_blank"
                className="Break_word"
              >
                {data?.data?.socialLinks?.facebook || "N/A"}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <IoLogoInstagram size={18} />
                Instagram
              </span>
              <a
                href={data?.data?.socialLinks?.instagram}
                target="_blank"
                className="Break_word"
              >
                {data?.data?.socialLinks?.instagram || "N/A"}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <CiTwitter size={18} />
                Twitter
              </span>
              <a
                href={data?.data?.socialLinks?.twitter}
                target="_blank"
                className="Break_word"
              >
                {data?.data?.socialLinks?.twitter || "N/A"}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2 ">
                <FiLinkedin size={18} />
                Linkedin
              </span>
              <a
                href={data?.data?.socialLinks?.linkedin}
                target="_blank"
                className="Break_word"
              >
                {data?.data?.socialLinks?.linkedin || "N/A"}
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[#64748B] text-sm flex items-center gap-2">
                <CiLocationOn size={20} />
                Address
              </span>
              <span>{data?.data?.address || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col basis-1 sm:basis-2/3 gap-5 border bg-white p-5  rounded-md shadow-md">
          <p className="font-bold text-lg flex items-center gap-2">
            <CiCamera size={24} />
            Screenshot of Webpage
          </p>
          <img src={data?.data?.screenshotUrl} alt="" />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
