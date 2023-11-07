"use client";
import Image from "next/image";
import Menu from "./Menu";
import Button from "./Button";
import Link from "next/link";
import useMatchBreakpoints from "@/utils/hooks";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const { isDesktop } = useMatchBreakpoints();
  const mobileMenu = useRef<any>(null)
  const [showOverlay, setShowOverlay] = useState(false);
    useEffect(()=>{
      document.addEventListener('click',(e)=>{
          if(showOverlay &&  mobileMenu.current){
            if(!mobileMenu.current.contains(e.target)){
              setShowOverlay(false)
            }
          }
      })
      return document.removeEventListener('click',()=>{
        setShowOverlay(false)
      })
    },[])
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
        onClick={() => setShowOverlay(true)}
        src={"imgs/menu/menu_mobile.svg"}
        width={24}
        height={24}
        alt="menu"
      />
      {showOverlay && <div ref={mobileMenu} className="overlay">2</div>}
    </div>
  );
}
