import Image from "next/image";
// In this type, src and alt is considered to be required
type Props = {
    src: string,
    alt: string,
    priority?: string,
};

export default function CustomImage({src,alt,priority}:Props) {
    //condition to check if the priority exists
    const prty = priority ? true:false;

    return(
        <div className="w-full h-full">
            {/*approximaton of the max width*/}
            <Image
                className="rounded-lg mx-auto"
                src={src}
                alt="alt"
                width={650}
                height={650}
                priority={prty}
            />
        </div>
    )

};