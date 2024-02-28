import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    name: "Standard",
    image: "/images/standard.jpg",
    price: "800000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "Start selling online with a simple and easy to use platform. Create your first store in minutes..",
  },
  {
    name: "Deluxe",
    image: "/images/deluxe.jpg",
    price: "1000000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "Level up your business with a powerful eCommerce platform. Get access to all the features you need to grow.",
  },
  {
    name: "Family",
    image: "/images/family.jpg",
    price: "1200000/day",
    discount: "Get discount 10% over 3 days",
    description:
      "For businesses that need more. Get access to all the features you need to grow.",
  },
];

const Pricing = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="
        text-4xl 
        text-center
         md:text-6xl 
         font-bold 
         bg-gradient-to-r
        from-black
         to-gray-500 
         bg-clip-text
         text-transparent md:pb-10
        "
      >
        Pricing
        <div className="text-2xl text-center md:text-4xl font-bold md:py-10">
          Simple and transparent pricing plans for all rooms.
        </div>
      </div>

      <div className="md:flex gap-16">
        {features.map((feature, index) => (
          <Card key={index} className="w-[500px] max-w-xl">
            <CardHeader>
              <CardTitle className="text-2xl">{feature.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image
                src={feature.image}
                alt={feature.name}
                width={500}
                height={500}
              />
              <div className="py-4">{feature.discount}</div>
              <CardDescription className="text-xl">
                {feature.description}
              </CardDescription>
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
