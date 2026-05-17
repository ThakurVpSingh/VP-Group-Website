import { PersonalLanding } from "../components/ui/personal-landing";
import ProjectNavbar from "../components/ProjectNavbar";
import Footer from "../components/Footer";

export default function OwnerPage() {
  return (
    <>
      <ProjectNavbar />
      <div className="pt-20">
        <PersonalLanding />
      </div>
      <Footer />
    </>
  );
}
