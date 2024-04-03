import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AlertCircle from "@/components/Alert";

export default function AddCard({ player }: { player: Player }) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>
          <center>{player.name}</center>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 mt-6 w-96">
        <div className=" flex items-center space-x-2 rounded-md border">
          <Avatar className="relative h-56 w-56">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <CardFooter className="mr-2">
        <AlertCircle checked={player.checked} />
      </CardFooter>
    </Card>
  );
}
