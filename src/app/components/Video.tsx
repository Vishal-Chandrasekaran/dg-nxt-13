//defining the props as the id with string
type Props = {
    id:string
};

export default function Video({id}:Props) {
    return(
        <div className="aspect-w-16 aspect-h-9">
            {/*This iframe is used for the embedding the youtube video*/}
            <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title="Youtube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />
        </div>
    )
}