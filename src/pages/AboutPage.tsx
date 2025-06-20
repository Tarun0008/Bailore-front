import { Link } from 'react-router-dom';

const AboutPage = () => {
    return (
        <div className="bg-ivory dark:bg-dark-background min-h-screen py-16 md:py-24 transition-colors duration-500">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12 fade-in" style={{ animationDelay: '0.1s' }}>
                        <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-accent dark:text-white mb-4">
                            About BaliLore
                        </h1>
                        <p className="font-lora text-lg text-gray-700 dark:text-dark-text-primary leading-relaxed">
                            Discover the story behind our platform dedicated to the vibrant culture of Bali.
                        </p>
                    </div>

                    <div className="card mb-12 fade-in">
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-6 leading-relaxed text-lg">
                            BaliLore.com is a city-focused microsite where locals and visitors share Balian tales, hidden histories, and cultural insights—through photos, videos, poems, and street art.
                        </p>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-6 leading-relaxed text-lg">
                            Our platform was created with a simple mission: to preserve and celebrate the rich cultural heritage of Bali through authentic storytelling and community engagement. We believe that every corner of this beautiful island holds stories waiting to be told, and every person who has experienced Bali carries a unique perspective worth sharing.
                        </p>

                        <h2 className="font-playfair text-2xl md:text-3xl font-bold mt-8 mb-4 text-accent dark:text-white">Our Mission</h2>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-4 leading-relaxed text-lg">
                            At BaliLore, we aim to:
                        </p>
                        <ul className="font-lora text-gray-700 dark:text-dark-text-primary space-y-2 list-disc list-inside mb-6 leading-relaxed text-lg">
                            <li>Collect and preserve authentic Balinese stories and cultural knowledge.</li>
                            <li>Create a platform where both locals and visitors can share their experiences.</li>
                            <li>Promote cultural understanding and appreciation of Bali's rich heritage.</li>
                            <li>Support local artists, writers, and cultural practitioners.</li>
                            <li>Build a comprehensive digital archive of Bali's evolving cultural landscape.</li>
                        </ul>

                        <h2 className="font-playfair text-2xl md:text-3xl font-bold mt-8 mb-4 text-accent dark:text-white">Join Our Community</h2>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-6 leading-relaxed text-lg">
                            Whether you're a lifelong resident of Bali, a frequent visitor, or someone who has been touched by Bali's magic from afar, we invite you to become part of our growing community. Share your stories, read others' experiences, and help us create a living testament to the beauty and complexity of Balinese culture.
                        </p>
                        <div className="mt-8 text-center">
                            <Link to="/submit" className="btn-primary font-lora text-lg px-8 py-3">
                                Share Your Story
                            </Link>
                        </div>
                    </div>

                    <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
                        <h3 className="font-playfair text-2xl md:text-3xl font-bold mb-6 text-accent dark:text-white">Contact Us</h3>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-4 leading-relaxed text-lg">
                            Have questions or suggestions? We'd love to hear from you!
                        </p>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-2 text-lg">
                            <strong>Email:</strong> <a href="mailto:info@balilore.com" className="text-primary hover:underline">info@balilore.com</a>
                        </p>
                        <p className="font-lora text-gray-700 dark:text-dark-text-primary mb-6 text-lg">
                            <strong>Location:</strong> Bali, Indonesia
                        </p>
                        <div className="text-center">
                            <a href="mailto:info@balilore.com" className="btn-ghost font-lora text-lg px-8 py-3">
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;