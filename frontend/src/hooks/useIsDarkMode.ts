import { useEffect, useState } from 'react';

export function useIsDarkMode(): boolean {
    const getCurrent = () =>
        document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const [isDark, setIsDark] = useState(getCurrent);

    useEffect(() => {
        const root = document.documentElement;
        const observer = new MutationObserver(() => {
            setIsDark(getCurrent());
        });

        observer.observe(root, { attributes: true, attributeFilter: ['class'] });

        const media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener?.('change', () => {
            setIsDark(getCurrent());
        });

        return () => {
            observer.disconnect();
            media.removeEventListener?.('change', () => {
                setIsDark(getCurrent());
            });
        };
    }, []);

    return isDark;
}
