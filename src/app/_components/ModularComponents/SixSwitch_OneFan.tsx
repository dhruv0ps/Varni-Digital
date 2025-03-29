import SixSwitch from "./SixSwitch";
import Fan from "./Fan";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const SixSwitch_OneFan: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId = '', CloseIconComponent }) => {
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            <SixSwitch switchId={switchId} />
            <Fan switchId={switchId} itemId={'Fan1'} />
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    )
}
export default SixSwitch_OneFan;