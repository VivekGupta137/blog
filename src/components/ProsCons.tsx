"use client";

import React from "react";
import CustomList from "@/components/CustomList";

interface ProsConsListProps {
    children: React.ReactNode;
    title?: string;
}

const ProsList = ({ children }: ProsConsListProps) => {
    return (
        <CustomList type="pros" title={"Pros"}>
            {children}
        </CustomList>
    );
};

const ConsList = ({ children }: ProsConsListProps) => {
    return (
        <CustomList type="cons" title={"Cons"}>
            {children}
        </CustomList>
    );
};

export { ProsList, ConsList };
