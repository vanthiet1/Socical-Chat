

const Banner = (props) => {
    const { contentNull } = props
    return (
        <div>
            <div className="w-full relative h-dvh">
                <div className="absolute top-5 left-[30%]">
                    <span className="text-[#fff] text-[30px]">{contentNull}</span>
                </div>
                <img className=" w-full  rounded-[20px]" src="https://support.discord.com/hc/user_images/-tSbfgDFQxmpAJamqqO8Mg.png" alt="Không có lời mời kết bạn nào cả" />
            </div>
        </div>
    );
};

export default Banner;