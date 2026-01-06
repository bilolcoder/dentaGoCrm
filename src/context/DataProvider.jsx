import React, { createContext, useState, useEffect, useContext } from 'react';
import { translations } from '../constants/translations';

// Birlashtirilgan boshlang'ich ma'lumotlar
const initialData = {
    // Xodimlar ma'lumotlari
    staff: [
        { id: 1, fio: "Jahongir Ahmedov", position: "Shifokor", login: "jahongir", phone: "+998911977882", color: 'green', status: 'Faol' },
        { id: 2, fio: "Mateo Versace", position: "Texnik", login: "tech", phone: "+998991234567", color: 'blue', status: 'Faol' },
        { id: 3, fio: "Reception Center", position: "Qabulxona xodimi", login: "reception1", phone: "+998901112233", color: 'red', status: 'Faol' },
        { id: 4, fio: "Abduxalim To'xtayev", position: "Direktor", login: "test_admin", phone: "+998934445566", color: 'white', status: 'Faol' },
    ],

    // Bemorlar ma'lumotlari
    patients: [
        { id: 1, name: "Abdurahmon", familya: "Safarov", birthDate: "03.12.1999", phone: "998971234567", debt: "0 so'm", registrationDate: "26.09.2025", gender: 'Erkak', address: 'Surxondaryo viloyati' },
        { id: 2, name: "Jonibek", familya: "Tursunov", birthDate: "10.11.2000", phone: "998971923888", debt: "-250 000 so'm", registrationDate: "26.09.2025", gender: 'Erkak', address: 'Fargona viloyati' },
    ],

    // Xarajatlar
    dailyExpenses: [],
    expenseCategories: [
        { id: 1, name: "Oziq-ovqat" },
        { id: 2, name: "Transport" },
        { id: 3, name: "Kanselyariya" },
        { id: 4, name: "Kommunal" },
        { id: 5, name: "Boshqa" }
    ],

    // Davolashlar
    treatments: [],

    // Navbatlar (appointments) qo'shamiz
    appointments: [],

    // Klinika ma'lumotlari
    clinicInfo: {
        id: 1,
        name: "Yangi Klinikangiz nomi",
        address: "Samarqand sh., Ulug'bek ko'chasi 1A",
        phone: "+998 90 123 45 67",
        email: "info@clinic.uz",
        bankDetails: "Hisob raqam: 20208000900000123456, MFO: 00424",
    },

    // SMS shablonlari
    smsTemplates: [
        {
            id: 75,
            name: "Bemorga kelish uchun eslatma",
            type: "Bemor qabuli",
            status: true,
            message: "Hurmatli {bemor}! Sizning qabulgilingiz {doctor} qabulida {clinic} da belgilangan. Qabul vaqti: {sana}. Iltimos, vaqtida tashrif buyuring.",
            variables: ['{bemor}', '{sana}', '{doctor}', '{clinic}'],
            createdAt: "16.10.2025 11:38",
            updatedAt: "12.12.2025 14:28"
        },
        {
            id: 76,
            name: "Tug'ilgan kun bilari",
            type: "Tug'ilgan kun",
            status: true,
            message: "Hurmatli {bemor}! Sizni tug'ilgan kuniningiz bilan chin qalbimizdan tabriklaymiz. {clinic} jamoasi.",
            variables: ['{bemor}', '{clinic}'],
            createdAt: "16.10.2025 11:40",
            updatedAt: "12.12.2025 14:30"
        },
    ],

    // SMS sozlamalari
    smsSettings: [
        {
            id: 1,
            clinicName: "Dental Soft Klinikasi",
            token: "ASDF123-ZXCV456-QWER789-MNBV012",
            updatedAt: "15.12.2025 14:00",
        },
    ],

    // Umumiy sozlamalar
    generalSettings: {
        id: 1,
        companyName: "Dental Soft Klinika",
        phone1: "+998 90 123 45 67",
        phone2: "+998 91 765 43 21",
        email: "info@dentalsoft.uz",
        address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi 16-uy",
        logoUrl: "/path/to/default/logo.png",
        lastUpdated: "15.12.2025 14:30"
    },

    // Lead kategoriyalari
    leadCategories: [
        { id: 1, name: "Veb-sayt", status: true },
        { id: 2, name: "Instagram", status: true },
        { id: 3, name: "Yangi kelgan", status: true },
    ],

    // Kasalliklar
    diseases: [
        { id: 1, name: "Karies", color: "#F05252", status: true },
        { id: 2, name: "Pulpit", color: "#3B82F6", status: true },
        { id: 3, name: "Periodontit", color: "#10B981", status: false },
    ],

    // Ombor ma'lumotlari
    storage: {
        documents: [
            { id: 1, name: "Asosiy shartnoma", supplier: "Global Pharma", date: "01.12.2025", filename: "contract_global_pharma.pdf" },
            { id: 2, name: "Litsenziya nusxasi", supplier: "—", date: "10.11.2025", filename: "license.jpg" },
        ],
        categories: [
            { id: 1, name: "Pechatkalar", status: true },
            { id: 2, name: "Iglalar", status: true },
        ],
        brands: [
            { id: 1, name: "Colgate", status: true },
            { id: 2, name: "3M Espe", status: false },
        ],
        products: [
            { id: 1, name: "Kariyes to'ldirgich", price: 150000, minQty: 5, maxQty: 50, brand: "3M Espe", category: "Pechatkalar", unit: "dona", quantity: 15, status: true },
        ],
        units: [
            { id: 1, name: "dona", status: true },
            { id: 2, name: "quti", status: true },
            { id: 3, name: "korobka", status: true },
            { id: 4, name: "M", status: true },
            { id: 5, name: "L", status: true },
            { id: 6, name: "KG", status: true },
            { id: 7, name: "шт", status: true },
        ],
        suppliers: [
            { id: 101, firstName: "Ali", lastName: "Valiyev", phone1: "+998 90 123 45 67", phone2: "", status: true, company: 'Yetkazib beruvchi A' },
            { id: 102, firstName: "Bahodir", lastName: "Ahmadov", phone1: "+998 99 987 65 43", phone2: "+998 97 777 77 77", status: true, company: 'Dental World' },
            { id: 103, firstName: "Dilfuza", lastName: "Karimova", phone1: "+998 88 555 55 55", phone2: "", status: false, company: 'Global Pharma' },
        ],
    },

    // Reklama ma'lumotlari
    advertisements: [
        { id: 1, title: "Yangi yil aksiyasi", content: "Davolash xizmatlariga 15% chegirma.", status: "active", date: "2025-12-01" },
        { id: 2, title: "Vrach qabuli", content: "Bepul diagnostika!", status: "inactive", date: "2025-11-15" },
    ],

    // E'lonlar
    announcements: [
        {
            id: 1,
            image: "https://via.placeholder.com/400x300",
            description: "Yangi xizmatlarimiz haqida ma'lumot! Tishlarni oqartirish xizmati 30% chegirma bilan.",
            paymentStatus: "To'landi",
            createdAt: "2025-12-10",
            expiresAt: "2025-12-17",
            isActive: true
        }
    ],

    // Xizmatlar
    services: [
        { id: 1, name: "Test", price: "200 000 so'm", costPrice: "150 000 so'm", categoryId: 1, status: "Faol" },
        { id: 119, name: "Первичная консультация ортодонта", price: "50 000 so'm", costPrice: "", categoryId: 9, status: "Faol" },
    ],

    serviceCategories: [
        { id: 1, name: "Plonba", status: "Faol", color: "#3B82F6" },
        { id: 2, name: "Blomba qilish", status: "Faol", color: "#F59E0B" },
        { id: 3, name: "Tish olish", status: "Faol", color: "#EF4444" },
        { id: 4, name: "ДОПОЛНИТЕЛЬНО", status: "Faol", color: "#8B5CF6" },
        { id: 5, name: "ИМПЛАНТАЦИЯ", status: "Faol", color: "#10B981" },
        { id: 6, name: "Хирургия", status: "Faol", color: "#F97316" },
        { id: 7, name: "Лечение", status: "Faol", color: "#6366F1" },
        { id: 8, name: "ОРТОПЕДИЯ", status: "Faol", color: "#EC4899" },
        { id: 9, name: "ОРТОДОНТИЯ", status: "Faol", color: "#14B8A6" },
    ],

    // To'lovlar
    payments: [
        { id: 1, patientId: 1, amount: "100 000", type: "Naqd", date: "15.12.2025", comment: "Oldindan to'lov" },
    ],

    // Xodimlar (Dropdown uchun)
    staffForDropdown: [
        { id: 1, name: "Jahongir Ahmedov", role: "Stomatolog", type: "fixed" },
        { id: 2, name: "Mateo Versace", role: "Texnik", type: "percent" },
        { id: 3, name: "Dr. House", role: "Terapevt", type: "fixed" },
        { id: 4, name: "Abduxalim To'xtayev", role: "Direktor", type: "percent" },
        { id: 5, name: "Shaxzoda Karimova", role: "Hamshira", type: "fixed" }
    ],

    // Xizmat biriktirishlar
    serviceAssignments: [],

    // Buyurtma holatlari
    orderStatuses: [
        { id: 1, name: "Yangi", color: "gray-500", step: 1 },
        { id: 2, name: "Jarayonda (Ishlash)", color: "blue-500", step: 2 },
        { id: 3, name: "Sifat Tekshiruvi", color: "yellow-500", step: 3 },
        { id: 4, name: "Tayyor/Yetkazib Berildi", color: "green-500", step: 4 },
        { id: 5, name: "Qaytarildi (Defekt)", color: "red-500", step: 5 },
    ],

    // Kurslar
    courses: [
        {
            id: 1,
            name: "Zamonaviy Endodontiya",
            teacher: "Dr. Alisher Valiyev",
            price: "1 500 000 so'm",
            image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop",
            comments: [
                { id: 1, user: "Bahodir", text: "Juda foydali kurs ekan!", date: "2025-12-10" }
            ]
        },
        {
            id: 2,
            name: "Ortopedik Stomatologika Asoslari",
            teacher: "Prof. Jamshid Karimov",
            price: "2 200 000 so'm",
            image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2074&auto=format&fit=crop",
            comments: []
        }
    ],

    // Mahsulotlar sarfi
    productUsage: [
        {
            id: 1,
            doctorId: 1,
            doctorName: "Dr. Alisher Valiyev",
            patientId: 101,
            patientName: "Bahodir Toshmatov",
            productId: 501,
            productName: "Shpris (5ml)",
            quantity: "2 dona",
            date: "2025-12-18"
        },
        {
            id: 2,
            doctorId: 2,
            doctorName: "Dr. Malika Ahmedova",
            patientId: 102,
            patientName: "Gulnora Karimova",
            productId: 502,
            productName: "Tibbiy qo'lqop",
            quantity: "1 juft",
            date: "2025-12-18"
        }
    ],

    // Buyurtmalar
    btsOrders: [
        {
            id: 1,
            title: "Yuqori jag'ga keramik kron",
            doctor: "Jahongir Ahmedov (ID:1)",
            patientName: "Abdurahmon Safarov",
            technician: "Mateo Versace (ID:2)",
            dateCreated: "2025-12-14",
            dateDue: "2025-12-20",
            statusId: 2,
            price: 500000,
            paymentStatus: "To'lanmadi",
            comments: "Rangi A2. Qat'iy o'lchamga rioya qiling.",
            materials: [
                { name: "Keramika bloki", qty: 1, unit: "dona" },
                { name: "Sementlash vositasi", qty: 0.5, unit: "ml" },
            ]
        },
        {
            id: 2,
            title: "Pastki jag'da metall kasting",
            doctor: "Abduxalim To'xtayev (ID:4)",
            patientName: "Jonibek Tursunov",
            technician: "Mateo Versace (ID:2)",
            dateCreated: "2025-12-10",
            dateDue: "2025-12-15",
            statusId: 4,
            price: 150000,
            paymentStatus: "To'landi",
            comments: "Oddiy kasting, tezlashtirilgan tartibda.",
            materials: []
        },
    ],

    // Foydalanuvchi profili
    user: {
        id: "133",
        name: "Abduxalim",
        surname: "To'xtayev",
        role: "Direktor",
        login: "test_admin",
        image: null,
        createdAt: "11.09.2025 21:12",
        updatedAt: "26.09.2025 16:40"
    }
};

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    // Til holati
    const [locale, setLocale] = useState(localStorage.getItem('app_locale') || 'uz');

    // Mavzu holati
    const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'light');

    // Autentifikatsiya holati
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoaded, setAuthLoaded] = useState(false);

    // Til o'zgartirish
    const switchLocale = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('app_locale', newLocale);
    };

    // Mavzuni o'zgartirish
    const switchTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('app_theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    // Tarjima funksiyasi
    const t = (key) => {
        return translations[locale]?.[key] || key;
    };

    // Login funksiyalari
    const login = (username, password) => {
        if (username === 'admin' && password === '123') {
            localStorage.setItem('auth_token', 'simulated_token');
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const loginWithPhone = (phone) => {
        localStorage.setItem('userPhone', phone);
        localStorage.setItem('accessToken', 'simulated_access_token');
        setIsAuthenticated(true);
        return true;
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userPhone');
        setIsAuthenticated(false);
    };

    // Ma'lumotlar holati
    const [data, setData] = useState(() => {
        const localData = localStorage.getItem('clinic_app_data');
        if (localData) {
            try {
                const parsedData = JSON.parse(localData);
                // Ensure essential arrays exist
                if (!parsedData.patients) parsedData.patients = initialData.patients;
                if (!parsedData.staff) parsedData.staff = initialData.staff;
                if (!parsedData.appointments) parsedData.appointments = [];
                if (!parsedData.treatments) parsedData.treatments = [];
                if (!parsedData.user) parsedData.user = initialData.user;
                return parsedData;
            } catch (e) {
                console.error("Local storage ma'lumotlarini o'qishda xato:", e);
                return initialData;
            }
        }
        return initialData;
    });

    // Ma'lumotlarni localStorage'da saqlash
    useEffect(() => {
        localStorage.setItem('clinic_app_data', JSON.stringify(data));
    }, [data]);

    // Yaxshilangan updateData funksiyasi - xatoni tuzatamiz
    const updateData = (updates) => {
        setData(prevData => {
            // Agar updates obyekt bo'lsa, uni birlashtiramiz
            if (typeof updates === 'object' && !Array.isArray(updates)) {
                return { ...prevData, ...updates };
            }
            return prevData;
        });
    };

    // Maxsus funksiyalar - oddiyroq versiya

    // Bemor qo'shish
    const addPatient = (patientData) => {
        setData(prevData => {
            const newId = prevData.patients.length > 0
                ? Math.max(...prevData.patients.map(p => p.id)) + 1
                : 1;

            const newPatient = {
                id: newId,
                name: patientData.name,
                familya: patientData.surname || '',
                birthDate: patientData.birthDate || '',
                phone: patientData.phone,
                debt: "0 so'm",
                registrationDate: new Date().toLocaleDateString('uz-UZ', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                }),
                gender: patientData.gender === 'ayol' ? 'Ayol' : 'Erkak',
                address: patientData.address || ''
            };

            return {
                ...prevData,
                patients: [...prevData.patients, newPatient]
            };
        });
    };

    // Navbat qo'shish (appointment)
    const addAppointment = (appointmentData) => {
        setData(prevData => {
            const newId = prevData.appointments?.length > 0
                ? Math.max(...prevData.appointments.map(a => a.id)) + 1
                : 1;

            const patient = prevData.patients.find(p => p.id.toString() === appointmentData.patientId);
            const technician = prevData.staff.find(s => s.id.toString() === appointmentData.technicianId);

            const newAppointment = {
                id: newId,
                patientId: appointmentData.patientId,
                patientName: patient ? `${patient.name} ${patient.familya}` : 'Noma\'lum bemor',
                doctorId: appointmentData.doctorId,
                doctorName: appointmentData.doctorName || 'Noma\'lum shifokor',
                technicianId: appointmentData.technicianId,
                technicianName: technician ? technician.fio : 'Noma\'lum texnik',
                date: appointmentData.date,
                time: appointmentData.time || appointmentData.appointmentTime,
                duration: appointmentData.duration || '',
                comment: appointmentData.comment || '',
                sendSMS: appointmentData.sendSMS || false,
                status: 'scheduled',
                createdAt: new Date().toISOString()
            };

            const currentAppointments = prevData.appointments || [];
            return {
                ...prevData,
                appointments: [...currentAppointments, newAppointment]
            };
        });
    };

    // Autentifikatsiyani tekshirish
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken') || localStorage.getItem('auth_token');
        const savedPhone = localStorage.getItem('userPhone');

        if (accessToken || savedPhone) {
            setIsAuthenticated(true);
        }
        setAuthLoaded(true);
    }, []);

    // Mavzuni DOM'ga qo'shish
    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    // Yuklanishni kutish
    if (!authLoaded) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Yuklanmoqda...</p>
                </div>
            </div>
        );
    }

    return (
        <DataContext.Provider value={{
            // Data holati
            data,
            setData,
            updateData, // Endi bu obyekt qabul qiladi

            // Maxsus funksiyalar
            addPatient,
            addAppointment,
            addTreatment: (patientId, treatmentDetails) => {
                // Soddalashtirilgan versiya
                console.log('Treatment added:', { patientId, treatmentDetails });
            },

            // Til va mavzu
            locale,
            switchLocale,
            theme,
            switchTheme,
            t,

            // Autentifikatsiya
            isAuthenticated,
            login,
            loginWithPhone,
            logout
        }}>
            {children}
        </DataContext.Provider>
    );
};
