'use client';

import { MoonIcon, SunIcon } from "lucide-react";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Label } from "../ui/label";

const SwitchTheme = () => {
    const isMobile = useIsMobile();
    const { setTheme, theme } = useTheme();
    const isDark = theme === 'dark';

    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return;

    return (
        <div className="flex items-center space-x-2 cursor-pointer">
            {!isMobile && <SunIcon className="size-4" />}
            <Switch
                id="theme-switch"
                checked={isDark}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                className="h-6 w-11 [&>span]:h-5.5 [&>span]:w-5.5 cursor-pointer"
            />
            {isMobile && <Label>Сменить тему</Label>}
            {!isMobile && <MoonIcon className="size-4 text-muted-foreground" />}
        </div>
    );
}

export default SwitchTheme;