const REGION_QUERY_PARAM = "devOverrideRegion";

// Моковая реализация геобазы
const geobase = {
    RU: ["213", "2", "3", "4", "5"],
    BY: ["149", "248", "347", "446", "545"],
    KZ: ["159", "258", "357", "456", "555"],
};

export function getRegion(): string | null {
    // Для тестирования при разработке поддерживаем переопределение региона через query-параметр
    const urlParams = new URLSearchParams(window.location.search);
    const overrideRegion = urlParams.get(REGION_QUERY_PARAM);

    if (overrideRegion) {
        return overrideRegion;
    }

    // Моковая реализация определения региона пользователя
    const regions = Object.entries(geobase);
    const randomRegionIndex = Math.floor(Math.random() * regions.length);
    const [region] = regions[randomRegionIndex];

    return region;
}
