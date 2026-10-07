import React, { useState } from "react";
import {
  X,
  Send,
  CheckCircle,
  User,
  Mail,
  Phone,
  Users,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const districts = [
  "kankavli",
  "Malvan",
  "Sawantwadi",
  "Dodamarg",
  "kudal",
  "Vaibhavwadi",
  "Vengurla",
  "Devgad",
  "Whole kokan Belt"
  ,
];

const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numTravelers: 1,
    preferredDistrict: "whole kokan belt",
    travelDates: "",
    message: "",
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numTravelers" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      alert("Please fill Name, Email and Message.");
      return;
    }

    setSubmitting(true);

    const enquiryData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim() || null,
      subject: null,
      message: formData.message.trim(),
      status: "new",
      num_travelers: Number(formData.numTravelers) || 1,
      travel_dates: formData.travelDates || "Flexible",
      preferred_district:
        formData.preferredDistrict || "Whole Kokan Belt",
    };

    console.log("Submitting enquiry:", enquiryData);

    const { error } = await supabase
      .from("enquiries")
      .insert(enquiryData);

    setSubmitting(false);

    if (error) {
      console.error("SUPABASE ENQUIRY ERROR:", error);
      alert("Supabase Error: " + error.message);
      return;
    }

    console.log("ENQUIRY SAVED SUCCESSFULLY");

    setSubmittedSuccess(true);
  };

  const handleClose = () => {
    if (submitting) return;

    setSubmittedSuccess(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      numTravelers: 1,
      preferredDistrict: "Whole Kokan Belt",
      travelDates: "",
      message: "",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Plan Your Kokan Trip
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Send us your enquiry and we’ll help you plan your journey.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Success */}
        {submittedSuccess ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle
                size={44}
                className="text-green-600"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900">
              Enquiry Submitted!
            </h3>

            <p className="mt-3 max-w-md text-gray-600">
              Thank you for contacting us. Your Kokan travel
              enquiry has been received successfully.
            </p>

            <button
              type="button"
              onClick={handleClose}
              className="mt-7 rounded-xl bg-emerald-600 px-7 py-3 font-semibold text-white transition hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6"
          >
            {/* Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name *
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email *
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            {/* Phone + Travelers */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Number of Travelers
                </label>

                <div className="relative">
                  <Users
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="number"
                    name="numTravelers"
                    min="1"
                    max="100"
                    value={formData.numTravelers}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            {/* District + Date */}
            <div className="grid gap-5 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Preferred District
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <select
                    name="preferredDistrict"
                    value={formData.preferredDistrict}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >
                    {districts.map((district) => (
                      <option
                        key={district}
                        value={district}
                      >
                        {district}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Travel Dates
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g. 15-18 December"
                    className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Your Message *
              </label>

              <div className="relative">
                <MessageSquare
                  size={18}
                  className="absolute left-3 top-4 text-gray-400"
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your trip requirements..."
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Enquiry
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;