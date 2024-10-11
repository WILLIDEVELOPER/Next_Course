import Link from "next/link";

interface Props {
  path: string;
  text: string;
}

export const ActiveLink = ({ path, text }: Props) => {
  return (
    <Link className="mr-2" href={path}>
      {text}
    </Link>
  );
};
