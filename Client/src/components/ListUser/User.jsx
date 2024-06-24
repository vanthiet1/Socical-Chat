import userService from "../../services/User";
const UserList = () => {
    const { data, isLoading, error } = userService.useUsers()
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading users: {error.message}</p>;

    return (
        <>
            <div>
                {data.map((user) => (
                    <div key={user.id} className="flex gap-3 my-4 items-center">
                        <img src={user.image_url}  className="w-[50px] rounded-full" alt="avartar" />
                        <span className="block text-[#fff]">
                            {user.first_name} {user.last_name}
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserList;
