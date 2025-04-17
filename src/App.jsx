import React, { useEffect, useState } from 'react';
import { data } from './data';
import { Modal } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const BoxOptions = ({ boxData, handleBoxClick, selectedBox }) => {
    return (
        <div className="flex items-center justify-center gap-8">
            {boxData.map((box, index) => (
                <div
                    key={index}
                    className={`cursor-pointer border p-4 text-center flex flex-col gap-2 min-w-[200px] ${box.name === selectedBox && 'border-black'}`}
                    onClick={() => handleBoxClick(box)}>
                    <div className="w-30 h-30 flex items-center justify-center">
                        <img className="w-30" src={box.image} alt={box.name} />
                    </div>
                    <h2 className="text-sm">{box.name}</h2>
                </div>
            ))}
        </div>
    );
};

const BoxSides = ({
    boxSides,
    handleRemoveLogo,
    handleRemoveSingleLogo,
    removeCustomSide,
    handleAddLogo,
    uploadedLogos,
}) => {
    return (
        <div className="flex items-start justify-center gap-8">
            {boxSides.map((box, index) => (
                <div
                    key={index}
                    className="flex gap-8 items-start justify-center relative">
                    {box.value === 'custom' ? (
                        <React.Fragment>
                            <>
                                {box?.type?.map((customType, customIndex) => {
                                    // Fetch the custom logo entry from uploadedLogos
                                    const customLogo = uploadedLogos.find(
                                        (logo) => logo.name === 'custom',
                                    );
                                    const isSelected =
                                        customType.value.toLowerCase() ===
                                        'color'
                                            ? customLogo?.customSideColor
                                            : customType.value.toLowerCase() ===
                                                'pattern'
                                              ? customLogo?.customSideImage
                                              : false;

                                    // Use key that reflects change
                                    const keySuffix =
                                        customLogo?.customSideColor
                                            ? 'color'
                                            : '';
                                    const keySuffix2 =
                                        customLogo?.customSideImage
                                            ? 'pattern'
                                            : '';

                                    return (
                                        <div
                                            key={`${customIndex}-${keySuffix}-${keySuffix2}`} // 👈 this helps re-render
                                            className="flex flex-col items-center relative">
                                            <div
                                                className="cursor-pointer border p-4 text-center flex justify-center align-center flex-col gap-2 min-w-[170px] w-[170px] h-[150px]"
                                                onClick={() =>
                                                    handleAddLogo(
                                                        box.value,
                                                        customType?.value,
                                                    )
                                                }>
                                                <div className="w-30 h-30 flex items-center justify-center">
                                                    <img
                                                        src={customType.image}
                                                        alt={customType.name}
                                                    />
                                                </div>
                                                <h2 className="text-xs">
                                                    {customType.name}{' '}
                                                </h2>
                                            </div>

                                            {isSelected && (
                                                <button
                                                    className="mt-2 text-red-700 text-xs font-bold underline uppercase"
                                                    onClick={() =>
                                                        removeCustomSide(
                                                            customType.value.toLowerCase(),
                                                        )
                                                    }>
                                                    x remove
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </>
                            <span className="font-bold text-lg text-green-500 absolute left-1/2 -translate-x-1/2 -bottom-8">
                                (
                                {uploadedLogos?.length > 0
                                    ? box?.price || 0
                                    : 0}
                                )
                            </span>
                        </React.Fragment>
                    ) : (
                        <div className="flex flex-col items-center relative">
                            <div
                                className="cursor-pointer border p-4 text-center flex justify-center align-center flex-col gap-2 min-w-[170px] w-[170px] h-[150px]"
                                onClick={() => handleAddLogo(box.value)}>
                                <div className="w-30 h-30 flex items-center justify-center">
                                    <img src={box.image} alt={box.name} />
                                </div>
                                <h2 className="text-xs">
                                    {box.name}{' '}
                                    <span className="font-bold text-lg text-green-500">
                                        (
                                        {uploadedLogos.length > 0
                                            ? box?.price || 0
                                            : 0}
                                        )
                                    </span>
                                </h2>
                            </div>
                            {uploadedLogos
                                .filter((item) => item.name === box.value)
                                .map((item, index, matchedItems) => {
                                    const isCommon = matchedItems.filter(
                                        (side) => side.name === box.value,
                                    );

                                    const showRemoveAll =
                                        isCommon &&
                                        index === isCommon.length - 1;

                                    return (
                                        <React.Fragment key={index}>
                                            <div
                                                key={index}
                                                className="flex items-center gap-2 mt-1">
                                                <span className="text-xs">
                                                    {item.name}{' '}
                                                    {item?.backgroundImagePrice !==
                                                        0 &&
                                                        `(${item.backgroundImagePrice} per unit)`}
                                                </span>

                                                {/* Individual Remove */}
                                                <button
                                                    className="text-xs text-red-500 underline uppercase"
                                                    onClick={() =>
                                                        handleRemoveSingleLogo(
                                                            item.name,
                                                            item.id,
                                                        )
                                                    }>
                                                    Remove
                                                </button>

                                                {/* Common Remove */}
                                            </div>
                                            <div>
                                                {showRemoveAll && (
                                                    <button
                                                        className="text-xs text-red-700 font-semibold underline uppercase"
                                                        onClick={() =>
                                                            handleRemoveLogo(
                                                                item.name,
                                                            )
                                                        }>
                                                        x remove
                                                    </button>
                                                )}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const UpgradeOptions = ({
    upgradeOptions,
    selectedUpgradeOption,
    setSelectedUpgradeOption,
}) => {
    return (
        <div className="flex items-center justify-center gap-8">
            {upgradeOptions.map((item, index) => (
                <div
                    key={index}
                    className={`${item.name === selectedUpgradeOption ? 'border-2 border-black' : 'border-2'}`}
                    onClick={() => setSelectedUpgradeOption(item.name)}>
                    <div className="cursor-pointer border p-4 text-center flex justify-center flex-col gap-2 w-[200px]">
                        <p className="text-sm text-center">{item.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

const PriceModal = ({
    isModalOpen,
    handleBackgroundPrice,
    handlePriceWithoutBackground,
    backgroundImagePrice,
    setIsModalOpen,
}) => {
    return (
        <Modal
            title=""
            open={isModalOpen}
            centered
            footer={null}
            onCancel={() => setIsModalOpen(false)}>
            <h2>Is your design contains background color?</h2>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={handleBackgroundPrice}
                    className="cursor-pointer bg-black border text-white p-2 text-sm border-black rounded min-w-[100px] uppercase">
                    {`Yes(Add ${backgroundImagePrice} per unit)`}
                </button>
                <button
                    className="cursor-pointer bg-black border text-white p-2 text-sm border-black rounded min-w-[100px] uppercase"
                    onClick={handlePriceWithoutBackground}>
                    No
                </button>
            </div>
        </Modal>
    );
};

const TotalPrice = ({ totalPrice }) => {
    return (
        <div className="fixed bottom-0 right-0 bg-white text-black p-4">
            <h2>Total price: {totalPrice} per unit</h2>
        </div>
    );
};

export default function App() {
    let boxInfo = data;
    const [boxData, setBoxData] = useState([]);
    const [boxSides, setBoxSides] = useState([]);
    const [selectedBox, setSelectedBox] = useState('');
    const [upgradeOptions, setUpgradeOptions] = useState([]);
    const [uploadedLogos, setUploadedLogos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalBackgroundPrice, setTotalBackGroundPrice] = useState(0);
    const [backgroundImagePrice, setBackgroundImagePrice] = useState(false);
    const [selectedUpgradeOption, setSelectedUpgradeOption] = useState('');
    const [currentSide, setCurrentSide] = useState('');
    const [isCustomSide, setIsCustomSide] = useState(false);
    const [customSideName, setCustomSideName] = useState('');

    const customFaces = [
        {
            name: 'Fold Up Box',
            sides: [
                { name: 'front' },
                { name: 'right' },
                { name: 'left' },
                { name: 'top' },
                { name: 'back' },
            ],
        },
        {
            name: 'Drawer Box',
            sides: [{ name: 'left' }, { name: 'right' }, { name: 'top' }],
        },
        {
            name: 'Magnetic Box',
            sides: [{ name: 'top' }, { name: 'front' }],
        },
    ];

    const upgradeOptionSelection = () => {
        return new Promise((resolve) => {
            const isCustomColor = uploadedLogos.find(
                (logo) => logo.name === 'custom' && logo.customSideColor,
            );

            const isBackgroundImage = uploadedLogos.find(
                (logo) => logo.backgroundImagePrice !== 0,
            );

            const isCustomPattern = uploadedLogos.find(
                (logo) =>
                    logo.name === 'custom' &&
                    !logo.customSideColor &&
                    logo.customSideImage,
            );

            const isBottomImage = uploadedLogos.find(
                (logo) => logo.name === 'bottom',
            );

            const selectedBoxUpgrades = boxInfo.find(
                (box) => box.name === selectedBox,
            );

            let options = [];
            let selectedOption = selectedUpgradeOption;

            if (isCustomColor || isBackgroundImage) {
                options = selectedBoxUpgrades.upgrades.filter(
                    (option) =>
                        option.name === 'cmyk' || option.name === 'vinyl',
                );
                selectedOption = options[0].name;
                setUpgradeOptions(options);
                setSelectedUpgradeOption(selectedOption);
            } else if (isBottomImage || isCustomPattern) {
                options = selectedBoxUpgrades.upgrades.filter(
                    (option) =>
                        option.name === 'cmyk' ||
                        option.name === 'vinyl' ||
                        option.name === 'foil',
                );
                setUpgradeOptions(options);
                if (selectedUpgradeOption !== 'foil') {
                    selectedOption = options[0].name;
                    setSelectedUpgradeOption(selectedOption);
                }
            } else {
                options = selectedBoxUpgrades.upgrades;
                setUpgradeOptions(options);
                // selectedOption remains unchanged
            }

            setTimeout(() => {
                resolve({
                    options,
                    selectedOption,
                });
            }, 0);
        });
    };

    const calculateTotalPrice = async () => {
        const { options, selectedOption } = await upgradeOptionSelection();
        let price = 0;
        const totalPriceInfo = [];
        let backgroundImageTotal = 0;

        const selectedBoxCustomizeFace = customFaces.find(
            (face) => face.name === selectedBox,
        );

        if (isCustomSide) {
            const customPrice = uploadedLogos.find(
                (logo) => logo.name === 'custom',
            );

            const customSideUpgradeOption = options.find(
                (option) => option.name === selectedOption,
            );

            if (customPrice) {
                totalPriceInfo.push({
                    name: customPrice.name,
                    price: customSideUpgradeOption?.prices[customPrice.name],
                });
            }
        }

        const sideNames = selectedBoxCustomizeFace?.sides.map(
            (side) => side.name,
        );

        const isCustomFaceLength = uploadedLogos?.filter((logo) =>
            sideNames.includes(logo.name),
        );
        const availableCustomSides = isCustomFaceLength.length;

        uploadedLogos.forEach((logo) => {
            // Accumulate background image price
            if (logo.backgroundImagePrice) {
                backgroundImageTotal += parseFloat(
                    logo.backgroundImagePrice || 0,
                );
            }

            const isCustomFace = selectedBoxCustomizeFace?.sides?.find(
                (side) => side.name === logo.name,
            );

            const boxSideNames =
                selectedBoxCustomizeFace?.sides?.map((s) => s.name) || [];

            const addedCustomSide = totalPriceInfo.find((side) =>
                boxSideNames.includes(side.name),
            );

            if (
                (isCustomSide && isCustomFace) ||
                (isCustomFace &&
                    availableCustomSides > 1 &&
                    addedCustomSide &&
                    (selectedUpgradeOption === 'foil' ||
                        selectedUpgradeOption === 'vinyl' ||
                        selectedUpgradeOption === 'cmyk'))
            )
                return;
            if (totalPriceInfo.find((item) => item.name === logo.name)) return;

            const selectedLogoUpgradePrice = options.find(
                (option) => option.name === selectedOption,
            );

            totalPriceInfo.push({
                name: logo.name,
                price: selectedLogoUpgradePrice?.prices[logo.name],
            });
        });

        // Sum up all logo prices
        const logoPriceTotal = totalPriceInfo.reduce(
            (acc, curr) => acc + curr.price,
            0,
        );

        // Final total = current totalPrice + logo prices + background images
        const updatedTotal =
            parseFloat(price || 0) + logoPriceTotal + backgroundImageTotal;

        setTotalPrice(updatedTotal.toFixed(2));
    };

    useEffect(() => {
        if (!boxInfo) return;

        setBoxData(boxInfo);
        setSelectedBox(boxInfo[0].name);

        const sides = boxInfo[0].sides;
        const upgrades = boxInfo[0].upgrades;

        if (!sides) return;
        setBoxSides(sides);

        if (!upgrades) return;
        setUpgradeOptions(upgrades);
    }, []);

    const handleBoxClick = (box) => {
        if (selectedBox !== box.name) {
            setUploadedLogos([]);
            setIsCustomSide(false);
            setSelectedUpgradeOption('');
            setCurrentSide('');
            setCustomSideName('');
        }
        setSelectedBox(box.name);
        const sides = box.sides;
        const upgrades = box.upgrades;

        if (!sides) return;
        setBoxSides(sides);

        if (!upgrades) return;
        setUpgradeOptions(upgrades);
    };

    const handleBackgroundPrice = () => {
        setTotalBackGroundPrice(
            Number(
                (
                    Number(totalBackgroundPrice) + Number(backgroundImagePrice)
                ).toFixed(2),
            ),
        );
        uploadLogo(currentSide, backgroundImagePrice);
        setIsModalOpen(false);
    };
    const handlePriceWithoutBackground = () => {
        setBackgroundImagePrice(0);
        uploadLogo(currentSide);
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (uploadedLogos.length === 0) {
            setTotalPrice(0);
            setSelectedUpgradeOption('');
            setIsCustomSide(false);
            return;
        }

        if (!selectedUpgradeOption || selectedUpgradeOption === '')
            setSelectedUpgradeOption(upgradeOptions[0].name);

        calculateTotalPrice();
    }, [selectedUpgradeOption, uploadedLogos]);

    useEffect(() => {
        if (!isCustomSide) return;

        if (customSideName === 'pattern') {
            uploadLogo('custom', 0, 'pattern');
        } else if (customSideName === 'color') {
            uploadLogo('custom', 0, 'color');
        }
    }, [customSideName]);

    const handleAddLogo = (sideName, customSide) => {
        const isBottomLogo = uploadedLogos.find(
            (logo) => logo.name === 'bottom',
        );
        if (isBottomLogo && sideName === 'bottom') return;
        if (customSide) {
            setIsCustomSide(true);
            setCustomSideName(customSide);
            return;
        }

        setCurrentSide(sideName);
        const selectedBoxCustomSides = customFaces.find(
            (face) => face.name === selectedBox,
        );

        if (!selectedBoxCustomSides) return;

        const selectedCustomSide = selectedBoxCustomSides?.sides?.find(
            (side) => side.name === sideName,
        );

        const isCustom = uploadedLogos.find((item) => item.name === 'custom');

        let customSidePriceData;
        if (selectedUpgradeOption === '') {
            setSelectedUpgradeOption(upgradeOptions?.[0]?.name);
            customSidePriceData = upgradeOptions.find(
                (option) => option.name === upgradeOptions?.[0]?.name,
            );
        } else {
            customSidePriceData = upgradeOptions.find(
                (option) => option.name === selectedUpgradeOption,
            );
        }

        let upgrades = false;
        if (
            selectedUpgradeOption === '' ||
            selectedUpgradeOption === 'foil' ||
            selectedUpgradeOption === 'cmyk' ||
            selectedUpgradeOption === 'vinyl'
        ) {
            upgrades = true;
        } else {
            upgrades = false;
        }

        if (
            selectedCustomSide &&
            !isCustom &&
            upgrades &&
            sideName !== 'bottom'
        ) {
            const customSidePrice = upgradeOptions.find(
                (option) => option.name === customSidePriceData.name,
            );

            const customPrintPrice = customSidePrice?.prices['custom'];

            if (
                !customPrintPrice &&
                !selectedBoxCustomSides &&
                selectedBoxCustomSides?.sides?.length === 0
            )
                return;
            const calculateBackgroundImagePrice =
                customPrintPrice / selectedBoxCustomSides?.sides?.length;

            setBackgroundImagePrice(calculateBackgroundImagePrice.toFixed(2));
            setIsModalOpen(true);
        } else {
            setBackgroundImagePrice(0);
            uploadLogo(sideName);
        }
    };

    const uploadLogo = (sideName, price, customSideName) => {
        setUploadedLogos((prev) => {
            if (sideName === 'custom') {
                const existingCustom = prev.find(
                    (logo) => logo.name === 'custom',
                );

                // Update all non-custom items to have backgroundImagePrice = 0
                const updatedPrev = prev.map((logo) => {
                    if (logo.name !== 'custom') {
                        return {
                            ...logo,
                            backgroundImagePrice: 0,
                        };
                    }
                    return logo;
                });

                if (existingCustom) {
                    // Update the existing custom object
                    return updatedPrev.map((logo) => {
                        if (logo.name === 'custom') {
                            return {
                                ...logo,
                                customSideColor:
                                    customSideName === 'color'
                                        ? true
                                        : logo.customSideColor,
                                customSideImage:
                                    customSideName === 'pattern'
                                        ? true
                                        : logo.customSideImage,
                                backgroundImagePrice: price || 0,
                            };
                        }
                        return logo;
                    });
                } else {
                    // Add new custom object
                    return [
                        ...updatedPrev,
                        {
                            id: uuidv4(),
                            name: 'custom',
                            backgroundImagePrice: price || 0,
                            price: 0,
                            customSideColor: customSideName === 'color',
                            customSideImage: customSideName === 'pattern',
                        },
                    ];
                }
            }

            // If not custom, just add normally
            return [
                ...prev,
                {
                    id: uuidv4(),
                    name: sideName,
                    backgroundImagePrice: price || 0,
                    price: 0,
                    customSideColor: false,
                    customSideImage: false,
                },
            ];
        });
    };

    const handleRemoveLogo = (sideName) => {
        setUploadedLogos((prev) =>
            prev.filter((item) => item.name !== sideName),
        );
    };

    const handleRemoveSingleLogo = (sideName, id) => {
        setUploadedLogos((prev) => prev.filter((item) => item.id !== id));
    };

    const removeCustomSide = (type) => {
        setUploadedLogos((prev) => {
            let updatedCustomLogo = null;

            const newLogos = prev.reduce((acc, logo) => {
                if (logo.name === 'custom') {
                    const updated = { ...logo };
                    if (type === 'color') updated.customSideColor = false;
                    if (type === 'pattern') updated.customSideImage = false;

                    if (!updated.customSideColor && !updated.customSideImage) {
                        // Both false, remove completely
                        return acc;
                    }

                    updatedCustomLogo = updated;
                    return [...acc, updated];
                }

                return [...acc, logo];
            }, []);

            // Update isSetCustom and isCustomSide state accordingly
            if (!updatedCustomLogo) {
                setCustomSideName('');
                setIsCustomSide(false);
            } else {
                setCustomSideName(true);
                if (
                    updatedCustomLogo.customSideColor &&
                    !updatedCustomLogo.customSideImage
                ) {
                    setCustomSideName('color');
                } else if (
                    !updatedCustomLogo.customSideColor &&
                    updatedCustomLogo.customSideImage
                ) {
                    setCustomSideName('pattern');
                }
            }

            return newLogos;
        });
    };

    useEffect(() => {
        if (!selectedUpgradeOption || selectedUpgradeOption === '') return;

        const updatedSides = boxSides.map((side) => {
            const selectedBoxData = boxData?.find(
                (item) => item.name === selectedBox,
            );
            const sideInfo = selectedBoxData?.upgrades?.find(
                (item) => item.name === selectedUpgradeOption,
            );
            const sidePrice = sideInfo?.prices[side.value];

            return {
                ...side,
                price: sidePrice,
            };
        });

        setBoxSides(updatedSides);
    }, [selectedUpgradeOption, upgradeOptions]);

    return (
        <>
            <div>
                <h1 className="text-2xl font-bold mt-6 mb-10 text-center w-fill">
                    Box Options
                </h1>
                <BoxOptions
                    boxData={boxData}
                    handleBoxClick={handleBoxClick}
                    selectedBox={selectedBox}
                />

                <h1 className="text-2xl font-bold mb-4 text-center w-fill mt-8">
                    {selectedBox} Sides
                </h1>
                <BoxSides
                    boxSides={boxSides}
                    handleRemoveLogo={handleRemoveLogo}
                    handleRemoveSingleLogo={handleRemoveSingleLogo}
                    removeCustomSide={removeCustomSide}
                    handleAddLogo={handleAddLogo}
                    uploadedLogos={uploadedLogos}
                    selectedBox={selectedBox}
                    upgradeOptions={upgradeOptions}
                    selectedUpgradeOption={selectedUpgradeOption}
                    setBackgroundImagePrice={setBackgroundImagePrice}
                    setIsModalOpen={setIsModalOpen}
                />

                {uploadedLogos && uploadedLogos.length > 0 && (
                    <>
                        <h1 className="text-2xl font-bold mb-4 text-center w-fill mt-20">
                            {selectedBox} Upgrade options
                        </h1>
                        <UpgradeOptions
                            upgradeOptions={upgradeOptions}
                            selectedUpgradeOption={selectedUpgradeOption}
                            setSelectedUpgradeOption={setSelectedUpgradeOption}
                        />
                    </>
                )}
            </div>
            <PriceModal
                isModalOpen={isModalOpen}
                handleBackgroundPrice={handleBackgroundPrice}
                handlePriceWithoutBackground={handlePriceWithoutBackground}
                backgroundImagePrice={backgroundImagePrice}
                setIsModalOpen={setIsModalOpen}
            />
            <TotalPrice totalPrice={totalPrice} />
        </>
    );
}
