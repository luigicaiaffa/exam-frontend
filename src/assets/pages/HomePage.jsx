import { useDataContext } from "../contexts/DataContext";

export default function HomePage() {
  const { guest } = useDataContext();

  console.log(guest);
  
}
