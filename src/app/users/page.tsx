/* eslint-disable react/jsx-key */
import React from "react";
// In built metadata type
import type { Metadata } from "next";
// This async fetch is already done in a file
import getAllUsers from "../../../lib/getAllUsers";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Users',
};

export default async function Users () {
    // the type of the promise is done with type defined Users
    const userData: Promise<User[]> = getAllUsers();
    //fetch the request and storing the value of provoked function into variable
    const users = await userData

    console.log('hello');

    return (
        <React.Fragment>
             <section>
            <h2>
                <Link href="/" >Back to home</Link>
            </h2>
            <br/>
            {users.map((user,index) => {
                return(
                    <React.Fragment>
                        <p key={user.id} >
                            <Link href={`/users/${user.id}`}>{user.name}</Link>
                        </p>
                    </React.Fragment>
                )
            })}
        </section>
        </React.Fragment>
    )

};