import { useStoredUserInfo } from "@/app/_components/navigation-top-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    const router = useRouter();
    const loggedUserInfo = useStoredUserInfo(state=>state.loggedUserInfo);
    return (<>
        Assigment {params.id}
    </>
    )
}