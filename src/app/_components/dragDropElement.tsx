import styles from '../../styles/dragdrop.module.css'
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { getSizeClass, getSizeAsNum } from '../enums/enum';
import CanvasElement from './canvas';

const DragDropArea = () => {
    const size = useSelector((state: RootState) => state.cartData.cartData?.size?.item);
    const accessories = useSelector((state: RootState) => state.cartData.cartData?.accessories);
    const accessories1 = useSelector((state: RootState) => state.cartData.cartData?.accessories1);
    const accessories2 = useSelector((state: RootState) => state.cartData.cartData?.accessories2);
    const color = useSelector((state: RootState) => state.cartData.cartData?.color);
    const showCanvasBorder = useSelector((state: RootState) => state.cartData.showCanvasBorder);

    const materialColor = color?.find(option => option.optionType === 'Material Color')?.options[0]?.color || '#000000'; // default Color
    const frameColor = color?.find(option => option.optionType === 'Frame Color')?.options[0]?.color || '#000000'; // default Colo

    let sizeClass = '';
    let canvasSize = 0;
    if (size) {
        sizeClass = getSizeClass(size);
        canvasSize = getSizeAsNum(size) ?? 0;
    }

    return (
        <div className='sm:flex flex-1 justify-center'>
            {size === '12 Module' ?
                /* if 12 Module render 2 Canvas vertically */
                <div id="drag-drop-area" className={`flex flex-col gap-5 justify-center items-center shadow-2xl ${showCanvasBorder ? '' : 'rounded-lg'} ${styles[sizeClass]}`}
                    style={{ backgroundColor: materialColor, border: `4px solid ${frameColor}` }}>
                    <>
                        <CanvasElement key={1} canvasNo={1} showCanvasBorder={showCanvasBorder} data={accessories1} />
                        <CanvasElement key={2} canvasNo={2} showCanvasBorder={showCanvasBorder} data={accessories2} />
                    </>
                </div>
                :
                /* For other Sizes only 1 Canvas */
                <div id="drag-drop-area" className={`flex justify-center items-center shadow-2xl ${showCanvasBorder ? '' : 'rounded-lg'} ${styles[sizeClass]}`}
                    style={{ backgroundColor: materialColor, border: `4px solid ${frameColor}` }}>
                    <CanvasElement key={3} canvasNo={1} showCanvasBorder={showCanvasBorder} data={accessories} />
                </div>
            }
        </div >
    )
}
export default DragDropArea;