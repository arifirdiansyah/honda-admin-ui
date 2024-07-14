import { Spin } from "antd";

const Loading = ({ loadingText }) => {
    return (
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Spin size="large"/>
                <span>{loadingText}</span>
            </div>
        </>
    )
}

export default Loading;