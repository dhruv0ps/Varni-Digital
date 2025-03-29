import TwoSwitch from "./TwoSwitch";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const EightSwitch: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {
    // Generate unique IDs based on the passed switchId and index
    const eightSwitch = Array.from({ length: 4 }, (_, index) => `${switchId}-eightSwitch-${index}`);
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            {eightSwitch.map((ele, index) => (
                <TwoSwitch key={ele} switchId={switchId} itemId={`item-${index + 1}`} />
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};

export default EightSwitch;
