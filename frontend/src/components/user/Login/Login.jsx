import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../features/user/userThunks";
import { useDispatch, useSelector } from "react-redux";
import LoginLoader from "../../../layouts/LoginLoader/LoginLoader";
import TextField from "@mui/material/TextField";
import ButtonLoader from "../../../layouts/ButtonLoader/ButtonLoader";
// import { toast, ToastContainer, Slide } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated, isLoggingIn, loadingLogin } = useSelector(
        (state) => state.user
    );

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (!Email || !password) {
        //     console.log(Email, " ", password);
        //     toast.dismiss();
        //     toast.error("Invalid email or password");
        //     return;
        // }

        if (Email && password) {
            const loginForm = new FormData();
            loginForm.set("email", Email);
            loginForm.set("password", password);
            dispatch(login(loginForm));
        }
    };

    useEffect(() => {
        if (isAuthenticated && isLoggingIn) {
            navigate("/");
        }
    }, [isAuthenticated, isLoggingIn]);

    return (
        <>
            {/* <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={true}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                transition={Slide}
                stacked
                limit={1}
            /> */}
            <div className="fixed top-0 left-0 right-0 w-full h-full bg-dimWhite z-[9000] flex-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md flex-center flex-col gap-y-8">
                    <h3 className="text-3xl font-normal text-mediumGray text-center">LOGIN</h3>
                    {loading && <LoginLoader />}
                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-y-4">
                        <div className="mb-4">
                            <TextField
                                id="outlined-email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                size="normal"
                                slotProps={{
                                    input: {
                                        sx: {
                                            fontFamily: "Poppins, sans-serif",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderRadius: "4px",
                                            },
                                        },
                                    },
                                }}
                                fullWidth
                                value={Email}
                                onChange={handleEmailChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <TextField
                                id="outlined-password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                size="normal"
                                slotProps={{
                                    input: {
                                        sx: {
                                            fontFamily: "Poppins, sans-serif",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderRadius: "4px",
                                            },
                                        },
                                    },
                                }}
                                fullWidth
                                value={password}
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>
                        <button
                            disabled={loadingLogin}
                            className="flex-center text-base font-medium bg-secondary shadow-sm hover:bg-primary hover:shadow-md transition-colors duration-150 text-white rounded-full px-12 py-3 disabled:bg-primary/50 disabled:cursor-not-allowed disabled:shadow-md"
                        >
                            {loadingLogin ? <ButtonLoader width={24} height={24} /> : "login"}
                        </button>
                        {error && <p className="text-red-500">{error.message}</p>}
                    </form>
                    <Link to={"/"} className="hover:text-primary duration-150 transition-colors">
                        Go to Home
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
