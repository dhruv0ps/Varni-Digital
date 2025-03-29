enum SizeEnum {
    '2 Module' = 'module2',
    '4 Module' = 'module4',
    '6 Module' = 'module6',
    '8 Module' = 'module8',
    '12 Module' = 'module12',
    // create more Class for future Sizes like this and add Css Class As well
}

enum SizeAsNum {
    '2 Module' = 2,
    '4 Module' = 4,
    '6 Module' = 6,
    '8 Module' = 8,
    '12 Module' = 12,
    // create more Class for future Sizes like this and add Css Class As well
}

enum AccessorySize {
    '1 Modular' = 1,
    '2 Modular' = 2,
    '4 Modular' = 4,
    '6 Modular' = 6,
    '8 Modular' = 8,
    '12 Modular' = 12,
    // create more Class for future Sizes like this and add Css Class As well
}

enum HolderElement {
    '2 Switch' = 'TwoSwitch',
    '2 Switch(1-16A)' = 'TwoSwitch',
    '2 Switch(1-2 way)' = 'TwoSwitch',
    '2 Switch(2-16A)' = 'TwoSwitch',
    'Curtain' = '/icon/m2/Curtain1.svg,/icon/m2/Curtain2.svg',
    'Bell' = '/icon/m2/Bell.png',
    '3 Pin Socket' = '/icon/m2/3PinSocket.png',
    '2 Dimmer(Phase Cut)' = 'TwoDimmer_PhaseCut',
    '4 Scene Controller' = 'FourSceneController',
    '4 Switch' = 'FourSwitch',
    '4 Switch + 1 Fan' = 'FourSwitch_OneFan',
    '4 Switch + 2 Fan' = 'FourSwitch_TwoFan',
    '6 Switch' = 'SixSwitch',
    '6 Switch + 1 Fan' = 'SixSwitch_OneFan',
    '8 Switch' = 'EightSwitch',
    '10 Switch' = 'TenSwitch',
    '6 Switch + 2 Fan' = 'SixSwitch_TwoFan',
}

export function getSizeClass(size: string): string {
    return SizeEnum[size as keyof typeof SizeEnum] || '';
}

export function getSizeAsNum(size: string): number | undefined {
    return SizeAsNum[size as keyof typeof SizeAsNum] ?? 0;
}

export function getAccesorySize(size: string): number | undefined {
    return AccessorySize[size as keyof typeof AccessorySize] ?? 0;
}

export function getHolderElement(ele: string): string {
    return HolderElement[ele as keyof typeof HolderElement] || '';
}