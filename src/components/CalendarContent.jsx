import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCw, Plus, X, Search, Clock, Zap } from 'lucide-react';
import { useData } from '../context/DataProvider';
import Modal from './common/Modal';

// Center Modal Komponenti
const CenterModal = ({ isOpen, onClose, title, children, size = "max-w-xl" }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className={`bg-white w-full ${size} rounded-2xl shadow-2xl overflow-hidden`}>
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[85vh]">
                    {children}
                </div>
            </div>
        </div>
    );
};

const CalendarContent = () => {
    const { t, data, addPatient, addAppointment } = useData();
    const patients = data?.patients || [];
    const staff = data?.staff || [];
    const technicians = staff.filter(s => s.position === 'Texnik');

    // Drawer va Modal holatlari
    const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
    const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
    const [isAddNewPatientOpen, setIsAddNewPatientOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedDate, setSelectedDate] = useState("18.12.2025");

    // Yangi bemor ma'lumotlari
    const [newPatient, setNewPatient] = useState({
        name: '',
        surname: '',
        birthDate: '',
        phone: '',
        gender: 'erkak',
        address: ''
    });

    // Yangi navbat ma'lumotlari
    const [newAppointment, setNewAppointment] = useState({
        patientId: '',
        technicianId: '',
        appointmentTime: '18:32',
        duration: '',
        comment: '',
        sendSMS: false
    });

    // Jadval ustunlari (Doktorlar)
    const doctors = [
        { id: 1, name: "Sunnatillo", fullName: "Sunnatillo Istamov" },
        { id: 2, name: "Mateo", fullName: "Mateo Versace" },
        { id: 3, name: "Junior Mateo", fullName: "Junior Mateo" },
        { id: 4, name: "Jahongir", fullName: "Jahongir Xoliqov" }
    ];

    const [hoveredCell, setHoveredCell] = useState(null);

    const handleCellClick = (doctor) => {
        setSelectedDoctor(doctor);
        setIsSideDrawerOpen(true);
    };

    // Yangi bemor qo'shish - ASOSIY FUNKSIYA
    const handleAddNewPatient = () => {
        // Validatsiya
        if (!newPatient.name.trim()) {
            alert('Ism kiritilishi shart!');
            return;
        }
        if (!newPatient.phone.trim()) {
            alert('Telefon raqami kiritilishi shart!');
            return;
        }

        // Bemor qo'shish
        addPatient({
            name: newPatient.name.trim(),
            surname: newPatient.surname.trim(),
            birthDate: newPatient.birthDate.trim(),
            phone: newPatient.phone.trim(),
            gender: newPatient.gender,
            address: newPatient.address.trim()
        });

        // Yangi qo'shilgan bemorni topish
        const newPatientId = (patients.length > 0
            ? Math.max(...patients.map(p => p.id)) + 1
            : 1).toString();

        // Navbat formasi uchun yangi bemor ID sini o'rnatish
        setNewAppointment(prev => ({
            ...prev,
            patientId: newPatientId
        }));

        // Bemorni qo'shish modalini yopish
        setIsAddNewPatientOpen(false);

        // Navbat qo'shish modalini ochish
        setIsAddAppointmentOpen(true);

        // Formani tozalash
        setNewPatient({
            name: '',
            surname: '',
            birthDate: '',
            phone: '',
            gender: 'erkak',
            address: ''
        });

        // Muvaffaqiyat xabari
        console.log('Bemor muvaffaqiyatli qo\'shildi!');
    };

    // Yangi navbat qo'shish
    const handleAddAppointment = () => {
        if (!newAppointment.patientId) {
            alert('Bemor tanlanishi shart!');
            return;
        }
        if (!newAppointment.technicianId) {
            alert('Texnik tanlanishi shart!');
            return;
        }
        if (!selectedDoctor) {
            alert('Shifokor tanlanishi shart!');
            return;
        }

        // Navbat qo'shish
        addAppointment({
            patientId: newAppointment.patientId,
            technicianId: newAppointment.technicianId,
            appointmentTime: newAppointment.appointmentTime,
            duration: newAppointment.duration,
            comment: newAppointment.comment,
            sendSMS: newAppointment.sendSMS,
            doctorId: selectedDoctor.id,
            doctorName: selectedDoctor.fullName,
            date: selectedDate
        });

        // Modallarni yopish
        setIsAddAppointmentOpen(false);
        setIsSideDrawerOpen(false);

        // Formani tozalash
        setNewAppointment({
            patientId: '',
            technicianId: '',
            appointmentTime: '18:32',
            duration: '',
            comment: '',
            sendSMS: false
        });

        alert('Navbat muvaffaqiyatli qo\'shildi!');
    };

    // Input o'zgarishlarini boshqarish
    const handleNewPatientChange = (e) => {
        const { name, value } = e.target;
        setNewPatient(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAppointmentChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewAppointment(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Jinsni o'zgartirish
    const handleGenderChange = (gender) => {
        setNewPatient(prev => ({ ...prev, gender }));
    };

    return (
        <div className="p-4 md:p-8 space-y-6">
            {/* Breadcrumbs va Sana Navigatsiyasi */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <Link to="/" className="hover:text-[#00BCE4] transition-colors capitalize">{t('dashboard')}</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-gray-800 capitalize">{t('calendar')}</span>
                </div>

                <div className="flex items-center gap-2 bg-white p-1.5 rounded-lg shadow-sm border border-[#00BCE4]/20 w-full sm:w-auto">
                    <button className="p-1.5 rounded-md text-[#00BCE4] hover:bg-[#00BCE4]/5 transition">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 px-2 text-sm font-semibold text-gray-700">
                        <CalendarIcon className='w-4 h-4 text-gray-400' />
                        <span>{selectedDate}</span>
                    </div>
                    <button className="p-1.5 rounded-md bg-[#00BCE4] text-white hover:bg-[#00BCE4]/90 transition">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                    <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 transition border-l border-gray-100 ml-1">
                        <RotateCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Asosiy Taqvim Jadvali */}
            <div className="bg-white rounded-xl shadow-md border border-[#00BCE4]/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-r border-[#00BCE4]/20 w-40 bg-[#00BCE4]/5">
                                    Sana
                                </th>
                                {doctors.map((doctor, index) => (
                                    <th
                                        key={index}
                                        className={`px-6 py-4 text-center text-sm font-black uppercase tracking-widest border-b border-r border-[#00BCE4]/20 min-w-[200px] ${
                                            doctor.name === 'Junior Mateo' ? 'bg-white' : 'bg-[#00BCE4]/10'
                                        } text-gray-700`}
                                    >
                                        {doctor.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-32">
                                <td className="px-6 py-4 text-center text-sm font-bold text-gray-800 border-r border-[#00BCE4]/20 bg-[#00BCE4]/5">
                                    {selectedDate}
                                </td>
                                {doctors.map((doctor, docIndex) => (
                                    <td
                                        key={docIndex}
                                        className="relative p-0 border-r border-[#00BCE4]/20 transition-colors cursor-pointer group"
                                        onMouseEnter={() => setHoveredCell(docIndex)}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        onClick={() => handleCellClick(doctor)}
                                    >
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#00BCE4]/10">
                                            <Plus className="w-8 h-8 text-[#00BCE4]" />
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Side Drawer - Mijoz qo'shish */}
            <Modal
                isOpen={isSideDrawerOpen}
                onClose={() => setIsSideDrawerOpen(false)}
                title={t('add_client')}
            >
                <div className="space-y-6">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500">{selectedDoctor?.fullName}</span>
                        <div className="mt-6 flex justify-between items-center bg-[#00BCE4]/10 p-4 rounded-xl border border-[#00BCE4]/20">
                            <span className="text-lg font-black text-gray-800">{selectedDate}</span>
                            <button
                                onClick={() => setIsAddAppointmentOpen(true)}
                                className="px-4 py-2 bg-[#00BCE4] text-white font-bold rounded-lg hover:bg-[#00BCE4]/90 transition shadow-lg shadow-[#00BCE4]/30 text-xs uppercase tracking-wider"
                            >
                                {t('add_new')}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                        <div className="p-6 bg-gray-50 rounded-full">
                            <Zap className="w-12 h-12" />
                        </div>
                        <span className="text-sm font-medium">{t('no_data')}</span>
                    </div>
                </div>
            </Modal>

            {/* Yangi navbat qo'shish Modal */}
            <CenterModal
                isOpen={isAddAppointmentOpen}
                onClose={() => setIsAddAppointmentOpen(false)}
                title="Yangi navbat"
            >
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Bemor tanlang *</label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    name="patientId"
                                    value={newAppointment.patientId}
                                    onChange={handleAppointmentChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all appearance-none text-[#00BCE4]"
                                >
                                    <option value="">Bemor tanlang</option>
                                    {patients.map(p => (
                                        <option key={p.id} value={p.id}>{p.name} {p.familya}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={() => {
                                    setIsAddAppointmentOpen(false);
                                    setIsAddNewPatientOpen(true);
                                }}
                                className="p-3 bg-[#00BCE4] text-white rounded-xl hover:bg-[#00BCE4]/90 transition shadow-lg shadow-[#00BCE4]/30"
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Texnik tanlang *</label>
                        <select
                            name="technicianId"
                            value={newAppointment.technicianId}
                            onChange={handleAppointmentChange}
                            className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all appearance-none text-[#00BCE4]"
                        >
                            <option value="">Texnik tanlang</option>
                            {technicians.map(t => (
                                <option key={t.id} value={t.id}>{t.fio}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Navbat vaqti</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="time"
                                name="appointmentTime"
                                value={newAppointment.appointmentTime}
                                onChange={handleAppointmentChange}
                                className="w-full pl-10 pr-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Davomiyligi (daqiqa)</label>
                        <input
                            type="text"
                            name="duration"
                            value={newAppointment.duration}
                            onChange={handleAppointmentChange}
                            placeholder="Yozing..."
                            className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Izoh</label>
                        <textarea
                            rows="3"
                            name="comment"
                            value={newAppointment.comment}
                            onChange={handleAppointmentChange}
                            placeholder="Yozing..."
                            className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all resize-none text-[#00BCE4]"
                        />
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm font-bold text-gray-700">SMS yuborish</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="sendSMS"
                                checked={newAppointment.sendSMS}
                                onChange={handleAppointmentChange}
                                className="sr-only peer"
                            />
                            <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00BCE4]"></div>
                        </label>
                    </div>

                    <button
                        onClick={handleAddAppointment}
                        className="w-full py-4 bg-[#00BCE4] text-white font-black rounded-xl hover:bg-[#00BCE4]/90 transition-all shadow-xl shadow-[#00BCE4]/40 uppercase tracking-widest mt-4 active:scale-[0.98]"
                    >
                        Navbat qo'shish
                    </button>
                </div>
            </CenterModal>

            {/* Yangi Bemor qo'shish Modal */}
            <CenterModal
                isOpen={isAddNewPatientOpen}
                onClose={() => setIsAddNewPatientOpen(false)}
                title="Yangi bemor qo'shish"
                size="max-w-2xl"
            >
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Ism *</label>
                            <input
                                type="text"
                                name="name"
                                value={newPatient.name}
                                onChange={handleNewPatientChange}
                                placeholder="Ism kiriting"
                                className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Familiya</label>
                            <input
                                type="text"
                                name="surname"
                                value={newPatient.surname}
                                onChange={handleNewPatientChange}
                                placeholder="Familiya kiriting"
                                className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Telefon raqami *</label>
                            <input
                                type="text"
                                name="phone"
                                value={newPatient.phone}
                                onChange={handleNewPatientChange}
                                placeholder="+998 XX XXX XX XX"
                                className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Tug'ilgan sana</label>
                            <input
                                type="text"
                                name="birthDate"
                                value={newPatient.birthDate}
                                onChange={handleNewPatientChange}
                                placeholder="kun.oy.yil"
                                className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Jins</label>
                        <div className="flex bg-gray-100 p-1 rounded-xl">
                            <button
                                type="button"
                                onClick={() => handleGenderChange('erkak')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                                    newPatient.gender === 'erkak'
                                    ? 'bg-[#00BCE4] text-white shadow-lg'
                                    : 'text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                Erkak
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGenderChange('ayol')}
                                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
                                    newPatient.gender === 'ayol'
                                    ? 'bg-[#00BCE4] text-white shadow-lg'
                                    : 'text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                Ayol
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Manzil</label>
                        <input
                            type="text"
                            name="address"
                            value={newPatient.address}
                            onChange={handleNewPatientChange}
                            placeholder="Manzilni kiriting"
                            className="w-full px-4 py-3 bg-white border border-[#00BCE4] rounded-xl focus:ring-2 focus:ring-[#00BCE4] outline-none transition-all text-[#00BCE4]"
                        />
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            onClick={handleAddNewPatient}
                            className="px-10 py-4 bg-[#00BCE4] text-white font-black rounded-xl hover:bg-[#00BCE4]/90 transition-all shadow-xl shadow-[#00BCE4]/40 uppercase tracking-widest active:scale-[0.98]"
                        >
                            Bemor qo'shish
                        </button>
                    </div>
                </div>
            </CenterModal>
        </div>
    );
};

export default CalendarContent;
