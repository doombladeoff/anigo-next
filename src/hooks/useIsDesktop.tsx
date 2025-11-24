'use client'

import { useEffect, useState } from "react";

export function useIsMobile() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1024px)");

        const handler = () => setMobile(mq.matches);
        handler();

        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return mobile;
}
