import Image from 'next/image';
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

interface SwitchImageProps {
    src: string[];
    CloseIconComponent?: () => JSX.Element;
}

const SwitchImage: React.FC<SwitchImageProps> = ({ src, CloseIconComponent }) => {
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="min-w-[140px] h-full bg-inherit flex items-center justify-around flex-col relative">
            {src.map((imageSrc, index) => (
                <div key={index}>
                    <Image
                        src={imageSrc}
                        alt={`Switch image ${index + 1}`}
                        layout="responsive"
                        width={200}
                        height={200}
                    />
                </div>
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};

export default SwitchImage;
