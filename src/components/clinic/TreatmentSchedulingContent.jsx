// src/components/TreatmentSchedulingContent.jsx
import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, MoreVertical, Edit2, Eye, ChevronLeft, ChevronRight, Home, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

const TreatmentSchedulingContent = () => {
    const { data, t } = useData();
    const treatments = data.treatments || [];

    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
    const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const primaryColor = "#00BCE4";

    const handleDropdownToggle = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const getStatusClasses = (status) => {
        return status === "Yangi"
            ? "bg-amber-50 text-amber-600 border border-amber-100"
            : status === "Shifokor yakunlandi"
                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                : "bg-slate-50 text-slate-600 border border-slate-100";
    };

    const filteredTreatments = treatments.filter(t =>
        t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderDatePicker = ({ isOpen, setIsOpen }) => {
        if (!isOpen) return null;

        return (
            <div className="absolute z-20 mt-2 right-0 rounded-2xl shadow-2xl p-4 border border-slate-100 w-72 animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-4">
                    <button className='p-1.5 rounded-lg hover:bg-slate-50 text-slate-400'><ChevronLeft className='w-4 h-4' /></button>
                    <span className="font-bold text-slate-700">Dekabr 2025</span>
                    <button className='p-1.5 rounded-lg hover:bg-slate-50 text-slate-400'><ChevronRight className='w-4 h-4' /></button>
                </div>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map(day => (
                        <div key={day} className="text-[10px] font-bold text-slate-300 uppercase">{day}</div>
                    ))}
                    {[...Array(31).keys()].map(i => i + 1).map(day => (
                        <div
                            key={day}
                            style={day === 13 ? { backgroundColor: primaryColor } : {}}
                            className={`py-2 rounded-xl cursor-pointer text-sm transition-all ${day === 13 ? 'text-white shadow-md shadow-[#00BCE4]/30' : 'text-slate-600 hover:bg-[#00BCE4]/10 hover:text-[#00BCE4]'}`}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className='flex justify-between mt-4 border-t border-slate-50 pt-3'>
                    <button onClick={() => setIsOpen(false)} className='text-xs font-semibold text-slate-400 hover:text-slate-600'>{t('cancel')}</button>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ color: primaryColor }}
                        className='text-xs font-bold px-3 py-1.5 rounded-lg bg-[#00BCE4]/10'
                    >
                        Tanlash
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors flex items-center gap-1">
                            <Home className="w-3 h-3" />
                            {t('dashboard')}
                        </Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-600 capitalize">{t('treatments')}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                        <ClipboardList className="w-6 h-6 text-[#00BCE4]" />
                        {t('treatments')}
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative grow md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2.5 pl-10 pr-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BCE4]/20 focus:border-[#00BCE4] transition-all text-sm bg-slate-50/50"
                        />
                    </div>
                    <button
                        style={{ backgroundColor: primaryColor }}
                        className="p-2.5 text-white rounded-xl shadow-lg shadow-[#00BCE4]/20 hover:opacity-90 transition-all"
                    >
                        <ChevronDown className='w-5 h-5 transform rotate-180' />
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className='flex flex-wrap gap-4 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100'>
                <div className="relative w-full sm:w-48">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Boshlanish sanasi</label>
                    <div className="relative">
                        <input
                            type="text"
                            readOnly
                            defaultValue="13.12.2025"
                            onClick={() => setIsStartDatePickerOpen(!isStartDatePickerOpen)}
                            className="w-full py-2 px-3 pr-10 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm cursor-pointer hover:border-[#00BCE4] transition-all"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00BCE4] pointer-events-none" />
                        {renderDatePicker({ isOpen: isStartDatePickerOpen, setIsOpen: setIsStartDatePickerOpen })}
                    </div>
                </div>

                <div className="relative w-full sm:w-48">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5 ml-1">Tugash sanasi</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Sanani tanlang"
                            readOnly
                            onClick={() => setIsEndDatePickerOpen(!isEndDatePickerOpen)}
                            className="w-full py-2 px-3 pr-10 border border-slate-200 rounded-xl bg-white text-slate-700 text-sm cursor-pointer hover:border-[#00BCE4] transition-all"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00BCE4] pointer-events-none" />
                        {renderDatePicker({ isOpen: isEndDatePickerOpen, setIsOpen: setIsEndDatePickerOpen })}
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100">
                        <thead className='bg-slate-50/50'>
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{t('patient')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{t('phone')}</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">{t('doctor')}</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">{t('date')}</th>
                                <th className="px-6 py-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">{t('status')}</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider w-20">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredTreatments.length > 0 ? (
                                filteredTreatments.map((item, index) => (
                                    <tr key={item.id} className="hover:bg-[#00BCE4]/5 transition-colors group">
                                        <td className="px-6 py-4 text-sm text-slate-400 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.patientName}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">{item.phone}</td>
                                        <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-[#00BCE4]/10 flex items-center justify-center text-[#00BCE4] font-bold text-xs">
                                                    {item.doctor.charAt(0)}
                                                </div>
                                                {item.doctor}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 text-center font-medium">{item.date}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-tight ${getStatusClasses(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right relative">
                                            <button
                                                onClick={() => handleDropdownToggle(item.id)}
                                                className="p-2 text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 rounded-xl transition-all"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {openDropdownId === item.id && (
                                                <>
                                                    <div className="fixed inset-0 z-30" onClick={() => setOpenDropdownId(null)}></div>
                                                    <div className="absolute right-12 top-1/2 -translate-y-1/2 w-44 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-40 animate-in slide-in-from-right-2 duration-200">
                                                        <div className="p-2 space-y-1">
                                                            <button className='w-full px-3 py-2 text-sm text-slate-600 hover:bg-[#00BCE4]/10 hover:text-[#00BCE4] rounded-xl flex items-center gap-2 transition-all font-medium'>
                                                                <Edit2 className='w-4 h-4' /> {t('edit')}
                                                            </button>
                                                            <button className='w-full px-3 py-2 text-sm text-slate-600 hover:bg-[#00BCE4]/10 hover:text-[#00BCE4] rounded-xl flex items-center gap-2 transition-all font-medium'>
                                                                <Eye className='w-4 h-4' /> {t('view')}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400 italic">
                                        {t('treatments')} topilmadi.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className='flex justify-between items-center pt-4'>
                <p className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
                    Jami: {filteredTreatments.length} ta yozuv
                </p>
                <div className="flex gap-2">
                    <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                    </button>
                    <button className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TreatmentSchedulingContent;
