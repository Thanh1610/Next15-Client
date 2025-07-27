'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RegisterSchema, RegisterSchemaType } from '@/validations/auth.schema';
import { registerApi } from '@/repositories/authRepository';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const router = useRouter();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    setIsLoading(true);
    try {
      const res = await registerApi(values);
      if (res?.status === 'ERR') {
        return toast.error(res?.message || 'Registration failed');
      }

      form.reset();
      toast.success('Registration successful');
      router.push(routes.login.path);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Đăng ký tài khoản</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" type="tel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="********"
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-0 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        key={showConfirm ? 'text' : 'password'}
                        placeholder="********"
                        type={showConfirm ? 'text' : 'password'}
                        {...field}
                      />
                      <Button
                        type="button"
                        onClick={() => setShowConfirm(prev => !prev)}
                        variant="ghost"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-0 text-muted-foreground"
                        tabIndex={-1}
                      >
                        {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton isLoading={isLoading} type="submit" className="w-full">
              Đăng kí
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
