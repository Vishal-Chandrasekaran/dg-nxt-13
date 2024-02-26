import React from "react";
import Image from "next/image";

//This component is used for displaying blog creator
export default function MyProfilePic() {
  return (
    <section className="w-full mx-auto">
      <Image
        className="border-4 border:black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8"
        src="/images/unnamed.jpg"
        width={200}
        height={200}
        alt="my face"
        priority={true}
      />
    </section>
  );
}
