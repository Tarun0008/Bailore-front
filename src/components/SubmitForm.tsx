import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type FormData = {
    name: string;
    email: string;
    title: string;
    body: string;
    image?: FileList;
};

const SubmitForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        console.log('Form data:', data);
        try {
            setIsSubmitting(true);

            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('title', data.title);
            formData.append('body', data.body);

            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            } else {
                const defaultImages = [
                    'https://cdn.divessi.com/cached/Indonesia_Bali_Shutterstock_chanchai-duangdoosan.jpg/1200.jpg',
                    'https://i.pinimg.com/736x/92/b1/79/92b1791393625bbb8f4d16d9a64c7873.jpg',
                    'https://i.pinimg.com/736x/22/2d/9b/222d9bc51d5f98e6f96990b1694df12b.jpg'
                ];
                const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
                formData.append('imageUrl', randomImage);
            }

            const response = await axios.post('/api/submit-lore', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setSubmitSuccess(true);
                reset();
                toast.success('✅ Thank you—your story is under review.', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Something went wrong. Please try again.', {
                    position: "top-center"
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Failed to submit. Please try again later.', {
                position: "top-center"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-playfair text-3xl font-bold mb-4 text-accent">Thank You!</h3>
                <p className="font-lora text-gray-700 text-lg mb-8 max-w-md mx-auto">
                    Your story has been submitted successfully. We'll review it shortly and get back to you.
                </p>
                <button
                    onClick={() => setSubmitSuccess(false)}
                    className="btn-primary-share text-lg px-10 py-4"
                >
                    Submit Another Story
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
                <label htmlFor="name" className="block font-lora font-medium text-accent text-lg">
                    Your Name
                </label>
                <input
                    id="name"
                    type="text"
                    className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    placeholder="Enter your name"
                    {...register('name', {
                        required: 'Name is required',
                        minLength: {
                            value: 2,
                            message: 'Name must be at least 2 characters'
                        }
                    })}
                />
                {errors.name && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.name.message}</span>
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="email" className="block font-lora font-medium text-accent text-lg">
                    Email Address
                </label>
                <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="Enter your email"
                    {...register('email', {
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address'
                        }
                    })}
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.email.message}</span>
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="title" className="block font-lora font-medium text-accent text-lg">
                    Story Title
                </label>
                <input
                    id="title"
                    type="text"
                    className={`form-input ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="Enter a title for your story"
                    {...register('title', {
                        required: 'Title is required',
                        minLength: {
                            value: 5,
                            message: 'Title must be at least 5 characters'
                        }
                    })}
                />
                {errors.title && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.title.message}</span>
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="body" className="block font-lora font-medium text-accent text-lg">
                    Your Story
                </label>
                <textarea
                    id="body"
                    rows={8}
                    className={`form-input resize-none ${errors.body ? 'border-red-500' : ''}`}
                    placeholder="Share your Bali story, experience, or cultural insight..."
                    {...register('body', {
                        required: 'Story content is required',
                        minLength: {
                            value: 50,
                            message: 'Story must be at least 50 characters'
                        }
                    })}
                ></textarea>
                {errors.body && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.body.message}</span>
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="image" className="block font-lora font-medium text-accent text-lg">
                    Story Image (Optional)
                </label>
                <input
                    id="image"
                    type="file"
                    className={`form-input ${errors.image ? 'border-red-500' : ''}`}
                    accept="image/png, image/jpeg, image/gif"
                    {...register('image', {
                        validate: {
                            lessThan10MB: (files: FileList | undefined) => {
                                if (files && files[0]) {
                                    return files[0].size < 10000000 || 'Max file size is 10MB';
                                }
                                return true;
                            },
                            acceptedFormats: (files: FileList | undefined) => {
                                if (files && files[0]) {
                                    return ['image/jpeg', 'image/png', 'image/gif'].includes(files[0].type) || 'Only PNG, JPEG, or GIF images are allowed';
                                }
                                return true;
                            }
                        }
                    })}
                />
                {errors.image && (
                    <p className="text-red-600 text-sm mt-1 flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{errors.image.message}</span>
                    </p>
                )}
            </div>

            <div>
                <button
                    type="submit"
                    className="btn-primary-share w-full text-lg py-4"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Submitting...</span>
                        </span>
                    ) : (
                        'Submit Your Story'
                    )}
                </button>
            </div>
        </form>
    );
};

export default SubmitForm;
