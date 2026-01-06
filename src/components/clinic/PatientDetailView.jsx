// src/components/ManualContent.jsx
import React from 'react';
import { Play, ChevronRight, BookOpen, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';

/**
 * VideoCard - Har bir video darslik uchun individual komponent
 */
const VideoCard = ({ title, thumbnailUrl }) => {
    return (
        <div className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BCE4]/15 hover:-translate-y-2 cursor-pointer">
            {/* Video Preview qismi */}
            <div className="relative h-48 bg-slate-50 flex items-center justify-center overflow-hidden">
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 bg-[#00BCE4]/10 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                            <Play className="w-6 h-6 text-[#00BCE4] fill-[#00BCE4]/20" />
                        </div>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">DentaGo Video</span>
                    </div>
                )}

                {/* Glassmorphism Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px]">
                    <div className="bg-white/90 p-5 rounded-full shadow-2xl transform scale-50 group-hover:scale-100 transition-transform duration-500">
                        <Play className="w-6 h-6 text-[#00BCE4] fill-current" />
                    </div>
                </div>

                {/* Davomiyligi belgisi */}
                <div className="absolute bottom-4 right-4 bg-slate-900/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/10">
                    HD
                </div>
            </div>

            {/* Matn va Kontent */}
            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-slate-700 leading-relaxed group-hover:text-[#00BCE4] transition-colors duration-300 line-clamp-2">
                        {title}
                    </p>
                    <div className="mt-1">
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#00BCE4] group-hover:translate-x-1 transition-all" />
                    </div>
                </div>
            </div>
        </div>
    );
};

/**
 * Asosiy ManualContent Komponenti
 */
const ManualContent = () => {
    const { data, t } = useData();

    // Agar context'dan ma'lumot kelmasa, ko'rsatiladigan namunaviy bo'limlar
    const manualSections = data.manualSections || [
        {
            title: "Kirish va Sozlamalar",
            videos: [
                { id: 1, title: "DentaGo tizimiga birinchi marta kirish va profilni sozlash", thumbnailUrl: "" },
                { id: 2, title: "Xodimlar va ularning huquqlarini boshqarish bo'yicha qo'llanma", thumbnailUrl: "" }
            ]
        },
        {
            title: "Bemorlar va Davolash rejalari",
            videos: [
                { id: 3, title: "Yangi bemor qo'shish va ambulator kartochka ochish", thumbnailUrl: "" },
                { id: 4, title: "Davolash rejasini shakllantirish va tish formulasi bilan ishlash", thumbnailUrl: "" },
                { id: 5, title: "Bemorlar tarixini ko'rish va arxivlash", thumbnailUrl: "" }
            ]
        }
    ];

    return (
        <div className="p-4 md:p-10 space-y-12 bg-slate-50/30 min-h-screen">

            {/* 1. Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard') || 'Bosh sahifa'}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('manual') || 'Qo\'llanma'}</span>
                    </nav>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">
                        Video <span className="text-[#00BCE4]">Yo'riqnomalar</span>
                    </h2>
                    <p className="text-slate-400 text-sm font-medium">Tizim imkoniyatlaridan to'liq foydalanish uchun darsliklar bilan tanishib chiqing.</p>
                </div>

                {/* Live Status Badge */}
                <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center"><BookOpen className="w-3 h-3 text-[#00BCE4]" /></div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Tizim Tayyor</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold">Barcha darsliklar yuklangan</p>
                    </div>
                </div>
            </div>

            {/* 2. Content Sections */}
            {manualSections.length > 0 ? (
                <div className="space-y-20">
                    {manualSections.map((section, index) => (
                        <section key={index} className="space-y-10">
                            {/* Bo'lim Sarlavhasi dizayni */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                                    <div className="w-2 h-2 bg-[#00BCE4] rounded-full"></div>
                                    <h3 className="text-sm font-black text-slate-700 uppercase tracking-[0.15em] whitespace-nowrap">
                                        {section.title}
                                    </h3>
                                </div>
                                <div className="h-[1px] w-full bg-gradient-to-r from-slate-200 via-slate-100 to-transparent"></div>
                            </div>

                            {/* Video Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {section.videos.map((video) => (
                                    <VideoCard
                                        key={video.id}
                                        title={video.title}
                                        thumbnailUrl={video.thumbnailUrl}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            ) : (
                /* Empty State (Agar videolar bo'lmasa) */
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3.5rem] border border-dashed border-slate-200 text-center shadow-inner">
                    <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                        <Play className="w-12 h-12 text-slate-200 ml-1" />
                    </div>
                    <h3 className="text-slate-800 font-black text-2xl mb-2">Hozircha videolar yo'q</h3>
                    <p className="text-slate-400 text-sm max-w-sm font-medium">
                        Ushbu bo'lim uchun video darsliklar hozirda tayyorlanmoqda. Tez orada paydo bo'ladi.
                    </p>
                </div>
            )}

            {/* 3. Footer Help Banner */}
            <div className="mt-12 bg-gradient-to-br from-[#00BCE4] to-[#0096B8] rounded-[3rem] p-1 shadow-xl shadow-[#00BCE4]/20">
                <div className="bg-white/95 backdrop-blur-sm rounded-[2.9rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-white/50">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-[#00BCE4]/10 rounded-3xl flex items-center justify-center shadow-inner">
                            <HelpCircle className="w-8 h-8 text-[#00BCE4]" />
                        </div>
                        <div>
                            <h4 className="text-xl font-black text-slate-800 tracking-tight">Yordam kerakmi?</h4>
                            <p className="text-slate-500 font-medium text-sm mt-1">Video darsliklarda javob topmadingizmi? Texnik xizmatga yozing.</p>
                        </div>
                    </div>
                    <button className="whitespace-nowrap px-10 py-4 bg-[#00BCE4] text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#00BCE4]/30 hover:bg-slate-800 hover:shadow-slate-800/20 transition-all transform active:scale-95">
                        Murojaat qilish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManualContent;
