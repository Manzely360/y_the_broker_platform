export function Partners() {
  const partners = [
    { name: 'Orascom Development', logo: '/media/img/orascom-logo.png' },
    { name: 'Palm Hills', logo: '/media/img/palm-hills-logo.png' },
    { name: 'Aldar Properties', logo: '/media/img/aldar-logo.png' },
    { name: 'SODIC', logo: '/media/img/sodic-logo.png' },
    { name: 'TAT Group', logo: '/media/img/tat-logo.png' },
    { name: 'Ora Developments', logo: '/media/img/ora-logo.png' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Partners in Success
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We work with Egypt&apos;s leading real estate developers to bring you 
            the finest properties and investment opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-soft hover:shadow-medium transition-shadow duration-200"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <span className="text-2xl font-bold text-gray-600">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-700 text-center">
                  {partner.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Trusted by leading developers and investors across Egypt
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Certified Partners
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Quality Assured
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Trusted Service
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
