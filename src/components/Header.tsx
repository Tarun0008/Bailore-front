import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

    useEffect(() => {
        if (dark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [dark]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="bg-ivory dark:bg-accent shadow-md sticky top-0 z-50 transition-colors duration-300">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                <Link to="/" className="flex items-center group">
                    <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-playfair font-bold text-xl mr-3 group-hover:bg-opacity-90 transition-colors duration-300">
                        B
                    </div>
                    <h1 className="text-2xl font-playfair font-bold text-accent dark:text-ivory group-hover:text-primary transition-colors duration-300">
                        BaliLore
                    </h1>
                </Link>

                <nav className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 text-lg">Home</Link>
                    <Link to="/stories" className="font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 text-lg">Stories</Link>
                    <Link to="/submit" className="font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 text-lg">Submit</Link>
                    <Link to="/about" className="font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 text-lg">About</Link>
                    <button
                        aria-label="Toggle dark mode"
                        className="ml-6 w-10 h-10 flex items-center justify-center rounded-full border border-accent dark:border-ivory bg-white dark:bg-accent text-accent dark:text-ivory transition-colors duration-300"
                        onClick={() => setDark(d => !d)}
                    >
                        {dark ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                        )}
                    </button>
                </nav>

                <button
                    className="md:hidden text-accent dark:text-ivory hover:text-primary transition-colors duration-300"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
                </button>
            </div>

            {isMenuOpen && (
                <nav className="md:hidden bg-ivory dark:bg-accent py-4 px-6 shadow-lg absolute top-full left-0 right-0 transition-colors duration-300">
                    <ul className="flex flex-col space-y-4">
                        <li>
                            <Link
                                to="/"
                                className="block font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 py-2 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/stories"
                                className="block font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 py-2 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Stories
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/submit"
                                className="block font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 py-2 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Submit
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about"
                                className="block font-lora text-accent dark:text-ivory hover:text-primary transition-colors duration-300 py-2 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <button
                                aria-label="Toggle dark mode"
                                className="mt-2 w-10 h-10 flex items-center justify-center rounded-full border border-accent dark:border-ivory bg-white dark:bg-accent text-accent dark:text-ivory transition-colors duration-300"
                                onClick={() => { setDark(d => !d); setIsMenuOpen(false); }}
                            >
                                {dark ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" /></svg>
                                )}
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    );
};

export default Header;