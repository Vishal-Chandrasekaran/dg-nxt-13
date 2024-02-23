/* eslint-disable @next/next/no-img-element */
"use client"
import React from "react";
import Link from "next/link";
import DOMPurify from 'dompurify';

// interface PropTypeDef {
//     result:Result
// }

// class Item extends React.Component<PropTypeDef>{
//     render() {

const Item = (props:{result:Result}) => {
    function convertHtmlToPlainText(htmlString:string) {
        // Sanitize HTML using DOMPurify
        const sanitizedHtml = DOMPurify.sanitize(htmlString);
      
        // Parse the sanitized HTML string into a DOM object
        const parser = new DOMParser();
        const document = parser.parseFromString(sanitizedHtml, 'text/html');
      
        // Extract plain text from the DOM object
        const plainText = document.body.textContent || '';
      
        return plainText;
      }

      const trustedHtml = props.result.extract;
      const plainText = convertHtmlToPlainText(trustedHtml);


        const itemTextCol =  (
            <div className="flex flex-col justify-center" >
                <h2>
                    <Link href={`https://en.wikipedia.org/?curid=${props.result.pageid}`} target="_blank" className="text-xl font-bold underline" >{props.result.title}</Link>
                </h2>
                {/* <p dangerouslySetInnerHTML={{__html:props.result.extract || "<p> </p>" }}/> */}
                <p>{plainText}</p>
            </div>
        )

        //We got another ternary statement where we optionally chain the props.result,thumbnail,source to make sure these exists to render the content
        const content = props.result?.thumbnail?.source ? (
            <article className="m-4 max-w-lg" >
                <div className="flex flex-row gap-4" >
                    <div className="flex flex-col justify-center" >
                        <img 
                        src={props.result.thumbnail.source}
                        alt={props.result.title}
                        width={props.result.thumbnail.width}
                        height={props.result.thumbnail.height}
                        loading="lazy"
                        />
                    </div>
                    {itemTextCol}
                    {/* This JSX is actually make to display text with thumbnail along with it */}
                </div>
            </article>
        ): (
            <article className="m-4 max-w-lg" >
                {itemTextCol}
                 {/* This JSX is actually acts as fallback if thumbnail doesn't exists */}
            </article>
           
        )
       

        return content
    }


export default Item