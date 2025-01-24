export default function TrustedBy() {
  return (
      <div className="mt-8">
          <p className="text-sm text-gray-500 mb-4">trusted by</p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
              {/* Add your venue/company logos here */}
              <img src="/logo1.png" alt="Company 1" className="h-8" />
              <img src="/logo2.png" alt="Company 2" className="h-8" />
          </div>
      </div>
  )
}