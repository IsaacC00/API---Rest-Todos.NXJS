'use client';

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
    currentIndex?: number;
    tabOptions?: number[];

}

export const TabBar = ({ currentIndex = 1, tabOptions = [1, 2, 3, 4, 5] }: Props) => {

    //? statae para manejar el tab selecionado 
    const [selected, setSelected] = useState(currentIndex)

    const onSelecteTab = (tab: number) => {
        setSelected(tab);
        setCookie('selectedTab', tab.toString());
    }

    return (
        <div
            style={{ gridTemplateColumns: `repeat(${tabOptions.length}, minmax(0, 1fr))` }}
            className={`grid w-full space-x-2 rounded-xl bg-white p-2`}>
            {
                tabOptions.map(tab => (
                    <div key={tab}>
                        <input
                            checked={selected === tab}
                            onChange={() => { }}
                            type="radio"
                            id={tab.toString()}
                            className="peer hidden" />
                        <label
                            onClick={() => { onSelecteTab(tab) }}
                            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
                            {tab}
                        </label>
                    </div>
                ))
            }


        </div>
    )
}
