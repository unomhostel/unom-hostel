import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Typography, Paper, CircularProgress } from "@mui/material";

const MyAccount = () => {
    const { loading, error, user } = useSelector((state) => state.user);

    const [email] = useState(user.email);

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <div>
            <Typography variant="h4">My Details</Typography>
            <Paper className="p-4">
                <Typography variant="h6">Email: {email}</Typography>
            </Paper>
        </div>
    );
};

export default MyAccount;
