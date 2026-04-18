"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chewy } from "@/lib/font-chewy";
import { cn } from "@/lib/utils";

const services = [
  { id: "website-design", label: "Website design" },
  { id: "content-creation", label: "Content creation" },
  { id: "ux-design", label: "UX design" },
  { id: "brand-strategy", label: "Brand strategy" },
  { id: "user-research", label: "User research" },
  { id: "other", label: "Other" },
];

const teamSizes = [
  { value: "1-10", label: "1-10 people" },
  { value: "11-50", label: "11-50 people" },
  { value: "51-200", label: "51-200 people" },
  { value: "201-500", label: "201-500 people" },
  { value: "500+", label: "500+ people" },
];

const locations = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "uk", label: "United Kingdom", flag: "🇬🇧" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "au", label: "Australia", flag: "🇦🇺" },
  { value: "nz", label: "New Zealand", flag: "🇳🇿" },
  { value: "de", label: "Germany", flag: "🇩🇪" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "other", label: "Other", flag: "🌍" },
];

const countryCodes = [
  { value: "us", label: "+1", flag: "🇺🇸" },
  { value: "uk", label: "+44", flag: "🇬🇧" },
  { value: "au", label: "+61", flag: "🇦🇺" },
  { value: "nz", label: "+64", flag: "🇳🇿" },
  { value: "de", label: "+49", flag: "🇩🇪" },
];

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

// Calendar helper functions
const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  // Convert Sunday = 0 to Monday = 0
  return day === 0 ? 6 : day - 1;
};

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ContactPage() {
  const [step, setStep] = useState<"form" | "calendar">("form");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    teamSize: "",
    location: "",
    countryCode: "us",
    phoneNumber: "",
    message: "",
  });

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("calendar");
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (newDate >= today) {
      setSelectedDate(newDate);
    }
  };

  const handleFinalSubmit = () => {
    // Handle final submission
    console.log("Form submitted:", { formData, selectedServices, selectedDate, selectedTime });
    // You would typically send this to an API here
  };

  // Generate calendar days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  // Add the days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

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
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Form */}
            <div className={cn(
              "transition-opacity duration-300",
              step === "calendar" && "lg:opacity-50"
            )}>
              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif italic text-gray-900 mb-3">
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
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
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
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
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
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
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

                {/* Team Size & Location */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Team size
                    </Label>
                    <Select
                      value={formData.teamSize}
                      onValueChange={(value) => handleInputChange("teamSize", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-200 w-full">
                        <SelectValue placeholder="1-50 people" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamSizes.map((size) => (
                          <SelectItem key={size.value} value={size.value}>
                            {size.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Location
                    </Label>
                    <Select
                      value={formData.location}
                      onValueChange={(value) => handleInputChange("location", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-200 w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            <span className="flex items-center gap-2">
                              <span>{loc.flag}</span>
                              <span>{loc.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">
                    Phone number
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.countryCode}
                      onValueChange={(value) => handleInputChange("countryCode", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-200 w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {countryCodes.map((code) => (
                          <SelectItem key={code.value} value={code.value}>
                            <span className="flex items-center gap-1">
                              <span>{code.flag}</span>
                              <span>{code.label}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      placeholder="+64 (210) 000-0000"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      className="bg-white border-gray-200 focus:border-brand-pink flex-1"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-gray-700">
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
                  <Label className="text-sm font-medium text-gray-700">
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
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-md py-6"
                >
                  Send message
                </Button>
              </form>
            </div>

            {/* Right Column - Calendar */}
            <div className={cn(
              "transition-all duration-500",
              step === "form" ? "opacity-50 pointer-events-none" : "opacity-100"
            )}>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:p-8 sticky top-28">
                {/* Calendly-style banner */}
                <div className="absolute -top-0 -right-0 overflow-hidden w-24 h-24">
                  <div className="absolute transform rotate-45 bg-gray-700 text-white text-[10px] font-medium py-1 px-8 right-[-35px] top-[20px]">
                    Powered by
                    <br />
                    ishuu
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Select a Date & Time
                </h2>

                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-lg text-gray-700">
                    {monthNames[month]} {year}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronLeft size={18} className="!text-gray-600 !stroke-gray-600" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronRight size={18} className="!text-gray-600 !stroke-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="mb-6">
                  {/* Weekday headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs font-medium text-gray-500 py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar days */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, index) => {
                      if (day === null) {
                        return <div key={`empty-${index}`} className="aspect-square" />;
                      }

                      const dateToCheck = new Date(year, month, day);
                      dateToCheck.setHours(0, 0, 0, 0);
                      const isPast = dateToCheck < today;
                      const isSelected = selectedDate?.getDate() === day && 
                                        selectedDate?.getMonth() === month &&
                                        selectedDate?.getFullYear() === year;
                      const isWeekend = (index % 7) >= 5;

                      return (
                        <button
                          key={day}
                          onClick={() => !isPast && handleDateSelect(day)}
                          disabled={isPast}
                          className={cn(
                            "aspect-square flex items-center justify-center text-sm rounded-full transition-all",
                            isPast && "text-gray-300 cursor-not-allowed",
                            !isPast && !isSelected && "text-gray-700 hover:bg-brand-pink/10",
                            !isPast && !isSelected && isWeekend && "text-gray-400",
                            isSelected && "bg-brand-pink text-white font-medium"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timezone */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-100">
                  <Globe size={16} className="!text-gray-500 !stroke-gray-500" />
                  <span>Central European Time (08:24)</span>
                  <ChevronRight size={14} className="!text-gray-400 !stroke-gray-400 rotate-90" />
                </div>

                {/* Time Slots */}
                {selectedDate && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-700">
                      Available times for {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-2 px-3 text-sm rounded-md border transition-all",
                            selectedTime === time
                              ? "bg-brand-pink text-white border-brand-pink"
                              : "border-gray-200 text-gray-700 hover:border-brand-pink hover:text-brand-pink"
                          )}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confirm Button */}
                {selectedDate && selectedTime && (
                  <Button
                    onClick={handleFinalSubmit}
                    className="w-full mt-6 bg-brand-pink hover:bg-brand-pink/90 text-white rounded-md py-6"
                  >
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
