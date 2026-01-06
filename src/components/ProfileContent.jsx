// src/components/ProfileContent.jsx
import React, { useState } from 'react';
import { useData } from '../context/DataProvider';
import { CheckCircle, Lock, Edit2, User } from 'lucide-react';
import EditProfileModal from './modals/EditProfileModal';
import ChangePasswordModal from './modals/ChangePasswordModal';

const ProfileContent = () => {
    const { data, t } = useData();

    const rawUser = data.user;
    const user = (rawUser && !Array.isArray(rawUser)) ? rawUser : {
        name: "Abduxalim",
        surname: "To'xtayev",
        role: "Sotuvchi",
        id: "133",
        createdAt: "11.09.2025 21:12",
        updatedAt: "26.09.2025 16:40",
        login: "test_admin",
        image: null
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    return (
        <div className="p-4 md:p-8 flex justify-center w-full">
            <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] w-full max-w-lg p-8 border border-gray-100 flex flex-col items-center">

                {/* Avatar Section */}
                <div className="relative mb-6">
                    <div className="w-28 h-28 rounded-full bg-[#f0f9ff] flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                        {user.image ? (
                            <img src={user.image} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <User className="w-12 h-12 text-[#00BCE4]" />
                        )}
                    </div>
                    <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
                        <CheckCircle className="w-6 h-6 text-[#00BCE4] fill-[#00BCE4]" />
                    </div>
                </div>

                {/* Name & Role */}
                <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">
                    {user.name} {user.surname}
                </h2>
                <p className="text-[#00BCE4] mb-8 font-semibold tracking-wide uppercase text-xs">{user.role}</p>

                {/* Info List */}
                <div className="w-full space-y-5 mb-8">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">ID RAQAMI</span>
                        <span className="text-gray-700 font-bold">{user.id}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{t('created_at')}</span>
                        <span className="text-gray-700 font-bold">{user.createdAt}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{t('updated_at')}</span>
                        <span className="text-gray-700 font-bold">{user.updatedAt}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="w-full space-y-4">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-full flex items-center justify-center px-4 py-4 bg-[#00BCE4] hover:bg-[#00a8cc] text-white rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-lg shadow-[#00BCE4]/20"
                    >
                        <Edit2 className="w-4 h-4 mr-2" />
                        {t('edit_personal_info')}
                    </button>

                    <button
                        onClick={() => setIsPasswordModalOpen(true)}
                        className="w-full flex items-center justify-center px-4 py-4 bg-white border-2 border-[#00BCE4] text-[#00BCE4] hover:bg-[#f0f9ff] rounded-2xl font-bold text-[11px] uppercase tracking-widest transition-all duration-300"
                    >
                        <Lock className="w-4 h-4 mr-2" />
                        {t('change_password')}
                    </button>
                </div>
            </div>

            {/* Modals */}
            {isEditModalOpen && (
                <EditProfileModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    currentUser={user}
                />
            )}
            {isPasswordModalOpen && (
                <ChangePasswordModal
                    isOpen={isPasswordModalOpen}
                    onClose={() => setIsPasswordModalOpen(false)}
                />
            )}
        </div>
    );
};

export default ProfileContent;
