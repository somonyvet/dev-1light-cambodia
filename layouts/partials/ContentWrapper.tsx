"use client";

import {FC, ReactNode} from "react";
import {useLoading} from "../../services/loading.service";
import AppLoading from "@components/AppLoading";

const ContentWrapper: FC<{ children: ReactNode }> = ({children}) => {
    const {isLoading} = useLoading();

    // if (isLoading) return <AppLoading/>

    return children;
}

export default ContentWrapper