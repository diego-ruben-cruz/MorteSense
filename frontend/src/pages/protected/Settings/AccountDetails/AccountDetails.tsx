import React, {FormEvent, useEffect, useState} from "react";
import {
    changePassword,
    deleteAccount,
    handleEditUser,
    handleMe,
    uploadImage,
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

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        // Check if a file was selected
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            try {
                // Upload the image and receive the filename
                const filename = await uploadImage(file);
                console.log("Image uploaded successfully:", filename);

                // Update the avatar state with the new filename
                setAvatar(filename);
                console.log("Avatar state updated:", filename);
            } catch (error) {
                console.error("Error occurred during image upload:", error);
            }
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
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        ) : (
                                            <p>Email: {user.email}</p>
                                        )}
                                    </div>

                                    <div className="col-span-full">
                                        {editMode ? (
                                            <input
                                                placeholder="Username"
                                                value={username}
                                                onChange={(e) => setUsername(e.target.value)}
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                                                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
                                                    onClick={handleCancelClick}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
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
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
                                                className="block w-full rounded-md border-gray-300 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex">
                                    <button
                                        type="submit"
                                        className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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

                                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400">
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
