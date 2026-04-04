import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-midnight text-cream pt-20 pb-8 px-[5%]">
      <div className="max-w-350 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div className="lg:col-span-1">
          <h3 className="font-playfair text-2xl font-bold text-warm-white mb-4">
            Brightstream
          </h3>
          <p className="text-slate font-light">
            Banking reimagined for modern life. Experience financial excellence
            that elevates every aspect of your journey.
          </p>
        </div>

        <div>
          <h4 className="font-playfair text-xl font-semibold text-warm-white mb-6">
            Products
          </h4>
          <ul className="space-y-3">
            {[
              "Personal Banking",
              "Business Banking",
              "Wealth Management",
              "Credit Cards",
              "Loans",
            ].map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-slate hover:text-gold hover:pl-1 transition-all"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-playfair text-xl font-semibold text-warm-white mb-6">
            Company
          </h4>
          <ul className="space-y-3">
            {["About Us", "Careers", "Press", "Sustainability", "Contact"].map(
              (l) => (
                <li key={l}>
                  <Link
                    href="#"
                    className="text-slate hover:text-gold hover:pl-1 transition-all"
                  >
                    {l}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-playfair text-xl font-semibold text-warm-white mb-6">
            Support
          </h4>
          <ul className="space-y-3">
            {[
              "Help Center",
              "Security",
              "Privacy Policy",
              "Terms of Service",
              "Accessibility",
            ].map((l) => (
              <li key={l}>
                <Link
                  href="#"
                  className="text-slate hover:text-gold hover:pl-1 transition-all"
                >
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 pt-8 flex flex-col md:flex-row justify-between items-center max-w-350 mx-auto text-slate text-sm">
        <p>© 2024 Brightstream Bank. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          {["LinkedIn", "Twitter", "Facebook", "Instagram"].map((s) => (
            <a key={s} href="#" className="hover:text-gold transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
