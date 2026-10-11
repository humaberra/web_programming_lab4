// Sunucu isteğini simüle eden asenkron fonksiyon
const fetchTasks = () => {
    return new Promise((resolve) => {
        // 1500ms (1.5 saniye) gecikme süresi
        setTimeout(() => {
            // Ödevde istenen raw (ham) veri
            const rawData = [
                { id: 1, title: "Study JavaScript", completed: false },
                { id: 2, title: "Practice DOM", completed: true },
                { id: 3, title: "Read Async Patterns", completed: false }
            ];
            resolve(rawData); // Veriyi başarılı bir şekilde döndür
        }, 1500);
    });
};