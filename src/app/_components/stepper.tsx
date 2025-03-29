import * as React from 'react';
import TitleElement from './Elements/TitleElement';
import DesktopStepper from './desktopStepper';
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Steps() {
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);

    return (
        <div className="flex flex-col md:flex-row justify-between items-center p-4">
            <TitleElement title={currentStep?.description} />
            <DesktopStepper />
        </div>
    );
}
