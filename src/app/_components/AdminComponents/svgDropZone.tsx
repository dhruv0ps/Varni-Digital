import { useRef } from 'react';
import { useDispatch, } from 'react-redux';
import { useDrop } from 'react-dnd';
import { updateAccessoryImage } from '~/app/slices/adminSlice';
import CloseIcon from '@mui/icons-material/Close';

interface SvgDropzoneProps {
    id: string;
    svgImage: Blob | undefined;
}

const SvgDropzone: React.FC<SvgDropzoneProps> = ({ id, svgImage }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [{ isOver, canDrop }, dropRef] = useDrop({
        accept: 'image/svg+xml',
        drop: (item: any) => {
            if (item.files && item.files[0]) {
                // Handle the dropped SVG file here
                const file = item.files[0];
                handleFileUpload(file);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });

    const handleFileUpload = (file: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result) {
                // Dispatch the Uploaded Image
                const blob = new Blob([reader.result as ArrayBuffer], { type: 'image/svg+xml' });
                dispatch(updateAccessoryImage({ id: id, accessoryImage: blob }));
            }
        };

        if (file) {
            reader.readAsArrayBuffer(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : undefined;
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleRemoveSvg = () => {
        // Dispatch to clear the image in the Redux store
        dispatch(updateAccessoryImage({ id: id, accessoryImage: undefined }));

        // Reset the file input by calling reset()
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear the file input value
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                ref={dropRef as any}
                className={`h-[100px] w-full border-2 border-dashed border-gray-300 flex items-center justify-center m-2 p-5 rounded-xl text-gray-
          ${isOver ? 'bg-gray-100' : 'bg-white'}`}
            >
                {!svgImage ? (
                    canDrop ? (
                        <p>Drop your SVG file here</p>
                    ) : (
                        <p>Drag and drop SVG file or click to browse</p>
                    )
                ) : (
                    <div className="flex justify-center items-center w-full h-full relative">
                        <object
                            data={URL.createObjectURL(svgImage)}
                            type="image/svg+xml"
                            width="50"
                            height="50"
                            aria-label="SVG Preview"
                        />
                        <CloseIcon
                            key={id}
                            onClick={handleRemoveSvg}
                            className="absolute top-0 right-32 cursor-pointer"
                            style={{ zIndex: 1, color: `red` }}
                        />
                    </div>
                )}
            </div>

            {/* File Input */}
            <input
                ref={fileInputRef}
                type="file"
                accept=".svg"
                onChange={handleFileChange}
                className="mt-4"
            />

        </div >
    );
};

export default SvgDropzone;
