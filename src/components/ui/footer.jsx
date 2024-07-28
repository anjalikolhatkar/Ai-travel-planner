import { Footer } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin, faGoogle } from '@fortawesome/free-brands-svg-icons';

function MyFooter() {
  return (
    <Footer container={true} className=" mb-4 text-gray-800 py-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <Footer.Copyright href="/" by="TravelGenius™" year={2024} className="text-center md:text-left mb-4 md:mb-0" />
        <Footer.LinkGroup className="flex flex-col md:flex-row md:space-x-6">
          <Footer.Link href="mailto:your-email@gmail.com" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Gmail
          </Footer.Link>
          <Footer.Link href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faInstagram} className="mr-2" /> Instagram
          </Footer.Link>
          <Footer.Link href="https://github.com/anjalikolhatkar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faGithub} className="mr-2" /> GitHub
          </Footer.Link>
          <Footer.Link href="https://www.linkedin.com/in/anjali-kolhatkar/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FontAwesomeIcon icon={faLinkedin} className="mr-2" /> LinkedIn
          </Footer.Link>
        </Footer.LinkGroup>
      </div>
    </Footer>
  );
}

export default MyFooter;
