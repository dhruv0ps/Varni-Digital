import FourSwitch from "./FourSwitch";
import Fan from "./Fan";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const FourSwitch_OneFan: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            <FourSwitch switchId={switchId} />
            <Fan switchId={switchId} itemId={'Fan1'} />
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    )
}
export default FourSwitch_OneFan;