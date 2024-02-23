'use client'

import React,{Component, FormEvent} from "react";
import withRouter from "./withRouter";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface typeStateDef {
    search : string;
};

interface typePropsDef {
    router : AppRouterInstance;
};

class WrapSearch extends Component<typePropsDef,typeStateDef>{
    constructor(props: typePropsDef | Readonly<typePropsDef>){
        super(props);

        this.state={
            search:""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    };

    async handleSubmit (e : FormEvent<HTMLFormElement>){
        const { router } = this.props;
        e.preventDefault();
        this.setState({
            search:''
        });
        router.push(`/${this.state.search}/`)
    }

    render() {
        return(
            <form 
            className="w-50 flex justify-center md:justify-between"
            onSubmit={this.handleSubmit}
            >
                <input 
                type="text"
                value={this.state.search}
                onChange={(e) => this.setState({search:e.target.value}) }
                className="bg-white p-2 w-80 text-xl rounded-xl"
                placeholder="Search as you like"
                />
                <button className="p-2 text-xl rounded-xl bg-slate-300 ml-2 font-bold">🚀</button>
            </form>
        )
    }
};

const Search = withRouter(WrapSearch);

export default Search