const API_URL = 'http://localhost:5090/api/data'; // Убедитесь, что порт совпадает

export const sendDataToBackend = async (data) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Указываем, что отправляем JSON
            },
            body: JSON.stringify(data), // Преобразуем данные в JSON
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json(); // Получаем ответ от сервера
        console.log('Response:', result);
        return result;
    } catch (error) {
        console.error('Error sending data:', error);
        throw error;
    }
};