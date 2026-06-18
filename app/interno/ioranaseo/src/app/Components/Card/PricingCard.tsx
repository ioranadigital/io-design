"use client";

import Link from "next/link";
import { FC, useState } from "react";

interface PricingCardProps {
  addclass: string;
  title: string;
  content: string;
  FeatureList?: string[];
  price: string;
  pricename: string;
  btnurl: string;
  btnname: string;
}

const PricingCard: FC<PricingCardProps> = ({
  addclass,
  title,
  content,
  FeatureList,
  price,
  pricename,
  btnurl,
  btnname,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={addclass}
      data-aos="fade-up"
      data-aos-duration="900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 20px 40px rgba(77, 50, 165, 0.15)"
          : "0 5px 15px rgba(0, 0, 0, 0.08)",
      }}
    >
      <h6>{title}</h6>
      <p>{content}</p>
      <ul className="pricing-list">
        {FeatureList?.map((item, index) => (
          <li key={index}>
            <span>
              <i className="bi bi-check-lg"></i>
            </span>{" "}
            {item}
          </li>
        ))}
      </ul>
      <div className="head-text">
        <h3>
          {price}
          <span>/{pricename}</span>
        </h3>
      </div>
      <div className="button">
        <Link className="theme-btn1" href={btnurl}>
          {btnname}{" "}
          <span>
            <i className="bi bi-arrow-right"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PricingCard;
