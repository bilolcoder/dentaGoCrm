// src/components/PatientsContent.jsx
import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, FileText, User, Phone, MapPin, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../../context/DataProvider';
import Modal from '../common/Modal';

/**
 * Bemor qo'shish/tahrirlash modal oynasi
 */
const AddEditPatientModal = ({ isOpen, onClose, editingPatient }) => {
    const { updateData, t } = useData();
    const [formData, setFormData] = useState(editingPatient || {
        name: '',
        familya: '',
        phone: '',
        birthDate: '',
        gender: 'Erkak',
        address: '',
    });

    // Agar tahrirlash uchun modal ochilsa, formani yangilash
    React.useEffect(() => {
        if (editingPatient) {
            setFormData(editingPatient);
        } else {
            setFormData({
                name: '',
                familya: '',
                phone: '',
                birthDate: '',
                gender: 'Erkak',
                address: '',
            });
        }
    }, [editingPatient, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.name || !formData.phone) {
            alert(t('fill_required'));
            return;
        }

        const dataToSend = {
            ...formData,
            registrationDate: formData.registrationDate || new Date().toLocaleDateString('uz-UZ'),
            debt: formData.debt || "0 so'm"
        };

        if (editingPatient) {
            updateData('patients', dataToSend, 'UPDATE');
        } else {
            updateData('patients', dataToSend, 'ADD');
        }
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingPatient ? t('edit') : t('add')}
            footer={
                <button
                    onClick={handleSave}
                    className="w-full py-4 bg-[#00BCE4] hover:bg-[#00a6c9] text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-[#00BCE4]/30 transition-all active:scale-95"
                >
                    {editingPatient ? t('save') : `+ ${t('add')}`}
                </button>
            }
        >
            <div className="space-y-4 p-1">
                <div className="grid grid-cols-2 gap-4">
                    <input name="name" value={formData.name} onChange={handleChange} placeholder={`${t('name')}*`} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                    <input name="familya" value={formData.familya} onChange={handleChange} placeholder={t('surname')} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                </div>

                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder={`${t('phone')}*`} className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        <input name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800" />
                    </div>
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800 appearance-none cursor-pointer">
                        <option value="Erkak">{t('gender_male')}</option>
                        <option value="Ayol">{t('gender_female')}</option>
                    </select>
                </div>

                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                    <input name="address" value={formData.address} onChange={handleChange} placeholder={t('address')} className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-[#00BCE4] focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder:text-slate-300" />
                </div>
            </div>
        </Modal>
    );
};

/**
 * Asosiy Bemorlar jadvali komponenti
 */
const PatientsContent = () => {
    // data?.patients qo'shish orqali xavfsizlik ta'minlandi
    const { data, updateData, t } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPatient, setEditingPatient] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenModal = (patient = null) => {
        setEditingPatient(patient);
        setIsModalOpen(true);
    };

    const handleDelete = (id, name) => {
        if (window.confirm(`${name}: ${t('confirm_delete')}`)) {
            updateData('patients', { id }, 'DELETE');
        }
    };

    // XAVFSIZLIK: data?.patients massiv ekanligini va mavjudligini tekshirish
    const patientsList = data?.patients || [];

    const filteredPatients = patientsList.filter(patient =>
        (patient.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (patient.familya?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (patient.phone || "").includes(searchTerm)
    );

    return (
        <div className="p-4 md:p-8 space-y-8 bg-slate-50/30 min-h-screen">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-1">
                    <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <Link to="/" className="hover:text-[#00BCE4] transition-colors">{t('dashboard')}</Link>
                        <span className="text-slate-300">/</span>
                        <span className="text-slate-900">{t('patients')}</span>
                    </nav>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Bemorlar <span className="text-[#00BCE4]">Bazasi</span></h2>
                </div>

                <div className='flex flex-wrap gap-4 w-full md:w-auto'>
                    <div className="relative grow md:grow-0 min-w-[300px] group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-[#00BCE4] transition-colors" />
                        <input
                            type="text"
                            placeholder={t('search')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-3.5 pl-12 pr-4 bg-white border border-slate-100 rounded-[1.25rem] text-slate-800 font-bold focus:ring-4 focus:ring-[#00BCE4]/10 focus:border-[#00BCE4] focus:outline-none shadow-sm transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <button
                        onClick={() => handleOpenModal(null)}
                        className='flex items-center justify-center gap-2 py-3.5 px-8 bg-[#00BCE4] hover:bg-[#00a6c9] text-white rounded-[1.25rem] font-black shadow-lg shadow-[#00BCE4]/20 transition-all active:scale-95 uppercase tracking-widest text-xs w-full md:w-auto'
                    >
                        <Plus className='w-5 h-5' /> {t('add')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] w-16">#</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('name')}</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('phone')}</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('debt')}</th>
                                <th className="px-6 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('registered_date')}</th>
                                <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] w-32">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 whitespace-nowrap font-sans">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient, index) => (
                                    <tr key={patient.id} className='hover:bg-[#00BCE4]/5 transition-all group'>
                                        <td className="px-8 py-5 text-sm font-bold text-slate-300 group-hover:text-[#00BCE4]">{index + 1}</td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-[#00BCE4] transition-colors">
                                                    <User className="w-5 h-5 text-slate-400 group-hover:text-white" />
                                                </div>
                                                <span className="text-sm font-black text-slate-700">{patient.name} {patient.familya}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-500">{patient.phone}</td>
                                        <td className="px-6 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[12px] font-black ${patient.debt?.toString().startsWith('-') ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-[#00BCE4]/10 text-[#00BCE4] border border-[#00BCE4]/20'}`}>
                                                {patient.debt}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-slate-400">{patient.registrationDate}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => alert(`${t('send_to_treatment')}: ${patient.name}`)}
                                                    className='p-2.5 rounded-xl bg-white border border-slate-100 text-[#00BCE4] hover:bg-[#00BCE4] hover:text-white hover:shadow-lg hover:shadow-[#00BCE4]/20 transition-all'
                                                    title={t('treatment')}
                                                >
                                                    <FileText className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleOpenModal(patient)}
                                                    className='p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-amber-500 hover:border-amber-100 transition-all'
                                                    title={t('edit')}
                                                >
                                                    <Edit className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(patient.id, patient.name)}
                                                    className='p-2.5 rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 transition-all'
                                                    title={t('delete')}
                                                >
                                                    <Trash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className='p-20 text-center'>
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                                <User className="w-8 h-8" />
                                            </div>
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px]">{t('no_patients')}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <AddEditPatientModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingPatient={editingPatient}
            />
        </div>
    );
};

export default PatientsContent;
