import Image from "next/image";

const avatars: {
  alt: string;
  src: string;
}[] = [
  {
    alt: "Sleeptopia User",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=776&auto=format&fit=crop",
  },
  {
    alt: "Sleeptopia User",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=776&auto=format&fit=crop",
  },
  {
    alt: "Sleeptopia User",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop",
  },
  {
    alt: "Sleeptopia User",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
  },
  {
    alt: "Sleeptopia User",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
  },
];

const TestimonialsAvatars = ({ priority }: { priority?: boolean }) => {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2.5">
        {avatars.map((image, i) => (
          <div
            key={i}
            className="relative inline-block"
          >
            <Image
              src={image.src}
              alt={image.alt}
              priority={priority}
              width={36}
              height={36}
              className="h-9 w-9 rounded-full border-2 border-background object-cover"
            />
          </div>
        ))}
      </div>
      <div className="ml-3">
        <p className="text-sm">
          Join <span className="font-medium text-primary">500+</span> others
        </p>
        <p className="text-sm font-medium">
          Transform your sleep today
        </p>
      </div>
    </div>
  );
};

export default TestimonialsAvatars;