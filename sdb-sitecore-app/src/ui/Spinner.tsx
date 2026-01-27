import React from "react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950 transition-all duration-500">
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full opacity-50 animate-pulse pointer-events-none"></div>

        <div className="relative flex flex-col items-center p-12 z-10">
          <div className="relative h-28 w-28 mb-10">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800/60"></div>

            <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-b-transparent border-l-blue-500 border-r-purple-500 animate-spin shadow-[0_0_40px_rgba(59,130,246,0.3)]"></div>

            <div className="absolute inset-6 rounded-full border-2 border-slate-700/30"></div>
            <div className="absolute inset-6 rounded-full border-2 border-t-purple-400 border-b-transparent border-l-transparent border-r-transparent animate-spin [animation-direction:reverse] [animation-duration:2s]"></div>

            <div className="absolute inset-[42%] bg-blue-500/80 rounded-full blur-md animate-pulse"></div>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <span className="text-2xl font-bold tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-300 to-blue-400 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              LOADING
            </span>

            <span className="text-xs font-light tracking-[0.2em] text-slate-500 uppercase">
              Please wait a moment
            </span>
          </div>

          <div className="flex space-x-3 mt-8">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite_-0.3s]"></div>
            <div className="h-2 w-2 rounded-full bg-purple-500 animate-[bounce_1s_infinite_-0.15s]"></div>
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-[bounce_1s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
