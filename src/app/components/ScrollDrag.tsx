'use client'

import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

export const ScrollDrag = ({ children, style }: { children: React.ReactNode, style?: string }) => {

    const ref2 = useRef<HTMLDivElement>(null) as React.RefObject<HTMLInputElement>;
    const { events: events2 } = useDraggable(ref2, {
        applyRubberBandEffect: true,
    });

    return (
        <div
            className={style ? style : "flex gap-4 px-5 py-2 overflow-x-scroll hide-scrollbar"}
            {...events2}
            ref={ref2}
        >
            {children}
        </div>
    );
};