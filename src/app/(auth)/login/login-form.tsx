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
import { LoginSchema, LoginSchemaType } from '@/validations/auth.schema';
import { loginApi, setAuthCookieApi } from '@/repositories/authRepository';
import { toast } from 'react-toastify';
import { useState } from 'react';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    setIsLoading(true);
    try {
      const res = await loginApi(values);
      if (res?.status === 'SUCCESS') {
        const token = res?.access_token;
        if (!token) throw new Error('Missing token');

        try {
          await setAuthCookieApi(token);
        } catch {
          throw new Error('Cookies could not be set.');
        }

        form.reset();
        toast.success(res?.message || 'Login successful!');
        router.push(routes.home.path);
      } else {
        toast.error(res?.message || 'Login failed!');
      }
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message || 'An error has occurred!');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Đăng nhập tài khoản</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <LoadingButton isLoading={isLoading} type="submit" className="w-full cursor-pointer">
              Đăng nhập
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
