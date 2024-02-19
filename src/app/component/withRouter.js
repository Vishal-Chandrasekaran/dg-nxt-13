import React from "react";
import { useRouter } from "next/navigation";


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let router = useRouter();

        return(
            <Component
               {...props}
               router={router}
            />
        );
    }
    return ComponentWithRouterProp;
}

export default withRouter

