export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-cyan-400/10 bg-slate-950/80">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-cyan-400">⚡ HERPERT</div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <a href="#products" className="hover:text-cyan-400 transition">Products</a>
            <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
          </div>
          <button className="btn-primary text-sm">Get Started</button>
        </nav>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            PDM & Email
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
              Intelligence
            </span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Enterprise Product Data Management with intelligent email integration.
            Manage PDM objects, tasks, and communications in one unified workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              → Live Demo
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-16">Why HERPERT?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "⚡ Blitz Email Client",
              desc: "Microsoft 365 email integration with PDM context. Drag & drop objects, AI summaries, cross-device sync.",
            },
            {
              title: "📊 Group PDM Backend",
              desc: "Enterprise-grade product data management. Azure SQL, real-time sync, detailed audit trails.",
            },
            {
              title: "🤖 Igor AI Assistant",
              desc: "Automatic task extraction, smart suggestions, email summarization, and multi-language support.",
            },
            {
              title: "🔗 One Unified Workspace",
              desc: "Manage projects, purchase orders, and tasks without context switching between tools.",
            },
            {
              title: "🔐 Enterprise Security",
              desc: "Microsoft Entra ID auth, Azure compliance, fine-grained permissions, secure data handling.",
            },
            {
              title: "📱 Works Everywhere",
              desc: "Native React frontend, responsive design, cross-device state sync via Azure SQL.",
            },
          ].map((feature, i) => (
            <div key={i} className="glass-hover p-6 group">
              <h3 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition">
                {feature.title}
              </h3>
              <p className="text-slate-400 group-hover:text-slate-300 transition">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-4xl font-bold text-center mb-16">Products</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Blitz */}
          <div className="glass p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Blitz</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              PDM-focused email client for Microsoft 365. Manage emails in the context of your projects,
              purchase orders, and tasks. AI-powered suggestions and drag-and-drop PDM integration.
            </p>
            <ul className="space-y-2 text-sm text-slate-400 mb-6">
              <li>✓ Swipe triage and action buttons</li>
              <li>✓ Drag & drop PDM linking</li>
              <li>✓ Igor AI assistant</li>
              <li>✓ Cross-device sync</li>
              <li>✓ Search & filter</li>
            </ul>
            <a href="#" className="btn-secondary inline-block">
              Explore Blitz →
            </a>
          </div>

          {/* Group PDM */}
          <div className="glass p-8 hover:scale-105 transition-transform duration-300">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-3xl font-bold text-cyan-400 mb-4">Group PDM</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Enterprise Product Data Management backend. Real-time collaboration,
              detailed audit trails, and secure cloud storage. Built on Azure SQL and serverless architecture.
            </p>
            <ul className="space-y-2 text-sm text-slate-400 mb-6">
              <li>✓ Projects & product tracking</li>
              <li>✓ Purchase orders & quotes</li>
              <li>✓ Supplier management</li>
              <li>✓ Real-time sync</li>
              <li>✓ Access control & permissions</li>
            </ul>
            <a href="#" className="btn-secondary inline-block">
              Explore PDM →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto glass p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to streamline your workflow?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Join teams that manage PDM and email together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary px-8 py-4 text-lg">
              Start Free Trial
            </button>
            <button className="btn-secondary px-8 py-4 text-lg">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-400/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center text-sm text-slate-400">
          <div>© 2026 HERPERT. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-400 transition">GitHub</a>
            <a href="#" className="hover:text-cyan-400 transition">Docs</a>
            <a href="#" className="hover:text-cyan-400 transition">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
