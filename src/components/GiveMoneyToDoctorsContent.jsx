// src/components/GiveMoneyToDoctorsContent.jsx

import React, { useState } from 'react';
import { Search, DollarSign, User, Send, Wallet, X, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataProvider';

const SalaryCard = ({ title, staffList, isDoctor = false }) => {
    const { t } = useData();
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    const filteredStaff = staffList.filter(s =>
        s.FIO.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePay = (staff) => {
        setSelectedStaff(staff);
        setModalOpen(true);
    };

    const SalaryPaymentModal = () => {
        if (!selectedStaff) return null;
        const [amount, setAmount] = useState('');

        const confirmPayment = () => {
            if (!amount) {
                alert("Iltimos, summani kiriting.");
                return;
            }
            alert(`${selectedStaff.FIO}ga ${amount} so'm miqdorida maosh to'landi.`);
            setModalOpen(false);
            setSelectedStaff(null);
        };

        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setModalOpen(false)}></div>
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10 border border-[#00BCE4]/20 animate-in fade-in zoom-in duration-200">
                    <div className="bg-[#00BCE4] p-6 text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Wallet className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-black uppercase tracking-widest">To'lov qilish</h4>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="text-center">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qabul qiluvchi</p>
                            <p className="text-lg font-bold text-slate-800">{selectedStaff.FIO}</p>
                        </div>

                        <div className="relative">
                            <input
                                type="number"
                                placeholder="Summani kiriting"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl font-black text-[#00BCE4] focus:ring-4 focus:ring-[#00BCE4]/10 focus:border-[#00BCE4] outline-none transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">UZS</span>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button onClick={() => setModalOpen(false)} className="flex-1 py-3 text-xs font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 rounded-2xl transition-colors">
                                Bekor qilish
                            </button>
                            <button onClick={confirmPayment} className="flex-1 py-3 bg-[#00BCE4] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-[#00BCE4]/20 hover:bg-[#00a7cc] flex items-center justify-center gap-2 transition-all active:scale-95">
                                <Send className='w-4 h-4' /> To'lash
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#00BCE4]/10 overflow-hidden flex flex-col min-h-[500px]">
            {/* Card Header */}
            <div className="p-5 border-b border-[#00BCE4]/5 bg-[#00BCE4]/5 flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <UserCheck className={`w-5 h-5 ${isDoctor ? 'text-[#00BCE4]' : 'text-slate-400'}`} />
                    {title}
                </h3>
                <span className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-[#00BCE4] border border-[#00BCE4]/20">
                    {staffList.length} xodim
                </span>
            </div>

            <div className="p-5 space-y-4 grow flex flex-col">
                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder={`Qidirish...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 px-4 pl-11 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-[#00BCE4]/10 focus:border-[#00BCE4] outline-none transition-all"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#00BCE4]/40" />
                </div>

                {/* Staff List */}
                <div className="space-y-2 overflow-y-auto pr-1 custom-scrollbar">
                    {filteredStaff.length > 0 ? (
                        filteredStaff.map(staff => (
                            <div key={staff.id} className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-slate-100 rounded-2xl hover:border-[#00BCE4]/30 hover:bg-[#00BCE4]/5 transition-all">
                                <div>
                                    <div className="font-bold text-slate-800 group-hover:text-[#00BCE4] transition-colors">{staff.FIO}</div>
                                    <div className='text-[10px] font-bold text-slate-400 uppercase tracking-tight'>Hisoblangan: 0 so'm</div>
                                </div>
                                <button
                                    onClick={() => handlePay(staff)}
                                    className='mt-3 sm:mt-0 w-full sm:w-auto py-2 px-5 bg-white border border-[#00BCE4] text-[#00BCE4] text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00BCE4] hover:text-white transition-all shadow-sm active:scale-95'
                                >
                                    Pul berish
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 opacity-20">
                            <Search className="w-12 h-12 mb-2" />
                            <p className="font-bold uppercase text-xs tracking-widest">Topilmadi</p>
                        </div>
                    )}
                </div>
            </div>

            {modalOpen && <SalaryPaymentModal />}
        </div>
    );
};

const GiveMoneyToDoctorsContent = () => {
    const { data, t } = useData();
    const doctors = data.staff.filter(s => s.lavozim === 'Shifokor');
    const technicians = data.staff.filter(s => s.lavozim === 'Texnik' || s.lavozim === 'Qabulxona xodimi');

    return (
        <div className="p-4 md:p-8 space-y-6 min-h-screen">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <Link to="/" className="hover:text-[#00BCE4] transition-colors uppercase tracking-wider">{t('dashboard')}</Link>
                <span className="text-slate-300">/</span>
                <span className="text-[#00BCE4] uppercase tracking-wider">{t('give_money_docs')}</span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <SalaryCard title="Doktorlar tarkibi" staffList={doctors} isDoctor={true} />
                <SalaryCard title="Texnik xodimlar" staffList={technicians} isDoctor={false} />
            </div>
        </div>
    );
};

export default GiveMoneyToDoctorsContent;
