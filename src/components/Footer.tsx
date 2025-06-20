import { Link } from 'react-router-dom';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-accent text-ivory py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <Link to="/" className="flex items-center mb-4 group">
                            <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-playfair font-bold text-xl mr-3 group-hover:bg-opacity-90 transition-colors duration-300">
                                B
                            </div>
                            <h2 className="text-2xl font-playfair font-bold text-ivory group-hover:text-primary transition-colors duration-300">
                                BaliLore
                            </h2>
                        </Link>
                        <p className="font-lora mb-4 leading-relaxed text-lightgray">
                            Discover the untold stories of Bali through the eyes of locals and visitors.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-lightgray hover:text-primary transition-colors duration-300">
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-lightgray hover:text-primary transition-colors duration-300">
                                <FaTwitter size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-lightgray hover:text-primary transition-colors duration-300">
                                <FaFacebook size={24} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4 text-ivory">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="font-lora text-lightgray hover:text-primary transition-colors duration-300">Home</Link>
                            </li>
                            <li>
                                <Link to="/stories" className="font-lora text-lightgray hover:text-primary transition-colors duration-300">Stories</Link>
                            </li>
                            <li>
                                <Link to="/submit" className="font-lora text-lightgray hover:text-primary transition-colors duration-300">Submit</Link>
                            </li>
                            <li>
                                <Link to="/about" className="font-lora text-lightgray hover:text-primary transition-colors duration-300">About</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4 text-ivory">Contact</h3>
                        <p className="font-lora mb-2 text-lightgray">Email: info@balilore.com</p>
                        <p className="font-lora mb-6 text-lightgray">Bali, Indonesia</p>
                        <Link to="/submit" className="btn-primary font-lora">Share Your Story</Link>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-8 mt-8 text-center">
                    <p className="font-lora text-sm text-lightgray">
                        &copy; {currentYear} BaliLore.com. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;