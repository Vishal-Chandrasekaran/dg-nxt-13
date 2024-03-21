import Link from "next/link";

export default function NotFound() {
    return(
        <div className="text-center">
            <p className="mt-10">Sorry, the requested post does not exists!</p>
            <Link href={"/"}>Back to Home</Link>
        </div>
    )
}