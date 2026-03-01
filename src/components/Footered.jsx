const Footer = () => {
  return (
    <footer className="bg-black text-white border border-red-700">
      
      {/* Terminal Top Bar */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-red-700 text-red-600 text-sm tracking-widest">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600"></div>
        </div>
        <div>msec@Celista-2K26</div>
      </div>

      <div className="px-16 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          
          {/* LEFT */}
          <div>
            <h1 className="text-3xl md:text-5xl text-red-600 font-bold mb-5 leading-tight break-all">
              MSEC@Celista-2K26
            </h1>

            <div className="space-y-2 text-gray-400">
              <p>
                Initializing <span className="text-red-500">red chip</span>...
              </p>
              <p>
                &gt; Loading Technical Events... <span className="text-green-500">Done.</span>
              </p>
              <p>
                &gt; Registration Status....{" "}
                <span className="text-green-500">Open</span>
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid grid-cols-1 md:grid-cols-10 gap-10">
            
            <div className="md:col-span-4">
              <h2 className="text-red-600 mb-3 font-semibold">
                ./System_Info
              </h2>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><span className="text-red-500">SYMPOSIUM:</span> Celista 2K26</p>
                <p><span className="text-red-500">DEPT:</span> AI & DS</p>
                <p><span className="text-red-500">COLLEGE:</span> Meenakshi Sundararajan Engineering College</p>
                <p><span className="text-red-500">STATUS:</span> <span className="text-green-500">● Online</span></p>
              </div>
            </div>

            <div className="md:col-span-3">
              <h2 className="text-red-600 mb-3 font-semibold">
                ./Navigation
              </h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Home</li>
                <li>About</li>
                <li>Events</li>
                <li>Location</li>
                <li>Credits</li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h2 className="text-red-600 mb-3 font-semibold">
                ./Social_Handles
              </h2>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>@ Instagram</li>
                <li>@ Gmail</li>
              </ul>
            </div>
          </div>
        </div>

        {/* MAP */}
        <div className="border border-red-700 rounded-md overflow-hidden">
          <iframe
            src="https://maps.google.com/maps?q=Meenakshi%20Sundararajan%20Engineering%20College&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-72"
            loading="lazy"
          ></iframe>
        </div>

        <p className="text-gray-400 text-sm">
          // 363, Arcot Road, Kodambakkam, Chennai, Tamil Nadu 600024
        </p>
      </div>

    </footer>
  );
};

export default Footer;
