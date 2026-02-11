export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        {/* ABOUT */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Srajnik Lab
          </h3>
          <p className="text-sm">
            Empowering underprivileged youth through hands-on STEM education
            under Shiksha Sopan, IIT Kanpur.
          </p>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm">📧 srajnik@shiksha-sopan.org</p>
          <p className="text-sm">📞 +91 6388857763</p>
        </div>

        {/* ADDRESS */}
        <div>
          <h4 className="font-semibold text-white mb-3">Address</h4>
          <p className="text-sm">
            Room 3, 2nd Floor, Shiksha Sopan<br />
            Nankari, IIT Kanpur<br />
            Uttar Pradesh – 208016
          </p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} Srajnik Lab. All rights reserved.
      </div>
    </footer>
  );
}
