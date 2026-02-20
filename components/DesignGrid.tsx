import { useState } from 'react';
import { Eye, Heart } from 'lucide-react';

interface Design {
  id: number;
  title: string;
  category: string;
  image: string;
  likes: number;
}

const designs: Design[] = [
  {
    id: 1,
    title: 'Neon Dreams',
    category: 'Hoodie',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
    likes: 234,
  },
  {
    id: 2,
    title: 'Cyber Punk',
    category: 'Jacket',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop',
    likes: 189,
  },
  {
    id: 3,
    title: 'Street Flow',
    category: 'T-Shirt',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=700&fit=crop',
    likes: 312,
  },
  {
    id: 4,
    title: 'Urban Edge',
    category: 'Cargo',
    image: 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600&h=800&fit=crop',
    likes: 156,
  },
  {
    id: 5,
    title: 'Midnight',
    category: 'Cap',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&h=600&fit=crop',
    likes: 278,
  },
  {
    id: 6,
    title: 'Retro Wave',
    category: 'Sneakers',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
    likes: 445,
  },
];

export default function DesignGrid() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());

  const toggleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section className="w-full py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white mb-4">
            THE <span className="text-gradient">COLLECTION</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Preview our upcoming drops. Each piece tells a story.
          </p>
        </div>

        {/* CSS Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {designs.map((design, index) => (
            <div
              key={design.id}
              className={`group relative overflow-hidden rounded-2xl bg-cappy-gray cursor-pointer
                         transform transition-all duration-500 hover:scale-[1.02] hover:z-10
                         ${index === 0 || index === 3 ? 'sm:row-span-2' : ''}`}
              onMouseEnter={() => setHoveredId(design.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${index === 0 || index === 3 ? 'h-full min-h-[400px] sm:min-h-[600px]' : 'h-64 sm:h-80'}`}>
                <img
                  src={design.image}
                  alt={design.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                                transition-opacity duration-300 ${hoveredId === design.id ? 'opacity-100' : 'opacity-0'}`} />

                {/* Content Overlay */}
                <div className={`absolute inset-0 p-6 flex flex-col justify-end
                                transition-all duration-300 ${hoveredId === design.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="text-cappy-accent text-xs font-bold uppercase tracking-wider mb-2">
                    {design.category}
                  </span>
                  <h3 className="text-white text-2xl font-bold mb-3">
                    {design.title}
                  </h3>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View</span>
                    </button>
                    <button
                      onClick={(e) => toggleLike(design.id, e)}
                      className={`flex items-center gap-2 transition-colors ${
                        likedItems.has(design.id) ? 'text-cappy-accent' : 'text-white/80 hover:text-cappy-accent'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedItems.has(design.id) ? 'fill-current' : ''}`} />
                      <span className="text-sm">
                        {design.likes + (likedItems.has(design.id) ? 1 : 0)}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full
                           hover:bg-white hover:text-cappy-black transition-all duration-300">
            View All Designs
          </button>
        </div>
      </div>
    </section>
  );
}