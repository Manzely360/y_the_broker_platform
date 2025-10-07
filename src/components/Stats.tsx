export function Stats() {
  const stats = [
    {
      number: '500+',
      label: 'Properties Sold',
      description: 'Successfully completed transactions',
    },
    {
      number: '50+',
      label: 'Premium Projects',
      description: 'Exclusive developments across Egypt',
    },
    {
      number: '1000+',
      label: 'Happy Clients',
      description: 'Satisfied customers and investors',
    },
    {
      number: '15+',
      label: 'Years Experience',
      description: 'Trusted expertise in real estate',
    },
  ];

  return (
    <section className="py-16 bg-primary-500 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-lg text-primary-100 max-w-2xl mx-auto">
            Trusted by thousands of clients and investors across Egypt
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2 text-primary-100">
                {stat.label}
              </div>
              <div className="text-sm text-primary-200">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
