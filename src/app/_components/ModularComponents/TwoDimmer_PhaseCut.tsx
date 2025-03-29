import Image from 'next/image';
import { RootState } from "~/app/store/store";
import { useSelector } from "react-redux";

const TwoDimmer_PhaseCut: React.FC<{ CloseIconComponent?: () => JSX.Element, }> = ({ CloseIconComponent }) => {
    const src = [
        '/icon/m2/increase.png',
        '/icon/m2/decrease.png',
    ];
    const count = [1, 2];
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="min-w-[140px] h-full bg-inherit flex items-center justify-around flex-col relative">
            {count.map((_, countIndex) => (
                <div key={countIndex} className="flex space-x-4">
                    {src.map((imageSrc, index) => (
                        <div key={index} className='lg:m-5'>
                            <Image
                                src={imageSrc}
                                alt={`Switch image ${index + 1}`}
                                height={50}
                                width={50}
                            />
                        </div>
                    ))}
                </div>
            ))}
            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    );
};

export default TwoDimmer_PhaseCut;
