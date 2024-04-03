import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertCircle({ checked }: { checked: boolean }) {
  return (
    <div className={checked ? "bg-green-400" : "bg-red-400"}>
      <Alert variant="destructive">
        {/* <AlertCircle className="h-4 w-4" /> */}
        {/* <AlertTitle>Error</AlertTitle> */}
        <AlertDescription>
          {checked ? "Connected" : "Disconnected"}
        </AlertDescription>
      </Alert>
    </div>
  );
}
