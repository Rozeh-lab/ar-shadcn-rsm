"use client";
 
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
 
// 1) 폼 유효성 검사 스키마 정의
const formSchema = z.object({
  email: z.string().email("유효한 이메일을 입력하세요."),
  password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});
 
const LoginPage: React.FC = () => {
  // 2) useForm 설정
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema), // zodResolver를 사용하여 유효성 검사를 적용
    defaultValues: { email: "", password: "" }, // 기본값을 빈 문자열로 설정
  });
 
  // 3) 폼 제출 핸들러
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("로그인 확인이 통과되었습니다.", data);
  };
 
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
        <CardDescription>RSM 계정에 로그인하세요.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-4">
            {/* 이메일 입력 필드 */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>이메일</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             
            {/* 비밀번호 입력 필드 */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>비밀번호</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="비밀번호" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             
            {/* 로그인 버튼 */}
            <Button asChild className="w-full">
              <Link href="/dashboard">로그인</Link>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
 
export default LoginPage;