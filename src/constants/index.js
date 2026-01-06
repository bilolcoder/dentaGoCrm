// constants/constants.js

export const availableRoles = ["Shifokor", "Direktor", "Texnik", "Qabulxona xodimi", "Sotuvchi"];

export const availableColors = ["green", "blue", "red", "white"];

export const colorDotClasses = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    red: "bg-red-500",
    white: "bg-gray-300",
};

export const availableServices = [
    "Test",
    "Fiksatsiya koronkasini sementlash (do 3-x zubov)",
    "Snyatie koronki",
    "Individualnaya lojka",
    "Pochinka syomnyego proteza",
    "Protezi iz polimernix materialov",
    "Mikroprotez (do 2-x zubov)",
];

// Yoki ko'proq xizmatlar kerak bo'lsa, data.js dan olib qo'shib qo'yish mumkin:

export const serviceStatuses = ["Faol", "Nofaol"];
export const paymentTypes = ["Naqd", "Plastik karta", "Bank o'tkazmasi", "Click", "Payme"];

export const orderStatuses = [
    { id: 1, name: "Yangi", color: "gray-500", step: 1 },
    { id: 2, name: "Jarayonda", color: "blue-500", step: 2 },
    { id: 3, name: "Tekshiruvda", color: "yellow-500", step: 3 },
    { id: 4, name: "Tayyor", color: "green-500", step: 4 },
    { id: 5, name: "Qaytarilgan", color: "red-500", step: 5 },
];

export const treatmentStatuses = [
    "Yangi",
    "Davom etmoqda",
    "Shifokor yakunlandi",
    "Tugatildi",
    "Bekor qilindi"
];

export const patientGenders = ["Erkak", "Ayol"];

export const expenseCategories = [
    "Oziq-ovqat",
    "Transport",
    "Kanselyariya",
    "Kommunal",
    "Boshqa"
];

export const smsTemplateTypes = [
    "Bemor qabuli",
    "Tug'ilgan kun",
    "Qayta qo'ng'iroq",
    "Reklama",
    "Boshqa"
];

export const advertisementStatuses = ["active", "inactive"];

export const productUnits = [
    "dona",
    "quti",
    "korobka",
    "M",
    "L",
    "KG",
    "шт"
];

// Qo'shimcha ranglar
export const additionalColors = {
    primary: "#3B82F6",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#6366F1",
    dark: "#1F2937",
    light: "#F3F4F6"
};

// Time slots
export const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

// App themes
export const availableThemes = ["light", "dark", "system"];

// Languages
export const availableLanguages = [
    { code: "uz", name: "O'zbekcha" },
    { code: "ru", name: "Русский" },
    { code: "en", name: "English" }
];
