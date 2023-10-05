import React, {FormEvent, useEffect, useState} from "react";
import {
    changePassword,
    deleteAccount,
    handleEditUser,
    handleMe,
    UserData
} from "../../../../lib/auth";
import {useNavigate} from "react-router-dom";

interface AccountDetailsProps {
    user: UserData | null;
}

const AccountDetails = ({ user }: AccountDetailsProps) => {
    const [editMode, setEditMode] = useState(false); // State variable to toggle edit mode
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone_number, setPhoneNumber] = useState(user?.phone_number || "");
    const [username, setUsername] = useState(user?.username || "");
    const [avatar, setAvatar] = useState(user?.avatar || '/male.svg');
    const [, setUser] = useState<UserData | null>(null); // State variable to store the user data
    let navigate = useNavigate();

    useEffect(() => {
        document.title = "MDS | Account Details";
    });

    const handleEditClick = (e:any) => {
        e.preventDefault();
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            const updatedUserData = {
                ...user,
                new_name: name,
                new_email: email,
                new_phone_number: phone_number,
                new_username: username,
            };

            await handleEditUser(updatedUserData); // Update the user data

            const response = await handleMe(); // Fetch the updated user data
            setUser(response);

            setEditMode(false); // Disable edit mode after saving
        } catch (error) {
            console.error("Failed to update user data:", error);
        }
    };


    const handleCancelClick = () => {
        setEditMode(false);
    };

    const handleChangePassword = async () => {
        try {
            await changePassword({current_password: currentPassword, new_password: newPassword, confirm_password: confirmPassword});
            console.log("Password updated successfully");
        } catch (error:any) {
            console.error("Failed to update password:", error.response?.data);
        }
    };

    const handleDeleteAccount = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await deleteAccount();
            console.log("Account deleted successfully")
            navigate("/");
        } catch (error) {
            console.log("Error occurred during account deletion");
        }
    };


    useEffect(() => {
        if (user && user.avatar) {
            setAvatar(user.avatar);
        }
    }, [user]);

    return (
        <div>
            {user != null && (
                <div>
                    {/* Add Your Code Inside DIV!!! */}
                    <div className="divide-y divide-gray-300">
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            {/* Personal Information Section */}
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-800">
                                    Personal Information
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Use a permanent address where you can receive mail.
                                </p>
                            </div>

                            <form className="md:col-span-2">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">

                                    <div className="col-span-full flex items-center gap-x-8">
                                        <img
                                            src={avatar}
                                            alt=""
                                            className="h-24 w-24 flex-none object-cover"
                                        />
                                        <div>
                                            {/*<label className="rounded-md bg-gray-200 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-300 cursor-pointer">*/}
                                            {/*    Change avatar*/}
                                            {/*    <input*/}
                                            {/*        type="file"*/}
                                            {/*        accept="image/*"*/}
                                            {/*        onChange={handleImageUpload}*/}
                                            {/*        style={{display: 'none'}} // This hides the file input*/}
                                            {/*    />*/}
                                            {/*</label>*/}
                                            <p className="mt-2 text-xs leading-5 text-gray-600">
                                                <strong>UUID:</strong> {user.id}
                                            </p>
                                        </div>
                                    </div>


                                    <div className="col-span-full">
                                        {editMode ? (

                                            <input
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        ) : (
                                            <p>Name: {user.name}</p>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        {editMode ? (
                                            <input
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        ) : (
                                            <p>Email: {user.email}</p>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        {editMode ? (
                                            <input
                                                placeholder="Phone number"
                                                value={phone_number}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        ) : (
                                            <p>Phone number: {user.phone_number}</p>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        {editMode ? (
                                            <input
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        ) : (
                                            <p>Username: {user.username}</p>
                                        )}
                                    </div>

                                </div>

                                <div className="mt-8 flex">
                                    <div className="flex space-x-4">
                                        {editMode ? (
                                            <>
                                                <button
                                                    type="submit"
                                                    onClick={handleSaveClick}
                                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
                                active:from-rose-900 active:to-orange-800 shadow-sm
                                from-rose-900 to-orange-700 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-orange-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="text-rose-900 px-10 py-2 leading-7
                                active:from-white active:to-gray-200 shadow-sm
                                from-white to-gray-50 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-gray-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2"
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                className="text-white bg-gradient-to-br px-10 py-2 leading-7
                                active:from-rose-900 active:to-orange-800 shadow-sm
                                from-rose-900 to-orange-700 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-orange-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2"
                                                onClick={handleEditClick}
                                            >
                                                Edit
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Change Password Section */}
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-800">
                                    Change password
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    Update your password associated with your account.
                                </p>
                            </div>

                            <form className="md:col-span-2" onSubmit={handleChangePassword}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                                    <div className="col-span-full">
                                        <label
                                            htmlFor="current-password"
                                            className="block text-sm font-medium leading-6 text-gray-800"
                                        >
                                            Current password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="current-password"
                                                name="current_password"
                                                onChange={(e) => setCurrentPassword(e.target.value)}
                                                type="password"
                                                autoComplete="current-password"
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="new-password"
                                            className="block text-sm font-medium leading-6 text-gray-800"
                                        >
                                            New password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="new-password"
                                                name="new_password"
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                type="password"
                                                autoComplete="new-password"
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-span-full">
                                        <label
                                            htmlFor="confirm-password"
                                            className="block text-sm font-medium leading-6 text-gray-800"
                                        >
                                            Confirm password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="confirm-password"
                                                name="confirm_password"
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                type="password"
                                                autoComplete="new-password"
                                                className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-rose-500 focus:outline-none focus:ring-rose-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="text-white bg-gradient-to-br px-10 py-2 leading-7
                                active:from-rose-900 active:to-orange-800 shadow-sm
                                from-rose-900 to-orange-700 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-orange-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Delete Account Section */}
                        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
                            <div>
                                <h2 className="text-base font-semibold leading-7 text-gray-800">
                                    Delete account
                                </h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    No longer want to use our service? You can delete your account
                                    here. This action is not reversible. All information related to
                                    this account will be deleted permanently.
                                </p>
                            </div>

                            <form className="flex items-start md:col-span-2" onSubmit={handleDeleteAccount}>
                                <button
                                    type="submit"

                                    className="text-white bg-gradient-to-br px-10 py-2 leading-7
                                active:from-rose-900 active:to-orange-800 shadow-sm
                                from-rose-900 to-orange-700 hover:bg-gradient-to-bl
                                focus:outline-none focus:ring-orange-200 font-medium rounded-lg
                                text-xs text-center mr-2 mb-2">
                                    Yes, delete my account
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* End */}
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
