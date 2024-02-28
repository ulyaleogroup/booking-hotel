import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FifthSection = () => {
  return (
    <div className="md:py-20 p-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Start booking your favorite room.
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            maiores voluptas nostrum dolores, tempora quibusdam, molestias eius
            distinctio aspernatur expedita laborum. Beatae aliquid
            exercitationem vero velit ex corporis doloribus sequi iure, voluptas
            ad eum obcaecati dignissimos rem deleniti quaerat facilis?
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Link href={"/form-booking"} className={cn(buttonVariants(), "my-3")}>
            Book Now
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FifthSection;
