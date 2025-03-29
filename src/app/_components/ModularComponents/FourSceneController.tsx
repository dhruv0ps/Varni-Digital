import TwoSwitch from "./TwoSwitch";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const FourSceneController: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {
    // Generate unique IDs based on the passed switchId and index
    const fourSceneSwitch = Array.from({ length: 2 }, (_, index) => `${switchId}-fourSceneSwitch-${index}`);
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            {fourSceneSwitch.map((ele, index) => (
                <TwoSwitch key={ele} switchId={switchId} itemId={`item-${index + 1}`} />
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};

export default FourSceneController;
