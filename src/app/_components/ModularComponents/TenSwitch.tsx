import TwoSwitch from "./TwoSwitch";
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const TenSwitch: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {
    const tenSwitch = Array.from({ length: 5 }, (_, index) => `${switchId}-tenSwitch-${index}`);
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="h-full flex items-center justify-around flex-row relative">
            {tenSwitch.map((ele, index) => (
                <TwoSwitch key={ele} switchId={switchId} itemId={`item-${index + 1}`} />
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};
export default TenSwitch;