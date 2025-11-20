export const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let season = "winter";
    if (month >= 3 && month <= 5) season = "spring";
    else if (month >= 6 && month <= 8) season = "summer";
    else if (month >= 9 && month <= 11) season = "fall";

    return { season, year };
};