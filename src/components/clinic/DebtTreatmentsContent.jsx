import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, MoreVertical, Eye, DollarSign, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

const debtTreatmentsData = [
    {
        id: 1,
        patient: "Jonibek Tursunov",
        phone: "998971923888",
        doctor: "Sunnatillo Istamov",
        schedule_date: "03.11.2025 00:00",
        treatment_status: "Shifokor yakunlandi",
        total_amount: "200 000 so'm",
        discount: "-",
        debt_amount: "- 200 000 so'm",
        payment_status: "To'lanmadi",
        technician: "Mateo Technician",
        doctor_share: "0 so'm",
        technician_share: "-",
    },
    {
        id: 2,
        patient: "Jonibek Tursunov",
        phone: "998971923888",
        doctor: "Mateo Versace",
        schedule_date: "28.10.2025 17:56",
        treatment_status: "Shifokor yakunlandi",
        total_amount: "50 000 so'm",
        discount: "-",
        debt_amount: "- 50 000 so'm",
        payment_status: "To'lanmadi",
        technician: "Mateo Technician",
        doctor_share: "0 so'm",
        technician_share: "-",
    },
];

const DebtTreatmentsContent = () => {
    const { t } = useData();
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

    const handleDropdownToggle = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    // Barcha statuslar uchun faqat #00BCE4 ishlatiladi
    const getStatusClasses = () => "bg-[#00BCE4]/10 text-[#00BCE4] font-semibold";

    const renderDatePicker = ({ isOpen, setIsOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="absolute z-10 mt-2 right-0 rounded-xl shadow-2xl p-4 border border-[#00BCE4]/10 w-64">
                <div className='text-center text-sm font-bold text-slate-800 py-2'>Dec 2025</div>
                <div className="grid grid-cols-7 gap-1 text-center text-sm">
                    {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                        <div key={day} className="text-[10px] font-bold text-slate-400 uppercase">{day}</div>
                    ))}
                    {[...Array(30).keys()].map(i => i + 1).map(day => (
                        <div key={day} className={`py-1.5 rounded-lg cursor-pointer transition-colors ${day === 13 ? 'bg-[#00BCE4] text-white' : 'hover:bg-[#00BCE4]/10 text-slate-600'}`}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className='flex justify-between mt-4 border-t border-slate-100 pt-3'>
                    <button onClick={() => setIsOpen(false)} className='text-xs font-bold text-slate-400 hover:text-slate-600'>Bekor qilish</button>
                    <button onClick={() => setIsOpen(false)} className='text-xs font-bold text-[#00BCE4] px-3 py-1 rounded-lg bg-[#00BCE4]/10'>Tanlash</button>
                </div>
            </div>
        )
    }

    const renderPaymentModal = ({ isPaymentModalOpen, setIsPaymentModalOpen }) => {
        if (!isPaymentModalOpen) return null;

        return (
            <div className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-sm flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl shadow-2xl border border-[#00BCE4]/20">
                    <div className="flex justify-between items-center p-6 border-b border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800">To'lov qilish</h2>
                        <button onClick={() => setIsPaymentModalOpen(false)} className="text-slate-400 hover:text-[#00BCE4] transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-5">
                        <div className="p-4 bg-[#00BCE4]/5 rounded-xl border border-[#00BCE4]/10">
                            <p className="text-sm text-slate-500 mb-1">Bemor</p>
                            <p className="font-bold text-slate-800">Jonibek Tursunov</p>
                            <div className="mt-3 pt-3 border-t border-[#00BCE4]/10">
                                <p className="text-sm text-slate-500 mb-1">Qarzdorlik</p>
                                <p className="text-xl font-black text-[#00BCE4]">250 000 so'm</p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To'lanayotgan miqdor</label>
                            <input
                                type="text"
                                placeholder="0.00"
                                className="w-full py-3 text-[#00BCE4] px-4 border border-[#00BCE4]/20 rounded-xl focus:outline-none focus:border-[#00BCE4] focus:ring-2 focus:ring-[#00BCE4]/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">To'lov turi</label>
                            <div className="relative">
                                <select className="appearance-none block w-full bg-white border border-[#00BCE4]/20 text-slate-700 py-3 px-4 pr-10 rounded-xl focus:outline-none focus:border-[#00BCE4] transition-all">
                                    <option>Naqd</option>
                                    <option>Plastik karta</option>
                                    <option>Pul o'tkazish</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[#00BCE4] w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100">
                        <button
                            onClick={() => setIsPaymentModalOpen(false)}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#00BCE4] text-white font-bold rounded-xl hover:bg-[#00a7cc] shadow-lg shadow-[#00BCE4]/20 transition-all active:scale-[0.98]"
                        >
                            <DollarSign className='w-5 h-5' /> To'lovni tasdiqlash
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors uppercase tracking-wider">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#00BCE4] uppercase tracking-wider">{t('debt_treatments')}</span>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <div className="relative grow max-w-sm">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4]/50" />
                            <input
                                type="text"
                                placeholder="Qidirish..."
                                className="w-full py-2.5 pl-10 pr-4 text-[#00BCE4] border border-[#00BCE4]/20 rounded-xl focus:outline-none focus:border-[#00BCE4] bg-white transition-all"
                            />
                        </div>
                        <button className="flex items-center justify-center bg-[#00BCE4] text-white rounded-xl hover:bg-[#00a7cc] transition-all w-12 h-11 shadow-lg shadow-[#00BCE4]/10">
                            <ChevronDown className='w-5 h-5 transform rotate-180' />
                        </button>
                    </div>
                </div>

                <div className='flex flex-wrap gap-4 items-center'>
                    <div className="relative min-w-[200px]">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Boshlanish sanasi</label>
                        <div className="relative" onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}>
                            <input
                                type="text"
                                placeholder="Sanani tanlang"
                                readOnly
                                className="w-full py-2.5 px-4 text-[#00BCE4] pr-10 border border-[#00BCE4]/20 rounded-xl bg-white cursor-pointer focus:border-[#00BCE4] outline-none"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4]" />
                        </div>
                        {renderDatePicker({ isOpen: isStartDatePickerOpen, setIsOpen: setIsStartDatePickerOpen })}
                    </div>

                    <div className="relative min-w-[200px]">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Tugash sanasi</label>
                        <div className="relative" onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}>
                            <input
                                type="text"
                                placeholder="Sanani tanlang"
                                readOnly
                                className="w-full py-2.5 px-4 pr-10 text-[#00BCE4] border border-[#00BCE4]/20 rounded-xl bg-white cursor-pointer focus:border-[#00BCE4] outline-none"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00BCE4]" />
                        </div>
                        {renderDatePicker({ isOpen: isEndDatePickerOpen, setIsOpen: setIsEndDatePickerOpen })}
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#00BCE4]/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#00BCE4]/10">
                        <thead className='bg-[#00BCE4]/5 whitespace-nowrap'>
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">#</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Bemor</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Telefon</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Shifokor</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest text-center">To'lov holati</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest text-center">Qarzdorlik</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Harakat</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 whitespace-nowrap">
                            {debtTreatmentsData.map((item) => (
                                <tr key={item.id} className="hover:bg-[#00BCE4]/5 transition-colors group">
                                    <td className="px-6 py-4 text-sm text-slate-400 font-medium">{item.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-800">{item.patient}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">{item.schedule_date}</p>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.phone}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.doctor}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-lg text-[10px] uppercase tracking-tighter ${getStatusClasses()}`}>
                                            {item.payment_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-black text-[#00BCE4]">
                                            {item.debt_amount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDropdownToggle(item.id)}
                                            className="p-2 text-slate-400 rounded-lg hover:bg-[#00BCE4]/10 hover:text-[#00BCE4] transition-all"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>

                                        {openDropdownId === item.id && (
                                            <div className="absolute right-14 top-1/2 -translate-y-1/2 w-44 bg-white border border-[#00BCE4]/20 rounded-xl shadow-2xl z-20 overflow-hidden">
                                                <ul className="py-1">
                                                    <li
                                                        onClick={() => {
                                                            setIsPaymentModalOpen(true);
                                                            setOpenDropdownId(null);
                                                        }}
                                                        className='px-4 py-3 text-xs font-bold text-slate-700 hover:bg-[#00BCE4]/10 hover:text-[#00BCE4] cursor-pointer flex items-center gap-3 transition-colors'
                                                    >
                                                        <DollarSign className='w-4 h-4' /> To'lov qilish
                                                    </li>
                                                    <li
                                                        onClick={() => setOpenDropdownId(null)}
                                                        className='px-4 py-3 text-xs font-bold text-slate-700 hover:bg-[#00BCE4]/10 hover:text-[#00BCE4] cursor-pointer flex items-center gap-3 transition-colors'
                                                    >
                                                        <Eye className='w-4 h-4' /> Batafsil ko'rish
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {renderPaymentModal({ isPaymentModalOpen, setIsPaymentModalOpen })}
        </div>
    );
};

export default DebtTreatmentsContent;
