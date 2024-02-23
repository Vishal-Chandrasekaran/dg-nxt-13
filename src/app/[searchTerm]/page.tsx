/* eslint-disable react/jsx-key */
import React from "react";
import getWikiResults from "../../../lib/getWikiResults";
import Item from "./components/Item";

type Props = {
  params: {
    searchTerm: string;
  };
};

//Generating Metadata
export async function generateMetadata({ params: { searchTerm } }: Props) {
  //Next.js will de-duplicate the requests
  const wikidata: Promise<SearchResult> = getWikiResults(searchTerm);
  const data = await wikidata;
  //We need displayTerm for replacing URL spaces with whitespace
  const displayTerm = searchTerm.replaceAll("%20", " ");
  //Adjusting the metadata for the page if the searchTerm is not found
  if (!data?.query?.pages) {
    return {
      //new metadata without searchTerm
      title: `${displayTerm} Not Found`,
    };
  }

  return {
    //metadata with searchTerm
    title: displayTerm,
    description: `Search results for displayTerm`,
  };
}

const SearchResults = async ({ params: { searchTerm } }: Props) => {
  //To receive the requests and storing in an constant , assigning type from the file 'type.d.ts'
  const wikidata: Promise<SearchResult> = getWikiResults(searchTerm);
  //await this Promise wikiData in another constant
  const data = await wikidata;
  //Let's extract result from obtained "data" where the query and pages are optional(might exist).
  const results: Result[] | undefined = data?.query?.pages;
  //Applying the sam whitespace trick
  const displayTerm = searchTerm.replaceAll("%20", " ");
  //condition if they exists
  const ternaryCondition = results ? (
    Object.values(results).map((result) => {
      return <Item key={result.pageid} result={result} />
    })
  ) : (
    <h2 className="p-2 text-xl">{`${displayTerm} Not Found!`}</h2>
  );

  return (
    <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
      {ternaryCondition}
    </main>
  );
};

export default SearchResults;
