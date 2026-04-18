"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { chewy } from "@/lib/font-chewy";

const services = [
  { id: "website-design", label: "Website design" },
  { id: "content-creation", label: "Content creation" },
  { id: "ux-design", label: "UX design" },
  { id: "brand-strategy", label: "Brand strategy" },
  { id: "user-research", label: "User research" },
  { id: "other", label: "Other" },
];

const countries = [
  { value: "af", label: "Afghanistan", code: "+93" },
  { value: "al", label: "Albania", code: "+355" },
  { value: "dz", label: "Algeria", code: "+213" },
  { value: "ad", label: "Andorra", code: "+376" },
  { value: "ao", label: "Angola", code: "+244" },
  { value: "ag", label: "Antigua and Barbuda", code: "+1268" },
  { value: "ar", label: "Argentina", code: "+54" },
  { value: "am", label: "Armenia", code: "+374" },
  { value: "au", label: "Australia", code: "+61" },
  { value: "at", label: "Austria", code: "+43" },
  { value: "az", label: "Azerbaijan", code: "+994" },
  { value: "bs", label: "Bahamas", code: "+1242" },
  { value: "bh", label: "Bahrain", code: "+973" },
  { value: "bd", label: "Bangladesh", code: "+880" },
  { value: "bb", label: "Barbados", code: "+1246" },
  { value: "by", label: "Belarus", code: "+375" },
  { value: "be", label: "Belgium", code: "+32" },
  { value: "bz", label: "Belize", code: "+501" },
  { value: "bj", label: "Benin", code: "+229" },
  { value: "bt", label: "Bhutan", code: "+975" },
  { value: "bo", label: "Bolivia", code: "+591" },
  { value: "ba", label: "Bosnia and Herzegovina", code: "+387" },
  { value: "bw", label: "Botswana", code: "+267" },
  { value: "br", label: "Brazil", code: "+55" },
  { value: "bn", label: "Brunei", code: "+673" },
  { value: "bg", label: "Bulgaria", code: "+359" },
  { value: "bf", label: "Burkina Faso", code: "+226" },
  { value: "bi", label: "Burundi", code: "+257" },
  { value: "cv", label: "Cabo Verde", code: "+238" },
  { value: "kh", label: "Cambodia", code: "+855" },
  { value: "cm", label: "Cameroon", code: "+237" },
  { value: "ca", label: "Canada", code: "+1" },
  { value: "cf", label: "Central African Republic", code: "+236" },
  { value: "td", label: "Chad", code: "+235" },
  { value: "cl", label: "Chile", code: "+56" },
  { value: "cn", label: "China", code: "+86" },
  { value: "co", label: "Colombia", code: "+57" },
  { value: "km", label: "Comoros", code: "+269" },
  { value: "cg", label: "Congo", code: "+242" },
  { value: "cr", label: "Costa Rica", code: "+506" },
  { value: "hr", label: "Croatia", code: "+385" },
  { value: "cu", label: "Cuba", code: "+53" },
  { value: "cy", label: "Cyprus", code: "+357" },
  { value: "cz", label: "Czech Republic", code: "+420" },
  { value: "dk", label: "Denmark", code: "+45" },
  { value: "dj", label: "Djibouti", code: "+253" },
  { value: "dm", label: "Dominica", code: "+1767" },
  { value: "do", label: "Dominican Republic", code: "+1809" },
  { value: "ec", label: "Ecuador", code: "+593" },
  { value: "eg", label: "Egypt", code: "+20" },
  { value: "sv", label: "El Salvador", code: "+503" },
  { value: "gq", label: "Equatorial Guinea", code: "+240" },
  { value: "er", label: "Eritrea", code: "+291" },
  { value: "ee", label: "Estonia", code: "+372" },
  { value: "sz", label: "Eswatini", code: "+268" },
  { value: "et", label: "Ethiopia", code: "+251" },
  { value: "fj", label: "Fiji", code: "+679" },
  { value: "fi", label: "Finland", code: "+358" },
  { value: "fr", label: "France", code: "+33" },
  { value: "ga", label: "Gabon", code: "+241" },
  { value: "gm", label: "Gambia", code: "+220" },
  { value: "ge", label: "Georgia", code: "+995" },
  { value: "de", label: "Germany", code: "+49" },
  { value: "gh", label: "Ghana", code: "+233" },
  { value: "gr", label: "Greece", code: "+30" },
  { value: "gd", label: "Grenada", code: "+1473" },
  { value: "gt", label: "Guatemala", code: "+502" },
  { value: "gn", label: "Guinea", code: "+224" },
  { value: "gw", label: "Guinea-Bissau", code: "+245" },
  { value: "gy", label: "Guyana", code: "+592" },
  { value: "ht", label: "Haiti", code: "+509" },
  { value: "hn", label: "Honduras", code: "+504" },
  { value: "hu", label: "Hungary", code: "+36" },
  { value: "is", label: "Iceland", code: "+354" },
  { value: "in", label: "India", code: "+91" },
  { value: "id", label: "Indonesia", code: "+62" },
  { value: "ir", label: "Iran", code: "+98" },
  { value: "iq", label: "Iraq", code: "+964" },
  { value: "ie", label: "Ireland", code: "+353" },
  { value: "il", label: "Israel", code: "+972" },
  { value: "it", label: "Italy", code: "+39" },
  { value: "jm", label: "Jamaica", code: "+1876" },
  { value: "jp", label: "Japan", code: "+81" },
  { value: "jo", label: "Jordan", code: "+962" },
  { value: "kz", label: "Kazakhstan", code: "+7" },
  { value: "ke", label: "Kenya", code: "+254" },
  { value: "ki", label: "Kiribati", code: "+686" },
  { value: "kp", label: "Korea, North", code: "+850" },
  { value: "kr", label: "Korea, South", code: "+82" },
  { value: "kw", label: "Kuwait", code: "+965" },
  { value: "kg", label: "Kyrgyzstan", code: "+996" },
  { value: "la", label: "Laos", code: "+856" },
  { value: "lv", label: "Latvia", code: "+371" },
  { value: "lb", label: "Lebanon", code: "+961" },
  { value: "ls", label: "Lesotho", code: "+266" },
  { value: "lr", label: "Liberia", code: "+231" },
  { value: "ly", label: "Libya", code: "+218" },
  { value: "li", label: "Liechtenstein", code: "+423" },
  { value: "lt", label: "Lithuania", code: "+370" },
  { value: "lu", label: "Luxembourg", code: "+352" },
  { value: "mg", label: "Madagascar", code: "+261" },
  { value: "mw", label: "Malawi", code: "+265" },
  { value: "my", label: "Malaysia", code: "+60" },
  { value: "mv", label: "Maldives", code: "+960" },
  { value: "ml", label: "Mali", code: "+223" },
  { value: "mt", label: "Malta", code: "+356" },
  { value: "mh", label: "Marshall Islands", code: "+692" },
  { value: "mr", label: "Mauritania", code: "+222" },
  { value: "mu", label: "Mauritius", code: "+230" },
  { value: "mx", label: "Mexico", code: "+52" },
  { value: "fm", label: "Micronesia", code: "+691" },
  { value: "md", label: "Moldova", code: "+373" },
  { value: "mc", label: "Monaco", code: "+377" },
  { value: "mn", label: "Mongolia", code: "+976" },
  { value: "me", label: "Montenegro", code: "+382" },
  { value: "ma", label: "Morocco", code: "+212" },
  { value: "mz", label: "Mozambique", code: "+258" },
  { value: "mm", label: "Myanmar", code: "+95" },
  { value: "na", label: "Namibia", code: "+264" },
  { value: "nr", label: "Nauru", code: "+674" },
  { value: "np", label: "Nepal", code: "+977" },
  { value: "nl", label: "Netherlands", code: "+31" },
  { value: "nz", label: "New Zealand", code: "+64" },
  { value: "ni", label: "Nicaragua", code: "+505" },
  { value: "ne", label: "Niger", code: "+227" },
  { value: "ng", label: "Nigeria", code: "+234" },
  { value: "mk", label: "North Macedonia", code: "+389" },
  { value: "no", label: "Norway", code: "+47" },
  { value: "om", label: "Oman", code: "+968" },
  { value: "pk", label: "Pakistan", code: "+92" },
  { value: "pw", label: "Palau", code: "+680" },
  { value: "pa", label: "Panama", code: "+507" },
  { value: "pg", label: "Papua New Guinea", code: "+675" },
  { value: "py", label: "Paraguay", code: "+595" },
  { value: "pe", label: "Peru", code: "+51" },
  { value: "ph", label: "Philippines", code: "+63" },
  { value: "pl", label: "Poland", code: "+48" },
  { value: "pt", label: "Portugal", code: "+351" },
  { value: "qa", label: "Qatar", code: "+974" },
  { value: "ro", label: "Romania", code: "+40" },
  { value: "ru", label: "Russia", code: "+7" },
  { value: "rw", label: "Rwanda", code: "+250" },
  { value: "kn", label: "Saint Kitts and Nevis", code: "+1869" },
  { value: "lc", label: "Saint Lucia", code: "+1758" },
  { value: "vc", label: "Saint Vincent and the Grenadines", code: "+1784" },
  { value: "ws", label: "Samoa", code: "+685" },
  { value: "sm", label: "San Marino", code: "+378" },
  { value: "st", label: "Sao Tome and Principe", code: "+239" },
  { value: "sa", label: "Saudi Arabia", code: "+966" },
  { value: "sn", label: "Senegal", code: "+221" },
  { value: "rs", label: "Serbia", code: "+381" },
  { value: "sc", label: "Seychelles", code: "+248" },
  { value: "sl", label: "Sierra Leone", code: "+232" },
  { value: "sg", label: "Singapore", code: "+65" },
  { value: "sk", label: "Slovakia", code: "+421" },
  { value: "si", label: "Slovenia", code: "+386" },
  { value: "sb", label: "Solomon Islands", code: "+677" },
  { value: "so", label: "Somalia", code: "+252" },
  { value: "za", label: "South Africa", code: "+27" },
  { value: "ss", label: "South Sudan", code: "+211" },
  { value: "es", label: "Spain", code: "+34" },
  { value: "lk", label: "Sri Lanka", code: "+94" },
  { value: "sd", label: "Sudan", code: "+249" },
  { value: "sr", label: "Suriname", code: "+597" },
  { value: "se", label: "Sweden", code: "+46" },
  { value: "ch", label: "Switzerland", code: "+41" },
  { value: "sy", label: "Syria", code: "+963" },
  { value: "tw", label: "Taiwan", code: "+886" },
  { value: "tj", label: "Tajikistan", code: "+992" },
  { value: "tz", label: "Tanzania", code: "+255" },
  { value: "th", label: "Thailand", code: "+66" },
  { value: "tl", label: "Timor-Leste", code: "+670" },
  { value: "tg", label: "Togo", code: "+228" },
  { value: "to", label: "Tonga", code: "+676" },
  { value: "tt", label: "Trinidad and Tobago", code: "+1868" },
  { value: "tn", label: "Tunisia", code: "+216" },
  { value: "tr", label: "Turkey", code: "+90" },
  { value: "tm", label: "Turkmenistan", code: "+993" },
  { value: "tv", label: "Tuvalu", code: "+688" },
  { value: "ug", label: "Uganda", code: "+256" },
  { value: "ua", label: "Ukraine", code: "+380" },
  { value: "ae", label: "United Arab Emirates", code: "+971" },
  { value: "gb", label: "United Kingdom", code: "+44" },
  { value: "us", label: "United States", code: "+1" },
  { value: "uy", label: "Uruguay", code: "+598" },
  { value: "uz", label: "Uzbekistan", code: "+998" },
  { value: "vu", label: "Vanuatu", code: "+678" },
  { value: "va", label: "Vatican City", code: "+379" },
  { value: "ve", label: "Venezuela", code: "+58" },
  { value: "vn", label: "Vietnam", code: "+84" },
  { value: "ye", label: "Yemen", code: "+967" },
  { value: "zm", label: "Zambia", code: "+260" },
  { value: "zw", label: "Zimbabwe", code: "+263" },
];



