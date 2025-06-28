import { Link } from 'react-router-dom';

interface StoryCardProps {
    id: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    imageUrl?: string;
    mediaUrl?: string;
    mediaType?: string;
}

function getInitials(name: string) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const StoryCard = ({
    id,
    title,
    excerpt,
    author,
    date,
    imageUrl,
    mediaUrl,
    mediaType
}: StoryCardProps) => {
    const displayUrl = mediaUrl || imageUrl;
    const hasValidImage = displayUrl && (displayUrl.startsWith('http') || displayUrl.startsWith('/'));

    return (
        <div className="card group relative overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-card-hover bg-white dark:bg-dark-card-background text-accent dark:text-dark-text-primary">
            <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg mr-3">
                    {getInitials(author)}
                </div>
                <div>
                    <div className="font-lora text-sm text-gray-700 dark:text-dark-text-secondary font-semibold group-hover:text-primary transition-colors">By {author}</div>
                    <div className="text-xs text-gray-400 dark:text-dark-text-secondary">{date}</div>
                </div>
            </div>
            <div className="relative overflow-hidden rounded-lg mb-4 w-full h-48 bg-lightgray dark:bg-gray-700 flex items-center justify-center">
                {mediaType === 'video' && hasValidImage ? (
                    <video
                        src={displayUrl}
                        className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        controls
                        playsInline
                        muted
                        loop
                        onError={(e) => {
                            (e.target as HTMLVideoElement).style.display = 'none';
                        }}
                    />
                ) : hasValidImage ? (
                    <img
                        src={displayUrl}
                        alt={title}
                        className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-image.svg';
                        }}
                        loading="lazy"
                    />
                ) : (
                    <img
                        src="/placeholder-image.svg"
                        alt="Placeholder"
                        className="block w-full h-full object-cover"
                    />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                    <Link 
                        to={`/story/${id}`} 
                        className="btn-primary  text-sm px-5  py-0 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out flex flex-row items-center space-x-2"
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            color: '#E91E63',
                            border: '2px solid rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <span className='text-sm'>Read More</span>
                        <svg 
                            className="w-3 transition-transform group-hover:translate-x-1" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
            {/* <a href={`/story/${id}`}> */}
            <h3 className="font-playfair text-xl font-bold mb-2 text-accent dark:text-dark-text-primary group-hover:text-primary transition-colors">
                {title}
            </h3>
            {/* </a> */}
            <p className="font-lora text-gray-700 dark:text-dark-text-secondary mb-4 line-clamp-3">{excerpt}</p>
        </div>
    );
};

export default StoryCard;
