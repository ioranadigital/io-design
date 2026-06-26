"use client";
import parse from "html-react-parser";
import { OptimizedImage } from "@/components";
import { FC } from "react";

interface SectionTitle2Props {
  Title: string;
  SubTitle?: string;
}

const SectionTitle2: FC<SectionTitle2Props> = ({ Title, SubTitle }) => {
  return (
    <div>
      {SubTitle && (
        <p className="title" data-aos="fade-left" data-aos-duration="800">
          {" "}
          <span className="span">
            <OptimizedImage
              src="/assets/img/logo/main-span3.svg"
              alt="img"
              width={20}
              height={20}
            />
            {parse(SubTitle)}
          </span>
        </p>
      )}
      <h2 className="text-anime-style-3">{parse(Title)}</h2>
    </div>
  );
};

export default SectionTitle2;
