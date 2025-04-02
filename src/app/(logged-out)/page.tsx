'use client'

import { Button } from "@/components/ui/button";
import { PersonStandingIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <>
      <h1 className="flex gap-2 items-center">
        <PersonStandingIcon size={50} className="text-pink-500" /> RSM
      </h1>
      <p>온라인 마케팅을 관리하는 최고의 도구</p>
      <div className="flex gap-2 items-center">
        <Button asChild>
          <Link href="/login">로그인</Link>
        </Button>
      </div>
    </>
  );
};
 
export default LandingPage;