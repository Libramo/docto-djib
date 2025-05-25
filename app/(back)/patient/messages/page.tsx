import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const page = () => {
  return (
    <div className="max-h-screen">
      {/* <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4"> */}
      <div className="flex flex-row gap-3 mx-3">
        <div className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Dossiers des messages</CardTitle>
              {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
            </CardHeader>
            <CardContent></CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardContent>
              <SimpleEditor />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
