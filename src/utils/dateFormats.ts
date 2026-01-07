export function dateFormats(
    date: Date | string | number,
    locale = "ru-RU"
) {
    const d = new Date(date);

    return {
        get short() {
            return d.toLocaleDateString(locale);
        },
        get full() {
            return d.toLocaleString(locale);
        },
        get time() {
            return d.toLocaleTimeString(locale);
        },
    };
}