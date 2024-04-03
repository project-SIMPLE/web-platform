// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
//   Button,
// } from "@material-tailwind/react";
import { title } from "process";
import { ReactNode } from "react";

interface CardProps {
  title: string;
  icon: ReactNode;
  imageUrl: string;
  value: string;
  unit: string;
  texts: string[];
}

export function Card({
  title,
  icon,
  imageUrl,
  value,
  unit,
  texts,
}: CardProps): JSX.Element {
  return (
    // <Card className="mt-6 w-96">
    //   <CardHeader color="blue-gray" className="relative h-56">
    //     <img
    //       src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
    //       alt="card-image"
    //     />
    //   </CardHeader>
    //   <CardBody>
    //     <Typography variant="h5" color="blue-gray" className="mb-2">
    //       UI/UX Review Check
    //     </Typography>
    //     <Typography>
    //       The place is close to Barceloneta Beach and bus stop just 2 min by
    //       walk and near to &quot;Naviglio&quot; where you can enjoy the main
    //       night life in Barcelona.
    //     </Typography>
    //   </CardBody>
    //   <CardFooter className="pt-0">
    //     <Button>Read More</Button>
    //   </CardFooter>
    // </Card>
    <div className="flex w-full">
      <div className="flex flex-col w-full rounded-xl p-3  bg-gradient-to-tl from-[#0e1426] from-1% to-70% to-[#1d2b53] min-h-52 transform transition-transform ">
        <div className="flex justify-between h-1/4 ">
          <h3 className="text-xl roboto">{title}</h3>
          <div className="w-[30px] h-[30px] rounded-full bg-[#0e1426] p-1">
            {icon}
          </div>
        </div>
        <div className="flex h-full justify-center items-center">
          <div className="flex items-start">
            <h1 className="text-6xl">{value}</h1>
            <p className="ordinal">{unit}</p>
          </div>
        </div>
        <div className="flex flex-col h-1/4">
          <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#344378] to-transparent"></div>
          <div className="flex justify-between items-center mt-2">
            {texts.map((text, index) => (
              <p key={index} className="text-[#5a678c]">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
