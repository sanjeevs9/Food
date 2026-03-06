export function Testimonial() {
  return (
    <div className="border border-stone-200 bg-white rounded-2xl p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-['Fraunces'] font-semibold text-sm">
          JD
        </div>
        <div>
          <h3 className="font-['Outfit'] text-sm font-semibold text-stone-900">Jane Doe</h3>
          <p className="font-['Outfit'] text-xs text-stone-400">Food Enthusiast</p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <p className="font-['Outfit'] text-stone-600 leading-relaxed">
        "The variety and quality of food available on this platform is amazing! I've discovered so many new favorite dishes and talented local chefs. Highly recommended for any food lover!"
      </p>
    </div>
  )
}
