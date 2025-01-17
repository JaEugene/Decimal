import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../../ui/Card';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

export const ContactForm: FC<ContactFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-6">Contact Compliance Team</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full bg-gray-800 rounded-lg p-2"
            placeholder="Your name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full bg-gray-800 rounded-lg pl-10 p-2"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone (optional)</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="tel"
              {...register('phone')}
              className="w-full bg-gray-800 rounded-lg pl-10 p-2"
              placeholder="Your phone number"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            className="w-full bg-gray-800 rounded-lg p-2"
            placeholder="What's this about?"
          />
          {errors.subject && (
            <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
            <textarea
              {...register('message', { required: 'Message is required' })}
              className="w-full bg-gray-800 rounded-lg pl-10 p-2 h-32"
              placeholder="How can we help?"
            />
          </div>
          {errors.message && (
            <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#0000FF] text-white font-semibold py-3 rounded-lg hover:bg-[#0000CC] transition-colors"
        >
          Send Message
        </button>
      </form>
    </Card>
  );
};