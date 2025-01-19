"use client";

import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faFile, faMapPin } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import HeroTechStack from "./HeroTechStack";

export const Header = () => {
  return (
    <header className="w-full h-full pt-[15%] text-gray-300 ">
      <div className="flex flex-col gap-6">
        <div className=" flex md:flex-row flex-col items-center md:px-0 px-4 justify-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden flex justify-center items-center">
            <Image
              src="/images/profile.png"
              alt="profilePic"
              width={500}
              height={500}
              className="w-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-5xl md:text-6xl">Erik Nivala</h1>
              <h2 className="text-4xl md:text-5xl"> Software Engineer</h2>
            </div>
            <div className="flex flex-row ite gap-2 text-">
              <div className="h-[1rem] flex justify-center items-center">
                <FontAwesomeIcon className="w-full h-full" icon={faMapPin} />
              </div>
              <div>Wisconsin, USA</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-center">
          <a
            className="flex flex-col justify-center items-center w-20 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110"
            target="blank"
            href="https://www.linkedin.com/in/erik-nivala/"
          >
            <div className="h-[1rem]">
              <FontAwesomeIcon className="w-full h-full" icon={faLinkedinIn} />
            </div>
            <div>Linked In</div>
          </a>
          <a
            className="flex flex-col justify-center items-center w-20 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110"
            target="blank"
            href="https://github.com/Lumina97"
          >
            <div className="h-[1rem]">
              <FontAwesomeIcon className="w-full h-full" icon={faGithub} />
            </div>
            <div>GitHub</div>
          </a>
          <a
            className="flex flex-col justify-center items-center w-20 cursor-pointer hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:scale-110"
            download="Erik Nivala Resume.pdf"
            href="/files/resume.pdf"
          >
            <div className="h-[1rem] ">
              <FontAwesomeIcon className="w-full h-full" icon={faFile} />
            </div>
            <div>Resume</div>
          </a>
        </div>
      </div>
      <HeroTechStack />
    </header>
  );
};
