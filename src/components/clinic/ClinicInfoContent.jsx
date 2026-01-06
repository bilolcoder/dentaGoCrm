// src/components/ClinicInfoContent.jsx

import React, { useState } from 'react';
import { Edit, Save, X, Building2, MapPin, Phone, Mail, Landmark, FileText, Share2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

// Tahrirlash Modali (Hammasi bir joyda)
const EditClinicInfoModal = ({ isOpen, onClose, initialData }) => {
    const { updateData, t } = useData();
    const [formData, setFormData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        updateData('clinicInfo', formData, 'UPDATE');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-center p-8 border-b border-gray-100">
                    <div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Ma'lumotlarni tahrirlash</h3>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Klinika va Ish tartibi</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-[#00BCE4] uppercase tracking-[0.2em] mb-4">Asosiy ma'lumotlar</h4>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('clinic_name')}</label>
                                <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00BCE4] transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{t('phone')}</label>
                                <input name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00BCE4] transition-all font-medium text-sm" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[11px] font-black text-[#00BCE4] uppercase tracking-[0.2em] mb-4">Ish tartibi (Har kun uchun)</h4>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Dush - Juma</label>
                                <input name="workWeek" value={formData.workWeek || '09:00 - 18:00'} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00BCE4] transition-all font-medium text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Shanba - Yakshanba</label>
                                <input name="workWeekend" value={formData.workWeekend || 'Dam olish kuni'} onChange={handleChange} className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00BCE4] transition-all font-medium text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Bank rekvizitlari</label>
                        <textarea name="bankDetails" value={formData.bankDetails || ''} onChange={handleChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:border-[#00BCE4] transition-all font-medium min-h-[100px] text-sm resize-none"></textarea>
                    </div>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                    <button onClick={handleSave} className="w-full py-4 bg-[#00BCE4] text-white font-bold rounded-2xl shadow-xl shadow-[#00BCE4]/20 hover:bg-[#009dbf] transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                        <Save className='w-5 h-5' /> {t('save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

const ClinicInfoContent = () => {
    const { data, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const clinicInfo = (() => {
        if (!data || data.clinicInfo == null) return {};
        return Array.isArray(data.clinicInfo) ? (data.clinicInfo[0] || {}) : data.clinicInfo;
    })();

    return (
        <div className="p-4 md:p-8 space-y-8 bg-gray-50 min-h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('clinic_info')}</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{t('clinic_info')}</h1>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className='w-full md:w-auto flex items-center justify-center gap-2 py-3 px-8 bg-[#00BCE4] text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-[#00BCE4]/20 hover:bg-[#009dbf] transition-all'
                >
                    <Edit className='w-4 h-4' /> {t('edit')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Asosiy Kartochka */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00BCE4]/5 rounded-bl-full"></div>
                        <div className="flex items-center gap-6 mb-12">
                            <div className="w-20 h-20 bg-[#00BCE4] rounded-3xl flex items-center justify-center shadow-xl shadow-[#00BCE4]/30 rotate-3">
                                <Building2 className='w-10 h-10 text-white -rotate-3' />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">{clinicInfo.name}</h2>
                                <p className="text-sm text-[#00BCE4] font-bold tracking-[0.2em] uppercase">Professional Stomatologiya</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-50 rounded-2xl text-[#00BCE4]"><MapPin className='w-6 h-6' /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('address')}</p>
                                        <p className="text-sm font-bold text-slate-700 leading-relaxed">{clinicInfo.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-50 rounded-2xl text-[#00BCE4]"><Phone className='w-6 h-6' /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('phone')}</p>
                                        <p className="text-sm font-bold text-slate-700">{clinicInfo.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-gray-50 rounded-2xl text-[#00BCE4]"><Mail className='w-6 h-6' /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t('email')}</p>
                                        <p className="text-sm font-bold text-slate-700">{clinicInfo.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bank Rekvizitlari */}
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-8">
                            <FileText className="w-6 h-6 text-[#00BCE4]" />
                            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Bank rekvizitlari</h3>
                        </div>
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 font-mono text-sm text-slate-600 leading-loose">
                            {clinicInfo.bankDetails || "Ma'lumot kiritilmagan"}
                        </div>
                    </div>
                </div>

                {/* Ish vaqti Paneli */}
                <div className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] p-10 text-black relative overflow-hidden shadow-2xl shadow-slate-900/40">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#00BCE4]/10 rounded-bl-full"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#00BCE4]/20 rounded-2xl flex items-center justify-center border border-[#00BCE4]/30">
                                <Clock className="w-6 h-6 text-[#00BCE4]" />
                            </div>
                            <h4 className="text-lg font-black uppercase tracking-tight">Ish tartibi</h4>
                        </div>

                        <div className="space-y-6 relative z-10">
                            {[
                                { label: 'Dushanba', time: clinicInfo.workWeek || '09:00 - 18:00' },
                                { label: 'Seshanba', time: clinicInfo.workWeek || '09:00 - 18:00' },
                                { label: 'Chorshanba', time: clinicInfo.workWeek || '09:00 - 18:00' },
                                { label: 'Payshanba', time: clinicInfo.workWeek || '09:00 - 18:00' },
                                { label: 'Juma', time: clinicInfo.workWeek || '09:00 - 18:00' },
                                { label: 'Shanba', time: clinicInfo.workWeekend || '09:00 - 15:00', accent: true },
                                { label: 'Yakshanba', time: clinicInfo.workWeekend || 'Dam olish kuni', closed: true },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between items-center group">
                                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                                        item.closed ? 'bg-red-500/10 text-red-400' :
                                        item.accent ? 'bg-[#00BCE4]/10 text-[#00BCE4]' : 'text-slate-200'
                                    }`}>
                                        {item.time}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-4 bg-white/5 rounded-2xl border border-white/10">
                            <p className="text-[10px] text-center text-slate-500 font-bold uppercase tracking-tighter">
                                Tanaffus: 13:00 - 14:00
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <EditClinicInfoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={clinicInfo}
            />
        </div>
    );
};

export default ClinicInfoContent;
