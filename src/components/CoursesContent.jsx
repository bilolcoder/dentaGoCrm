import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Plus, CreditCard, User, Trash2, GraduationCap,
    Image as ImageIcon, Loader2, Edit2, CheckCircle2
} from 'lucide-react';
import { useData } from '../context/DataProvider';
import Modal from './common/Modal';

const CoursesContent = () => {
    const { data, updateData, t } = useData();
    const courses = data.courses || [];

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isPaymentStepOpen, setIsPaymentStepOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [editingCourse, setEditingCourse] = useState(null); // Tahrirlash uchun
    const [previewImage, setPreviewImage] = useState(null);
    const [tempCourseData, setTempCourseData] = useState(null);

    const {
        register: registerCourse,
        handleSubmit: handleCourseSubmit,
        reset: resetCourse,
        setValue,
        formState: { errors: courseErrors }
    } = useForm();

    const {
        register: registerPayment,
        handleSubmit: handlePaymentSubmit,
        reset: resetPayment,
        formState: { errors: paymentErrors }
    } = useForm();

    // Tahrirlashni boshlash
    const handleEditClick = (course) => {
        setEditingCourse(course);
        setPreviewImage(course.image);
        setValue('name', course.name);
        setValue('teacher', course.teacher);
        setValue('price', course.price);
        setIsAddModalOpen(true);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setValue('image', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCourseSubmit = (formData) => {
        if (editingCourse) {
            // Agar tahrirlash bo'lsa, to'lovsiz to'g'ridan-to'g'ri saqlaymiz
            handleSaveEdit(formData);
        } else {
            // Yangi kurs bo'lsa to'lovga o'tamiz
            setTempCourseData(formData);
            setIsAddModalOpen(false);
            setIsPaymentStepOpen(true);
        }
    };

    const handleSaveEdit = async (formData) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        updateData('courses', {
            ...editingCourse,
            ...formData,
            image: previewImage
        }, 'UPDATE');

        finishProcess();
    };

    const onFinalSubmit = async (paymentData) => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const finalObject = {
            ...tempCourseData,
            id: Date.now(),
            image: previewImage,
            comments: []
        };

        updateData('courses', finalObject, 'ADD');
        finishProcess();
    };

    const finishProcess = () => {
        setIsSubmitting(false);
        setIsAddModalOpen(false);
        setIsPaymentStepOpen(false);
        setEditingCourse(null);
        setPreviewImage(null);
        resetCourse();
        resetPayment();
    };

    return (
        <div className="p-4 md:p-8 space-y-8 min-h-full">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-8">
                <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
                    <div className="p-3 bg-[#00BCE4]/10 rounded-2xl">
                        <GraduationCap className="w-8 h-8 text-[#00BCE4]" />
                    </div>
                    {t('dental_courses')}
                </h1>
                <button
                    onClick={() => { setEditingCourse(null); resetCourse(); setPreviewImage(null); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 px-8 py-4 bg-[#00BCE4] text-white font-bold rounded-2xl shadow-lg hover:bg-[#00A5C8] transition-all active:scale-95 uppercase tracking-widest text-xs"
                >
                    <Plus className="w-5 h-5" /> {t('add_course')}
                </button>
            </div>

            {/* Kurslar Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map((course) => (
                    <div key={course.id} className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                        <div className="relative h-56 rounded-[2rem] overflow-hidden mb-6">
                            <img src={course.image || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5"} className="w-full h-full object-cover" alt="" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => handleEditClick(course)} className="p-3 bg-white/90 text-blue-500 rounded-2xl shadow-sm hover:bg-blue-50">
                                    <Edit2 className="w-4 h-4" />
                                </button>
                                <button onClick={() => updateData('courses', { id: course.id }, 'DELETE')} className="p-3 bg-white/90 text-red-500 rounded-2xl shadow-sm hover:bg-red-50">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="px-2">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-slate-800">{course.name}</h3>
                                <span className="px-3 py-1 bg-[#00BCE4]/10 text-[#00BCE4] rounded-lg font-black italic">{course.price}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm">
                                <User className="w-4 h-4" /> <span>{course.teacher}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 1-MODAL: KURS MA'LUMOTLARI */}
            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title={editingCourse ? "Tahrirlash" : "Yangi Kurs"}>
                <form onSubmit={handleCourseSubmit(onCourseSubmit)} className="space-y-5">
                    <div className="relative h-44">
                        <input type="file" accept="image/*" className="hidden" id="modal-img" onChange={handleImageChange} />
                        <label htmlFor="modal-img" className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[#00BCE4]/20 rounded-[2rem] bg-gray-50 cursor-pointer overflow-hidden">
                            {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-10 h-10 text-[#00BCE4] opacity-40" />}
                        </label>
                    </div>
                    <div className="space-y-4">
                        <input {...registerCourse('name', { required: true })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00BCE4]/20 font-bold" placeholder="Kurs nomi" />
                        <div className="grid grid-cols-2 gap-4">
                            <input {...registerCourse('teacher', { required: true })} className="px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00BCE4]/20 font-bold" placeholder="O'qituvchi" />
                            <input {...registerCourse('price', { required: true })} className="px-6 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#00BCE4]/20 font-bold" placeholder="Narxi" />
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#00BCE4] text-white font-black rounded-2xl uppercase text-xs flex justify-center items-center gap-2">
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingCourse ? "Saqlash" : "To'lovga o'tish"}
                    </button>
                </form>
            </Modal>

            {/* 2-MODAL: TO'LOV (Faqat yangi kurs uchun) */}
            <Modal isOpen={isPaymentStepOpen} onClose={() => !isSubmitting && setIsPaymentStepOpen(false)} title="Xavfsiz To'lov">
                <form onSubmit={handlePaymentSubmit(onFinalSubmit)} className="space-y-6">
                    <div className="bg-[#00BCE4] p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-10">
                                <CreditCard className="w-12 h-12 text-white/90" />
                                <div className="text-right">
                                    <p className="text-[10px] uppercase text-white/60">Kurs narxi</p>
                                    <p className="text-2xl font-black">{tempCourseData?.price}</p>
                                </div>
                            </div>
                            <p className="text-xl font-mono tracking-[0.4em] mb-4">8600 **** **** ****</p>
                            <p className="text-sm font-bold uppercase truncate">{tempCourseData?.name || 'KURS NOMI'}</p>
                        </div>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="space-y-4">
                        <input {...registerPayment('cardHolder', { required: true })} className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold uppercase" placeholder="Karta egasi" />
                        <input {...registerPayment('cardNumber', { required: true, pattern: /^\d{16}$/ })} maxLength={16} className="w-full px-6 py-4 bg-gray-50 rounded-2xl outline-none font-mono text-lg" placeholder="Karta raqami" />
                        <div className="grid grid-cols-2 gap-4">
                            <input {...registerPayment('expiry', { required: true })} maxLength={5} className="px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="MM/YY" />
                            <input {...registerPayment('cvv', { required: true })} type="password" maxLength={3} className="px-6 py-4 bg-gray-50 rounded-2xl outline-none font-bold" placeholder="CVV" />
                        </div>
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-[#00BCE4] text-white font-black rounded-3xl flex items-center justify-center gap-3 uppercase text-xs">
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> To'lovni tasdiqlash</>}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default CoursesContent;
