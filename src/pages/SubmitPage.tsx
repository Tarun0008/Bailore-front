import SubmitForm from '../components/SubmitForm';
import RaffleWidget from '../components/RaffleWidget';

const SubmitPage = () => {
    return (
        <div className="min-h-screen bg-ivory">
            <div className="section">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16 fade-in" style={{ animationDelay: '0.1s' }}>
                            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-accent mb-6">
                                Share Your Bali Story
                            </h1>
                            <p className="font-lora text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                                Contribute to our collection of Balian tales, hidden histories, and cultural insights. We welcome your unique perspective and experiences.
                            </p>
                        </div>

                        <div className="card mb-16 fade-in" style={{ animationDelay: '0.3s' }}>
                            <SubmitForm />
                        </div>

                        <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
                            <h3 className="font-playfair text-3xl font-bold mb-8 text-accent">
                                Submission Guidelines
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                        <span className="text-primary text-lg">1</span>
                                    </div>
                                    <p className="font-lora text-gray-700 leading-relaxed">
                                        Stories should be related to Bali's culture, history, or personal experiences.
                                    </p>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                        <span className="text-primary text-lg">2</span>
                                    </div>
                                    <p className="font-lora text-gray-700 leading-relaxed">
                                        Be respectful of local customs and traditions in your narrative.
                                    </p>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                        <span className="text-primary text-lg">3</span>
                                    </div>
                                    <p className="font-lora text-gray-700 leading-relaxed">
                                        Ensure your content is original and does not infringe on copyrights.
                                    </p>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                        <span className="text-primary text-lg">4</span>
                                    </div>
                                    <p className="font-lora text-gray-700 leading-relaxed">
                                        All submissions are reviewed by our team before publication.
                                    </p>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                                        <span className="text-primary text-lg">5</span>
                                    </div>
                                    <p className="font-lora text-gray-700 leading-relaxed">
                                        Opportunities to add photos and videos may be available after initial approval.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="card fade-in" style={{ animationDelay: '0.7s' }}>
                            <h3 className="font-playfair text-3xl font-bold mb-8 text-accent text-center">
                                Enter Our Monthly Raffle
                            </h3>
                            <p className="font-lora text-gray-700 leading-relaxed text-center mb-8">
                                Share your story and get a chance to win amazing Bali experiences!
                            </p>
                            <RaffleWidget />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmitPage;
