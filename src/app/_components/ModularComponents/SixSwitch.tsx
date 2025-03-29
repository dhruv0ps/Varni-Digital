import TwoSwitch from "./TwoSwitch";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const SixSwitch: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {
    const sixSwitch = Array.from({ length: 3 }, (_, index) => `${switchId}-sixSwitch-${index}`);
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            {sixSwitch.map((ele, index) => (
                <TwoSwitch key={ele} switchId={switchId} itemId={`item-${index + 1}`} />
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};

export default SixSwitch;