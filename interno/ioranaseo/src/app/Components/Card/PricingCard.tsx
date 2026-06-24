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
  badge?: string;
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
  badge,
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
        display: "flex",
        flexDirection: "column",
        minHeight: "700px",
        position: "relative",
      }}
    >
      {badge && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            backgroundColor: "#FF8C00",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "700",
            zIndex: 10,
          }}
        >
          {badge}
        </div>
      )}
      <div style={{ flex: 1 }}>
        <h6>{title}</h6>
        <p>{content}</p>
        <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
          {FeatureList?.map((item, index) => {
            const isTodoDel = item.startsWith("Todo del");
            return (
              <li
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                  color: isTodoDel
                    ? "#FF8C00"
                    : isHovered
                      ? "#ffffff"
                      : "inherit",
                  fontWeight: isTodoDel ? "700" : "normal",
                }}
              >
                {isTodoDel ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "20px",
                      height: "20px",
                      minWidth: "20px",
                      borderRadius: "50%",
                      backgroundColor: isHovered ? "#ffffff" : "#FF8C00",
                      color: "#4D32A5",
                      fontSize: "12px",
                      fontWeight: "bold",
                      flexShrink: 0,
                    }}
                  >
                    +
                  </div>
                ) : (
                  <span
                    style={{
                      color: isHovered ? "#ffffff" : "#4D32A5",
                      fontWeight: "bold",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "20px",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                )}
                <span>{item}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ marginTop: "auto" }}>
        <div className="head-text">
          <h3>
            {price}
            <span>/{pricename}</span>
          </h3>
        </div>
        <div className="button" style={{ width: "100%" }}>
          <Link
            className="theme-btn1"
            href={btnurl}
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              padding: "12px 20px",
            }}
          >
            {btnname}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
