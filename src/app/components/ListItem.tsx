//This component exists to display each blog component 
import Link from "next/link";
import getFormattedDate from "../../../lib/getFormattedDates";

//type blogpost has structure of id title date of each posts
type Props= {
    post:Meta
};

export default function ListItem({post}:Props){
    //we need formatted date so it is done in library folder
    const{id,title,date} = post;
    //converting our dateString into formattedDate by:
    const formattedDate = getFormattedDate(date);

    //Now we render the listItem in return
    return(
        <li className="mt-4 text-2xl dark:text-white/90">
            {/*the link here is anchored to dynamic directory which is id*/}
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`} >{title}</Link>
            <br/>
            {/* classname mentioned for date is smaller than actual title of the posts */}
            <p className="text-sm mt-1">{formattedDate}</p>
        </li>
    )
};