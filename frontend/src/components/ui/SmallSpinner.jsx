import { ClipLoader } from 'react-spinners'

const override = {
    display: "block",
    borderColor: "white",
};

const SmallSpinner = () => {
    return (
        <ClipLoader cssOverride={override} />
    )
}

export default SmallSpinner