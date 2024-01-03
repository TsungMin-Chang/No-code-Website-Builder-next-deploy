"use client";

import { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {getCookies, deleteCookie} from 'cookies-next';

//import { publicEnv } from "@/lib/env/public";

function SignOutPage() {
	//const { data: session } = useSession();
	const router = useRouter();
	useEffect(() => {
		//if (session) {
		//signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
		//}
		deleteCookie('jwt-token');
		router.push("/");
	}, [router]);

	return <></>;
}

export default SignOutPage;
