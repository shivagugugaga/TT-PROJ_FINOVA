import FadeLoader from "react-spinners/FadeLoader";

const Loading = () => {
    return (
        <div className="finova-loader-wrap">
            <FadeLoader
                color="#4f46e5"
                loading={true}
                radius={2}
                margin={4}
                height={12}
                width={4}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <span className="loader-label">Processing data...</span>
        </div>
    );
};

export default Loading;