export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [locationSearch, setLocationSearch] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    organizationName: "",
    jobTitle: "",
    numberOfEmployees: "",
    location: "",
    telephone: "",
    message: "",
  });

  const filteredCountries = useMemo(() => {
    if (!locationSearch) return countries;
    return countries.filter((country) =>
      country.label.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locationSearch]);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLocationSelect = (value: string) => {
    handleInputChange("location", value);
    // Auto-fill phone number with country code
    const selectedCountry = countries.find((c) => c.value === value);
    if (selectedCountry && !formData.telephone) {
      handleInputChange("telephone", selectedCountry.code);
    }
    setLocationOpen(false);
    setLocationSearch("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { formData, selectedServices });
    // You would typically send this to an API here
  };

  const selectedCountryLabel = countries.find(
    (c) => c.value === formData.location
  )?.label;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <span className={`${chewy.className} text-2xl text-brand-pink transition-all duration-300 group-hover:scale-105`}>
              ishuu
            </span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} className="!text-gray-600 !stroke-gray-600" />
            <span className="text-sm font-medium">Back to home</span>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-serif italic text-brand-red mb-3">
              Get in touch
            </h1>
            <p className="text-gray-600 text-lg">
              {"Let's chat about how our expert team can help."}
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-brand-red">
                  First name
                </Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="bg-white border-gray-200 focus:border-brand-pink"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-brand-red">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="bg-white border-gray-200 focus:border-brand-pink"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-brand-red">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-white border-gray-200 focus:border-brand-pink"
                required
              />
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <Label htmlFor="organizationName" className="text-sm font-medium text-brand-red">
                Organization name
              </Label>
              <Input
                id="organizationName"
                placeholder="Your company or organization"
                value={formData.organizationName}
                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                className="bg-white border-gray-200 focus:border-brand-pink"
              />
            </div>

            {/* Job Title */}
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium text-brand-red">
                Job title
              </Label>
              <Input
                id="jobTitle"
                placeholder="Your role or position"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                className="bg-white border-gray-200 focus:border-brand-pink"
              />
            </div>

            {/* No. of Employees & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numberOfEmployees" className="text-sm font-medium text-brand-red">
                  No. of employees
                </Label>
                <Input
                  id="numberOfEmployees"
                  type="number"
                  placeholder="e.g. 50"
                  value={formData.numberOfEmployees}
                  onChange={(e) => handleInputChange("numberOfEmployees", e.target.value)}
                  className="bg-white border-gray-200 focus:border-brand-pink"
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium text-brand-red">
                  Location
                </Label>
                <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={locationOpen}
                      className="w-full justify-between bg-white border-gray-200 font-normal text-left hover:bg-gray-50"
                    >
                      {selectedCountryLabel || "Select country"}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0" align="start">
                    <div className="p-2 border-b border-gray-100">
                      <Input
                        placeholder="Search country..."
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        className="h-9 border-gray-200"
                      />
                    </div>
                    <div className="max-h-[200px] overflow-y-auto">
                      {filteredCountries.length === 0 ? (
                        <div className="py-6 text-center text-sm text-gray-500">
                          No country found.
                        </div>
                      ) : (
                        filteredCountries.map((country) => (
                          <button
                            key={country.value}
                            type="button"
                            onClick={() => handleLocationSelect(country.value)}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors flex items-center gap-2"
                          >
                            {country.label}
                            {formData.location === country.value && (
                              <span className="ml-auto text-brand-pink">✓</span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Telephone */}
            <div className="space-y-2">
              <Label htmlFor="telephone" className="text-sm font-medium text-brand-red">
                Telephone
              </Label>
              <Input
                id="telephone"
                type="tel"
                placeholder="+12101234567"
                value={formData.telephone}
                onChange={(e) => handleInputChange("telephone", e.target.value)}
                className="bg-white border-gray-200 focus:border-brand-pink"
              />
              <p className="text-xs text-gray-500">
                Include country code, no spaces or brackets (e.g., +12101234567)
              </p>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-brand-red">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className="bg-white border-gray-200 focus:border-brand-pink min-h-[120px] resize-none"
              />
            </div>

            {/* Services */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-brand-red">
                Services
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center gap-3">
                    <Checkbox
                      id={service.id}
                      checked={selectedServices.includes(service.id)}
                      onCheckedChange={() => handleServiceToggle(service.id)}
                      className="border-gray-300 data-[state=checked]:bg-brand-pink data-[state=checked]:border-brand-pink"
                    />
                    <Label
                      htmlFor={service.id}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      {service.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full gradient-brand hover:opacity-90 text-white rounded-md py-6 shadow-lg shadow-brand-red/25"
            >
              Send message
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
