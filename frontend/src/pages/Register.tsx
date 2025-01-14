import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axiosInstance from '../api/axiosInstance';
import toast from 'react-hot-toast';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  dob: z.string().nonempty('Date of birth is required'),
  collegeName: z.string().min(2, 'College name must be at least 2 characters'),
  state: z.string().min(2, 'State must be at least 2 characters'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('/api/users', data);
      if (response.status === 201) {
        toast.success('Registration successful!');
        reset();
      } else {
        throw new Error('Unexpected response from the server');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl">
        <div className="p-8 sm:p-12">
          <div className="flex justify-center mb-8">
            <UserPlus className="h-16 w-16 text-blue-500" />
          </div>
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-10">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-1">
                Username
              </label>
              <input
                {...register('username')}
                type="text"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                {...register('dob')}
                type="date"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.dob && (
                <p className="mt-2 text-sm text-red-600">{errors.dob.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="collegeName" className="block text-sm font-semibold text-gray-700 mb-1">
                College Name
              </label>
              <input
                {...register('collegeName')}
                type="text"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.collegeName && (
                <p className="mt-2 text-sm text-red-600">{errors.collegeName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1">
                State
              </label>
              <input
                {...register('state')}
                type="text"
                className="block w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              {errors.state && (
                <p className="mt-2 text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 text-white font-semibold bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
