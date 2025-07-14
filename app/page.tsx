import ModelViewer from "@/components/ModelViewer";
import Nav from "@/components/Nav";
import Carrousel from "@/components/Carrousel";
import Tendance from "@/components/Tendance";

export default function Home() {
  return (
    <div>
      <Nav/>
      <div>
      <Carrousel />
      </div>
      <Tendance />
    <ModelViewer />
    </div>
  );
}
