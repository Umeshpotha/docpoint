"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ContactUs: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: { name: '', email: '', phone: '', message: '', appointmentType: 'General Inquiry' }
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/contact', data);
      alert('Form submitted successfully!');
    } catch (error) {
      alert('Error submitting form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <h1 className="text-5xl font-bold tracking-wider mb-8 text-teal-400 text-center">
          Contact Us
        </h1>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4 text-center">Get in Touch</h2>
          <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          {...field}
                          className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone"
                          {...field}
                          className="bg-gray-700 text-white placeholder-gray-400 shadow-md"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="appointmentType"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Appointment Type</FormLabel>
                      <FormControl>
                        <select
                          className="w-full p-3 bg-gray-600 text-white rounded"
                          {...field}
                        >
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Appointment">Appointment</option>
                          <option value="Support">Support</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name="message"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          className="w-full p-3 bg-gray-600 text-white rounded"
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-teal-400 hover:bg-teal-300 shadow-lg">
                  {isSubmitting ? (
                    <>Please Wait...</>
                  ) : 'Submit'}
                </Button>
              </form>
            </Form>
          </div>
        </section>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-teal-400 mb-4 text-center">Company Details</h2>
          <div className="bg-gray-700  rounded-lg shadow-lg">
            <p className="text-gray-300 text-lg mb-4 text-center">
              <strong>Doctors Point</strong><br />
              Address: #A xyz-colony Tirupati 517501<br />
              Email: umeshpotha123@gmail.com<br />
              Phone: +91 91540 XXXXX<br />
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUs;
