import { auth } from "@/auth";
import { BigCalendar } from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import React from "react";

const page = async () => {
  const session = await auth();

  const user = session?.user;
  return <BigCalendarContainer doctorId={user?.id as string} />;
};

export default page;
