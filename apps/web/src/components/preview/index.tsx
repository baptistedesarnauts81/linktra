"use client";

import usePreviewStore from "@/lib/store/preview";
import { api } from "@linktra/backend/convex/_generated/api";
import clsx from "clsx";
import { useQuery } from "convex/react";

export default function Preview() {
  const { preview } = usePreviewStore();
  const store = useQuery(api.auth.getCurrentUserStore);

  return (
    <div
      className={clsx(
        "col-span-4 bg-zinc-50 border-l flex flex-col justify-center items-center border-zinc-100 min-h-svh",
        preview ? "block" : "hidden"
      )}
    >
      <figure className="mx-auto max-w-full w-60 h-auto">
        <div className="p-1.5 bg-gray-800 shadow-[0_2.75rem_5.5rem_-3.5rem_rgb(45_55_75_/_20%),_0_2rem_4rem_-2rem_rgb(45_55_75_/_30%),_inset_0_-0.1875rem_0.3125rem_0_rgb(45_55_75_/_20%)]  rounded-3xl">
          <div className="w-full lg:h-[480px] rounded-2xl bg-zinc-50 flex flex-col justify-between items-center">
            <div className="w-full flex flex-col justify-start items-center py-3">
              <div className="flex rounded-full flex-col justify-center items-center">
                {store ? (
                  <div className="w-16 border flex flex-col justify-center items-center border-zinc-200 h-16 bg-zinc-100 rounded-full">
                    <span className="text-3xl -mt-1">
                      {store.name.charAt(0)}
                    </span>
                  </div>
                ) : (
                  <div className="w-16 border border-zinc-200 h-16 bg-zinc-100 rounded-full animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="w-full flex py-1 flex-row justify-center items-center">
              <span className="text-sm">linktra</span>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}
