// import { AppSidebar } from "@/components/Dashboard/AppSidebar";
// import DynamicBreadcrumb from "@/components/Dashboard/DynamicBreadcrumb";
// import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CustomDatePicker from "@/components/CustomDatePicker";
export default async function Page() {
  const cardArray = [
    { title: "title1", content: <CustomDatePicker /> },
    { title: "title1", content: <CustomDatePicker /> },
    { title: "title1", content: <CustomDatePicker /> },
    { title: "title1", content: <CustomDatePicker /> },
  ];

  return (
    <>
      <div className="flex-col md:flex sm:grid">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex-col items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p>this is the dashbord page</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cardArray.map((card, i) => {
              return (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>{card.content}</CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">{/* <Overview /> */}</CardContent>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>{/* <RecentSales /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
