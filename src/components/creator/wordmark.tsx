import Image from "next/image";
import Link from "next/link";

export function Wordmark({
  href = "/",
  className,
  priority = false,
}: {
  href?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={className ?? "wordmark"}
      aria-label="codesbyshivam home"
    >
      <Image
        src="/logo.svg"
        alt=""
        width={22}
        height={22}
        className="size-5.5"
        priority={priority}
      />
      codesbyshivam
      <span className="text-accent">.</span>
    </Link>
  );
}
