'use client'

import { useRef } from "react";

interface DragState {
    isDown: boolean;
    startX: number;
    scrollLeftStart: number;
}

export default function HorizontalScrollContainer({ children, className }: any) {
    const ref = useRef<HTMLDivElement | null>(null);
    const dragState = useRef<DragState>({ isDown: false, startX: 0, scrollLeftStart: 0 });

    const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;

        dragState.current.isDown = true;
        dragState.current.startX = e.pageX - el.offsetLeft;
        dragState.current.scrollLeftStart = el.scrollLeft;

        el.classList.add("dragging");
    };

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el || !dragState.current.isDown) return;

        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = (x - dragState.current.startX) * 1.3;
        el.scrollLeft = dragState.current.scrollLeftStart - walk;
    };

    const onMouseUp = () => {
        const el = ref.current;
        if (!el) return;

        dragState.current.isDown = false;
        el.classList.remove("dragging");
    };

    return (
        <div
            ref={ref}
            className={className}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            {children}
        </div>
    );
}