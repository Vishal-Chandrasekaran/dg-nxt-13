import React from "react";
import getWikiResults from "../../../lib/getWikiResults";

type Props = {
  params: {
    searchTerm: string;
  };
};

const SearchResults = async ({ params: { searchTerm } }: Props) => {
  //To get receive the requests and storing in an constant , assigning type from the file 'type.d.ts'
  const wikidata: Promise<SearchResult> = getWikiResults(searchTerm);
  //await this Promise wikiData in another constant
  const data = await wikidata;
  //Let's extract result from obtained "data" where the query and pages are optional(might exist).
  const results: Result[] | undefined = data?.query?.pages;
  //condition if they exists
//   const ternaryCondition = results ? Object.values(results.map((result)=>{
//     return <p key={result}>{JSON.stringify(result)}</p>
//   })) : null

  return (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">{}</main>
  );
};

export default SearchResults;
