"use client";
import Image from "next/image";
import Menu from "./Menu";
import Button from "./Button";
import Link from "next/link";
import useMatchBreakpoints from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";
import SVG from "react-inlinesvg";

export default function Navbar() {
  const { isDesktop } = useMatchBreakpoints();
  const mobileMenu = useRef<any>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (showOverlay && mobileMenu.current) {
        if (!mobileMenu.current.contains(e.target)) {
          setShowOverlay(false);
        }
      } else {
        return;
      }
    });
    return document.removeEventListener("click", () => {
      setShowOverlay(false);
    });
  }, [showOverlay]);
  return isDesktop ? (
    <div className="navbar">
      <Link href={"/"}>
        <Image
          width={125}
          height={32}
          className="logo"
          src="imgs/logo.svg"
          alt="next.id logo"
        />
      </Link>
      <Menu />
      <Link href={"https://mask.io"} target="_blank">
        <Button variant="primary">
          MASK NETWORK
          <Image width={20} height={20} src="imgs/arrow-right.svg" alt="" />
        </Button>
      </Link>
      <Link href={"https://web3.bio/"} target="_blank">
        <Button variant="secondary">
          WEB3.BIO
          <Image width={20} height={20} src="imgs/arrow-right-up.svg" alt="" />
        </Button>
      </Link>
    </div>
  ) : (
    <div className="navbar">
      <Link href={"/"}>
        <Image
          width={60}
          height={32}
          className="logo"
          src="imgs/menu/logo_mobile.svg"
          alt="next.id logo"
        />
      </Link>
      <Image
        style={{
          cursor: "pointer",
        }}
        onClickCapture={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setShowOverlay(true);
        }}
        src={"imgs/menu/menu_mobile.svg"}
        width={24}
        height={24}
        alt="menu"
      />
        <div
          ref={mobileMenu}
          className={`overlay ${showOverlay ? "active-overlay" : ""}`}
        >
          <Link href={"/"}>
            <SVG className="logo" src="imgs/menu/mobile_logo_long.svg" />
          </Link>
          <div className="mobile-menu">
            <div className="mobile-menu-item">
              Products <SVG className="icon" src={"imgs/arrow-down.svg"} />
            </div>
            <div className="sub-menu">
              <Link href={"https://api.web3.bio"} className="sub-item">
                Universal Profile SDK
              </Link>
              <Link href={"https://web3.bio"} className="sub-item">
                <span> Web3 Bio</span>
              </Link>
              <Link href={"https://mask.io"} className="sub-item">
                <span>Mask Extension</span> for X<br />
                <p>(formerly Twitter)</p>
              </Link>
              <Link href={"https://firefly.land"} className="sub-item">
                <span>Firefly App</span>
              </Link>
            </div>
            <div className="divider" />
            <Link href={"/faq"} className="mobile-menu-item">
              FAQ <SVG className="icon" src={"imgs/arrow-right.svg"} />
            </Link>
            <div className="divider" />
            <Link
              href={'"https://mirror.xyz/nextid.eth"'}
              className="mobile-menu-item"
            >
              Community <SVG className="icon" src={"imgs/arrow-right.svg"} />
            </Link>
            <div className="divider" />

            <Link
              href={"https://medium.com/@Next.ID?utm_source=nextid"}
              className="mobile-menu-item"
            >
              Blog <SVG className="icon" src={"imgs/arrow-right.svg"} />
            </Link>
            <div className="divider" />
            <Link href={"/story"} className="mobile-menu-item">
              Our Story <SVG className="icon" src={"imgs/arrow-right.svg"} />
            </Link>
          </div>
          <div className="overlay-footer">
            <div>Experience Next.ID with:</div>
            <Button
              style={{
                width: "100%",
              }}
              variant="third"
            >
              MASK NETWORK <SVG src="imgs/arrow-right.svg" />
            </Button>
            <Button
              style={{
                width: "100%",
              }}
              variant="fifth"
            >
              WEB.BIO <SVG src="imgs/arrow-right.svg" />
            </Button>
          </div>
        </div>
    </div>
  );
}
