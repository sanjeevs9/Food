import img from '../img/food/m1.png'

export function Testimonial() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Jane Doe</h3>
          <p className="text-gray-600">Food Enthusiast</p>
        </div>
      </div>
      <p className="text-gray-700 italic">
        "The variety and quality of food available on this platform is amazing! I've discovered so many new favorite dishes and talented local chefs. Highly recommended for any food lover!"
      </p>
    </div>
  )
}