
import { BounceLoader } from "react-spinners";


export default function Loading(){
    return(<div className="h-screen flex justify-center items-center">
    <BounceLoader color="#17c41d" />
    </div>)
}