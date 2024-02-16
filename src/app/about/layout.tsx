'use client';
import styles from 'style.module.css';
import "./styles.modules.css";
import React from "react";

interface typeDef {
    children: React.ReactNode;
}

class aboutLayout extends React.Component<typeDef>{
    render(){
        const {children}= this.props;
        return(
            <React.Fragment>
                <nav>About NavBar</nav>
                <main className='main'>
                    {children}
                </main>
            </React.Fragment>
        )
    }
}

export default aboutLayout
