"use client";

import React, { useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { isMobile } from "react-device-detect";

declare global {
  interface Window {
    onUnityQuit?: () => void;
  }
}

export default function SpaceTrace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const warningBanner = useRef<HTMLDivElement>(null);
  const loadingBar = useRef<HTMLDivElement>(null);
  const progressBarEmpty = useRef<HTMLDivElement>(null);
  const progressBarFull = useRef<HTMLDivElement>(null);
  const fullscreenButton = useRef<HTMLDivElement>(null);

  const router = useRouter();

  function unityShowBanner(msg: string, type: string) {
    function updateBannerVisibility() {
      if (warningBanner.current) {
        warningBanner.current!.style.display = warningBanner.current.children
          .length
          ? "block"
          : "none";
      }
    }
    const div = document.createElement("div");
    div.innerHTML = msg;
    warningBanner.current!.appendChild(div);
    if (type == "error") div.style.background = "red";
    else {
      if (type == "warning") div.style.background = "yellow";
      setTimeout(function () {
        warningBanner.current!.removeChild(div);
        updateBannerVisibility();
      }, 5000);
    }
    updateBannerVisibility();
  }

  if (canvasRef.current) {
    canvasRef.current.style.width = "960px";
    canvasRef.current.style.height = "600px";
  }

  useEffect(() => {
    if (isMobile) return;

    const onUnityQuit = () => {
      router.push("/");
    };
    window.onUnityQuit = onUnityQuit;

    const buildUrl = "./SpaceTrace/Build";
    const loaderUrl = buildUrl + "/WebGl.loader.js";
    const config = {
      arguments: [],
      dataUrl: buildUrl + "/WebGl.data",
      frameworkUrl: buildUrl + "/WebGl.framework.js",
      codeUrl: buildUrl + "/WebGl.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Insight Gaming",
      productName: "Space Trace",
      productVersion: "0.9",
      showBanner: unityShowBanner,
    };

    const script = document.createElement("script");
    script.src = loaderUrl;
    console.log(loaderUrl);
    script.onload = () => {
      console.log("Running script");
      //@ts-expect-error unity
      createUnityInstance(canvasRef.current!, config, (progress) => {
        progressBarFull.current!.style.width = 100 * progress + "%";
      })
        .then((unityInstance: { SetFullscreen: (arg0: number) => void }) => {
          progressBarFull.current!.style.display = "none";
          fullscreenButton.current!.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
        })
        .catch((message: unknown) => {
          alert(message);
        });
    };
    document.body.appendChild(script);
    loadingBar.current!.style.display = "block";
    return () => {};
  });

  return (
    <div>
      <Link
        href="/"
        className="px-4 py-2 z-10 bg-zinc-800 hover:bg-zinc-900 rounded-xl transition-colors border border-orange-500 active:scale-90 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px] hover:shadow-orange-500/50 fixed top-10 left-10"
      >
        Return
      </Link>
      {isMobile && (
        <div className="fixed top-[50%] w-full text-center text-red-600">
          This does not run on mobile - sorry!
        </div>
      )}
      <div
        id="unity-container"
        className="unity-desktop w-screen h-screen flex justify-center items-center"
      >
        {!isMobile && (
          <>
            <canvas
              ref={canvasRef}
              id="unity-canvas"
              width={960}
              height={600}
              tabIndex={-1}
            ></canvas>
            <div ref={loadingBar} id="unity-loading-bar">
              <div id="unity-logo"></div>
              <div ref={progressBarEmpty} id="unity-progress-bar-empty">
                <div ref={progressBarFull} id="unity-progress-bar-full"></div>
              </div>
            </div>
            <div ref={warningBanner} id="unity-warning"></div>
            <div id="unity-footer">
              <div id="unity-logo-title-footer"></div>
              <div ref={fullscreenButton} id="unity-fullscreen-button"></div>
              <h1 className="fixed top-7 left-0  w-screen text-center text-6xl">
                Space Trace
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
