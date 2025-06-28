import { Link } from 'react-router-dom';
import RaffleWidget from '../components/RaffleWidget';

const HomePage = () => {
    return (
        <div className="min-h-screen bg-ivory dark:bg-dark-background transition-colors duration-500">
            <section className="hero-section relative bg-accent text-white py-32 md:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-60 z-10 hero-overlay"></div>
                <div className="absolute inset-0 z-10 hero-gradient-overlay"></div>
                <div className="absolute inset-0 bg-pattern opacity-10 z-0"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center transform scale-105 z-0 animate-slow-zoom"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1604999333679-b86d54738315?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')"
                    }}
                ></div>
                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 fade-in animate-slide-up text-white dark:text-white" style={{ animationDelay: '0.2s' }}>
                            Discover the Untold Stories of Bali
                        </h1>
                        <p className="font-lora text-xl sm:text-2xl mb-12 leading-relaxed fade-in animate-fade-in text-white dark:text-dark-text-primary" style={{ animationDelay: '0.4s' }}>
                            Where locals and visitors share Balian tales, hidden histories, and cultural insights through photos, videos, poems, and street art.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6 fade-in animate-fade-in" style={{ animationDelay: '0.6s' }}>
                            <Link to="/submit" className="btn-primary text-lg px-10 py-4">
                                Share Your Story
                            </Link>
                            <Link to="/stories" className="btn-primary bg-accent dark:bg-dark-card-background text-white text-lg px-10 py-4 border-0 hover:bg-primary hover:text-white transition">
                                Explore Stories
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section bg-ivory dark:bg-dark-background transition-colors duration-500">
                <div className="container mx-auto px-6">
                    <div className="max-w-2xl mx-auto">
                        <RaffleWidget />
                    </div>
                </div>
            </section>

            <section className="section bg-ivory dark:bg-dark-background transition-colors duration-500">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="card mb-16 fade-in" style={{ animationDelay: '0.2s' }}>
                            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-accent dark:text-white text-center">
                                Welcome to BaliLore
                            </h2>
                            <div className="space-y-6">
                                <p className="font-lora text-gray-700 dark:text-dark-text-primary leading-relaxed text-lg">
                                    BaliLore.com is a city-focused microsite where locals and visitors share Balian tales, hidden histories, and cultural insights—through photos, videos, poems, and street art. Our platform is a vibrant canvas, capturing the essence of Bali's diverse narratives. We invite you to contribute your unique perspective and become part of this ever-evolving tapestry of stories that define the island's soul.
                                </p>
                                <p className="font-lora text-gray-700 dark:text-dark-text-primary leading-relaxed text-lg">
                                    Our mission is to preserve and celebrate the rich cultural heritage of Bali through authentic storytelling and community engagement. Join us in exploring the hidden gems and untold stories of this beautiful island. Discover ancient traditions, contemporary art scenes, and personal anecdotes that paint a vivid picture of Balinese life, fostering a deeper connection between people and place.
                                </p>
                            </div>
                            <div className="text-center mt-12">
                                <Link to="/about" className="btn-ghost text-lg px-10 py-4">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="fade-in" style={{ animationDelay: '0.4s' }}>
                            <h2 className="font-playfair text-4xl font-bold mb-12 text-accent dark:text-white text-center">
                                Featured Stories
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="card group flex flex-col items-center bg-white dark:bg-dark-card-background transition-colors duration-300">
                                    <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-lightgray dark:bg-gray-700 flex items-center justify-center">
                                        <img
                                            src="https://www.goatsontheroad.com/wp-content/uploads/2019/08/places-to-visit-in-bali-beratan-lake.jpg"
                                            alt="Bali Temple"
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-playfair text-xl font-bold mb-2 text-accent dark:text-white">Ancient Temples of Ubud</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary">Discover the spiritual heart of Bali through its magnificent temples...</p>
                                </div>
                                <div className="card group flex flex-col items-center bg-white dark:bg-dark-card-background transition-colors duration-300">
                                    <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-lightgray dark:bg-gray-700 flex items-center justify-center">
                                        <img
                                            src="https://marvelsofnature.com/wp-content/uploads/2024/05/Bali-photography.webp"
                                            alt="Bali Rice Fields"
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-playfair text-xl font-bold mb-2 text-accent dark:text-white">Terraced Rice Fields</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary">The story of Bali's iconic rice terraces and their cultural significance...</p>
                                </div>
                                <div className="card group flex flex-col items-center bg-white dark:bg-dark-card-background transition-colors duration-300">
                                    <div className="w-full aspect-square mb-4 rounded-lg overflow-hidden bg-lightgray dark:bg-gray-700 flex items-center justify-center">
                                        <img
                                            src="https://i.pinimg.com/736x/a5/cc/19/a5cc19cf37ae81b7f7186f1173df2446.jpg"
                                            alt="Bali Art"
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="font-playfair text-xl font-bold mb-2 text-accent dark:text-white">Contemporary Art Scene</h3>
                                    <p className="text-gray-600 dark:text-dark-text-secondary">Exploring Bali's vibrant modern art community and galleries...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
