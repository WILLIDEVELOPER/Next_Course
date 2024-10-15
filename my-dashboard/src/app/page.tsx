import { redirect } from "next/navigation";

export default function HomePage() {
  //* con este redirect redirige al dashboard counter y funciona como un return
  redirect("/dashboard/main");
}
