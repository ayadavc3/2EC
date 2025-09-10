import { Construction, Upload } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const ImportHelper = () => {
  return (
    <div>
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="relative mb-6">
            <Upload className="h-16 w-16 text-muted-foreground mb-2" />
            <Construction className="h-8 w-8 text-orange-500 absolute -top-1 -right-1" />
          </div>

          <h3 className="text-xl font-semibold mb-2">Import Students</h3>

          <p className="text-muted-foreground mb-6 text-sm">
            This feature is currently under development. Soon you'll be able to
            bulk import students from CSV or Excel files.
          </p>

          <div className="w-full space-y-2 text-xs text-muted-foreground">
            <div className="flex items-center justify-between py-1 border-b border-dashed">
              <span>• CSV File Upload</span>
              <span className="text-orange-500">Pending</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-dashed">
              <span>• Data Validation</span>
              <span className="text-orange-500">Pending</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-dashed">
              <span>• User Confirmation</span>
              <span className="text-orange-500">Pending</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span>• Bulk Processing</span>
              <span className="text-orange-500">Pending</span>
            </div>
          </div>

          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg w-full">
            <p className="text-xs text-blue-600 dark:text-blue-400">
              💡 <strong>Tip:</strong> For now, you can add students
              individually using the "New Student" button on the main students
              page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
