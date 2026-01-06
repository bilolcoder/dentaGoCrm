// src/components/AnnouncementsContent.jsx

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Calendar, Clock, AlertCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';
import Modal from './common/Modal';

const AnnouncementsContent = () => {
    const { data, updateData, t } = useData();
    const announcements = data.announcements || [];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState(null);
    const [viewingAnnouncement, setViewingAnnouncement] = useState(null);

    const [formData, setFormData] = useState({
        image: '',
        description: '',
        paymentStatus: 'Kutilmoqda'
    });

    const addSevenDays = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 7);
        return newDate.toISOString().split('T')[0];
    };

    const isExpired = (expiresAt) => new Date(expiresAt) < new Date();

    const getDaysRemaining = (expiresAt) => {
        const diff = new Date(expiresAt) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        return days > 0 ? days : 0;
    };

    const handleOpenModal = (announcement = null) => {
        if (announcement) {
            setEditingAnnouncement(announcement);
            setFormData({
                image: announcement.image,
                description: announcement.description,
                paymentStatus: announcement.paymentStatus
            });
        } else {
            setEditingAnnouncement(null);
            setFormData({ image: '', description: '', paymentStatus: 'Kutilmoqda' });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id, description) => {
        if (window.confirm(`"${description.substring(0, 30)}..." o'chirishni tasdiqlaysizmi?`)) {
            updateData('announcements', { id }, 'DELETE');
        }
    };

    const handleSave = () => {
        if (!formData.image || !formData.description) {
            alert(t('fill_required'));
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const expiryDate = addSevenDays(currentDate);

        const dataToSend = {
            ...formData,
            createdAt: editingAnnouncement ? editingAnnouncement.createdAt : currentDate,
            expiresAt: editingAnnouncement ? editingAnnouncement.expiresAt : expiryDate,
            isActive: true
        };

        if (editingAnnouncement) {
            updateData('announcements', { id: editingAnnouncement.id, ...dataToSend }, 'UPDATE');
        } else {
            updateData('announcements', dataToSend, 'ADD');
        }
        setIsModalOpen(false);
    };

    const handleExtendLimit = (announcement) => {
        const newExpiryDate = addSevenDays(new Date().toISOString().split('T')[0]);
        updateData('announcements', {
            id: announcement.id,
            expiresAt: newExpiryDate,
            isActive: true
        }, 'UPDATE');
    };

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span>/</span>
                        <span className="text-slate-900 font-black">{t('announcements')}</span>
                    </div>
                    <h1 className="text-2xl font-black text-slate-800 mt-1 uppercase tracking-tight">E'lonlar Boshqaruvi</h1>
                </div>

                <button
                    onClick={() => handleOpenModal(null)}
                    className='flex items-center gap-2 py-3 px-6 bg-[#00BCE4] text-white rounded-xl font-black hover:shadow-lg hover:shadow-[#00BCE4]/30 transition-all active:scale-95 uppercase tracking-widest text-[11px]'
                >
                    <Plus className='w-5 h-5' /> {t('add')} {t('announcement')}
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => {
                        const expired = isExpired(announcement.expiresAt);
                        const daysLeft = getDaysRemaining(announcement.expiresAt);

                        return (
                            <div
                                key={announcement.id}
                                className={`group bg-white rounded-3xl shadow-sm border-2 transition-all duration-300 overflow-hidden flex flex-col ${expired ? 'border-[#00BCE4]' : 'border-slate-50 hover:border-[#00BCE4]/30 hover:shadow-xl hover:shadow-slate-200/50'}`}
                            >
                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={announcement.image}
                                        alt="Ads"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=No+Image'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                                    <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${expired ? 'bg-[#00BCE4] text-white' : 'bg-white text-[#00BCE4]'}`}>
                                        {expired ? 'Muddati tugagan' : `${daysLeft} Kun qoldi`}
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className={`w-2 h-2 rounded-full ${announcement.paymentStatus === "To'landi" ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{announcement.paymentStatus}</span>
                                    </div>

                                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 italic">
                                        "{announcement.description.length > 120 ? announcement.description.substring(0, 120) + '...' : announcement.description}"
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-3 text-slate-400">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs font-bold">{announcement.createdAt}</span>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => { setViewingAnnouncement(announcement); setIsViewModalOpen(true); }} className="p-2.5 text-slate-400 hover:text-[#00BCE4] hover:bg-[#00BCE4]/10 rounded-xl transition-colors"><Eye className="w-5 h-5"/></button>
                                            <button onClick={() => handleOpenModal(announcement)} className="p-2.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-colors"><Edit className="w-5 h-5"/></button>
                                            <button onClick={() => handleDelete(announcement.id, announcement.description)} className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-5 h-5"/></button>
                                        </div>
                                    </div>

                                    {expired && (
                                        <button
                                            onClick={() => handleExtendLimit(announcement)}
                                            className='w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-[#00BCE4] transition-all flex items-center justify-center gap-2'
                                        >
                                            <Clock className="w-4 h-4" /> Limitni uzaytirish
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                        <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Hech qanday e'lon topilmadi</p>
                    </div>
                )}
            </div>

            {/* Modal - Create/Edit */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingAnnouncement ? "Tahrirlash" : "Yangi e'lon"}
            >
                <div className="space-y-5 p-1">
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Rasm URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full p-4 text-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#00BCE4] focus:outline-none transition-all"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">E'lon matni</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full text-black p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#00BCE4] focus:outline-none transition-all resize-none"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                    >
                        Tayyor
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default AnnouncementsContent;
