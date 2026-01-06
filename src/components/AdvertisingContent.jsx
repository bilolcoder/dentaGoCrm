// src/components/AdvertisingContent.jsx

import React, { useState } from 'react';
import { useData } from '../context/DataProvider';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit, Megaphone, X } from 'lucide-react';

// Yangi reklama qo'shish uchun Modal
const AddAdvertisementModal = ({ isOpen, onClose }) => {
    const { addAdvertisement, t } = useData();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState('active');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            addAdvertisement({
                title,
                content,
                status,
                date: new Date().toLocaleDateString('uz-UZ')
            });
            onClose();
            setTitle('');
            setContent('');
            setStatus('active');
        } else {
            alert(t('fill_required'));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Modal Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-[#00BCE4]/5">
                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                        <Megaphone className="w-5 h-5 text-[#00BCE4]" />
                        Reklama Qo'shish
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sarlavha*</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Masalan: Yangi yil aksiyasi"
                            className="w-full text-black mt-1 p-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#00BCE4] focus:ring-4 focus:ring-[#00BCE4]/10 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Kontent*</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
                            placeholder="Reklama matnini kiriting..."
                            className="w-full text-black mt-1 p-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#00BCE4] transition-all resize-none"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">{t('status')}</label>
                        <div className="flex bg-slate-100 rounded-xl p-1">
                            <button
                                type="button"
                                onClick={() => setStatus('active')}
                                className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${status === 'active' ? 'bg-[#00BCE4] text-white shadow-md' : 'text-slate-500'}`}
                            >
                                {t('active')}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStatus('inactive')}
                                className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all ${status === 'inactive' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500'}`}
                            >
                                {t('inactive')}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors uppercase tracking-widest text-xs"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-3 px-4 bg-[#00BCE4] text-white font-black rounded-xl hover:bg-[#00BCE4]/90 shadow-lg shadow-[#00BCE4]/20 transition-all uppercase tracking-widest text-xs"
                        >
                            {t('add')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const AdvertisingContent = () => {
    const { data, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const advertisements = data?.advertisements || [];

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Header & Breadcrumbs */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors uppercase tracking-wider">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-[#00BCE4] uppercase tracking-wider">{t('advertising')}</span>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 py-2.5 px-6 bg-[#00BCE4] text-white rounded-xl font-black hover:bg-[#00BCE4]/90 shadow-lg shadow-[#00BCE4]/20 transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" /> {t('add')}
                </button>
            </div>

            {/* Reklamalar Jadvali */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#00BCE4]/10 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-[#00BCE4]/10">
                        <thead className="bg-[#00BCE4]/5 whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest w-16">#</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Sarlavha</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">Kontent</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('status')}</th>
                                <th className="px-6 py-4 text-left text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('date')}</th>
                                <th className="px-6 py-4 text-right text-[10px] font-black text-[#00BCE4] uppercase tracking-widest">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {advertisements.length > 0 ? (
                                advertisements.map((ad, index) => (
                                    <tr key={ad.id} className="hover:bg-[#00BCE4]/5 transition-colors group">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-medium">{index + 1}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-bold">{ad.title}</td>
                                        <td className="px-6 py-4 max-w-xs">
                                            <p className="text-sm text-slate-500 truncate italic">{ad.content}</p>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                                ad.status === 'active'
                                                ? 'bg-emerald-100 text-emerald-600'
                                                : 'bg-rose-100 text-rose-600'
                                            }`}>
                                                {ad.status === 'active' ? t('active') : t('inactive')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-bold">{ad.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex justify-end gap-1">
                                                <button className="p-2 rounded-lg text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 transition-all">
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="p-4 bg-slate-50 rounded-full text-slate-200">
                                                <Megaphone className="w-10 h-10" />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Hozircha reklama mavjud emas</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddAdvertisementModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AdvertisingContent;
