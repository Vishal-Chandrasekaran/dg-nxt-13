// This function is required to request results from wikipedia for our keyword searches
export default async function getWikiResults(searchTerm:string){
    const searchParams = new URLSearchParams({
        action:'query',
        generator:'search',
        gsrsearch: searchTerm,
        gsrlimit: '20',
        prop: 'pageimages|extracts',
        exchars: '100',
        exintro: 'true',
        explainText: 'true',
        exlimit: 'max',
        format: 'json',
        origin: '*',
    })

    const response = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams);

    return response.json()
};