'use client';
import { useState , useRef } from 'react';
// import { FcGoogle } from "react-icons/fc";
import { RiLoginCircleLine } from "react-icons/ri";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";

import {setCookie, getCookies} from 'cookies-next';
import useUsers from "@/hooks/useUser";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

//import {auth , provider} from "../../firebase.config";
//import { signInWithPopup } from 'firebase/auth';
import { UserAuth }  from './context/AuthContext';

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(true);
	const [alertWord , setAlertWord]  = useState('');
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmRef = useRef(null);
	const [open, setOpen] = useState(false);
	const { verifyUser , createUser  } = useUsers();
	const router = useRouter();
	// const {  user , googleSignIn, logOut } = UserAuth();

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	// const handleGoogle = async () => {
	
	// 	try {
	// 		await googleSignIn();
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// 	if(user?.email){
	// 		if(isSignIn){
	// 			const response = await verifyUser(user?.email); 
	// 			if(response === 'error'){
	// 				setAlertWord('username or password is wrong!');
	// 				setOpen(true);
	// 				return;
	// 			}
	// 			Cookies.set("jwt-token" , response);
	// 			router.push("/pages");
	// 		}
	// 		else{
	// 			const response = await createUser(user?.email);
	// 			console.log('response: ', response);
	// 			if(response == 'error'){
	// 				setAlertWord('This username are used!');
	// 				setOpen(true);
	// 				return;
	// 			}
	// 			Cookies.set("jwt-token" , response);
	// 			router.push("/pages");

	// 		}
	// 	}
	// };

	const handleLogIn = async() => {
		const username = usernameRef.current?.value ?? "";
		const password = passwordRef.current?.value ?? "";

		if(username == '' || password == ''){
			setAlertWord('Account information is not filled in completely!');
			setOpen(true);
			return;
		}
		
		const response = await verifyUser(username , password); 

		if(response === 'error'){
			setAlertWord('username or password is wrong!');
			setOpen(true);
			return;
		}
		setCookie("jwt-token" , response);
		router.push("/pages");
			
	}
	
	const handleSignUp = async()=>{
		const username = usernameRef.current?.value ?? "";
		const password = passwordRef.current?.value ?? "";
		const confirmPassword = confirmRef.current?.value ?? "";

		if(username == '' || password == '' || confirmPassword == ''){
			setAlertWord('Account information is not filled in completely!');
			setOpen(true);
			return;
		}
		if(password !== confirmPassword ){
			setAlertWord('password and confirm password are inconsistent!');
			confirmRef.current.value = '';
			setOpen(true);
			return;
		}
		try{
			const response = await createUser(username , password);
			if(response == 'error'){
				setAlertWord('This username are used!');
				setOpen(true);
				return;
			}
			setCookie("jwt-token" , response);
			router.push("/pages");
			
		}catch(error){
			console.log(error);
			return;
		}
	}

	return(
		<>
		<div className="w-screen h-screen bg-violet-200 text-gray-900 flex justify-center">
			<div className="w-full m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
				<div className="mt-8 flex flex-col items-center">
					<h1 className="text-2xl xl:text-3xl font-extrabold">
						{isSignIn? "Log in": "Sign up"}
					</h1>
					<div className="w-full flex-1 mt-5">
						{/* <div className="flex flex-col items-center">
							<button
								className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all focus:outline-none hover:bg-indigo-200 hover:shadow focus:shadow-sm focus:shadow-outline">
								<div className="bg-white p-1 rounded-full">
									<FcGoogle size={25}/>
								</div>
								<span className="ml-4" onClick={handleGoogle}>
									{isSignIn? "Log in": "Sign up"} with Google
								</span>
							</button>
						</div> */}

						{/* <div className="my-8 border-b text-center">
							<div
								className="leading-none px-5 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
								Or
							</div>
						</div> */}

						<div className="mx-auto max-w-xs">
							<input
								className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white"
								placeholder="Username" 
								ref = {usernameRef}/>
							<input
								className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
								type="password" placeholder="Password" 
								ref = {passwordRef}/>
							{!isSignIn && (
								<input
									className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-md focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
									placeholder="Confirm Password"
									type="password"
									ref = {confirmRef}
								/>
							)}
							{isSignIn?(
								<>
								<button
								className="mt-5 tracking-wide font-semibold bg-violet-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
								onClick={handleLogIn}>
									<RiLoginCircleLine className='text-white' size={25}/>
									<span className="ml-3">Log In</span>
								</button>
								</>
								):(
								<>
								<button
								className="mt-5 tracking-wide font-semibold bg-violet-900 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
								onClick={handleSignUp}>
									<IoMdPersonAdd className='text-white' size={25}/>
									<span className="ml-3">Sign Up</span>
								</button>
								</>
							)}
											
							{isSignIn? (
								<>
								Create an account?{" "}
								<button className='text-blue-700 mt-3 hover:underline text-center'
								onClick={() => setIsSignIn(false)}> Sign Up</button>
								</>
							):(
								<>Already has an account?{" "}
								<button className='text-blue-700 mt-3 hover:underline text-center'
								onClick={() => setIsSignIn(true)}> Log In</button>
								</>
							)}
							
						</div>
					</div>
				</div>
			</div>
			
			<div className="px-8 py-12 my-10 flex-1 bg-violet-200 text-center hidden lg:flex">
							
				
				<div className="w-full bg-contain bg-center bg-no-repeat">
				<span className='text-3xl font-bold text-purple-950'>No-code Website Builder</span>
				<img src='/website.png' className="w-full" alt='website builder' />
				<span className='text-gray-400'>
				Illustration by <a href="https://icons8.com/illustrations/author/CkHJmwURlxnt" className='underline'>Olha Khomich</a> from <a href="https://icons8.com/illustrations" className='underline'>Ouch!</a>
				</span>	
				</div>
			</div>	
		</div>

		
		<Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
			<Alert severity="warning" onClose={handleClose}>
				<AlertTitle>Warning</AlertTitle>
				<strong>{alertWord}</strong>
			</Alert>
		</Snackbar>
		</>
	);
}
